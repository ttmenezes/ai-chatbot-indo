import { google } from "@ai-sdk/google";
import { geolocation } from "@vercel/functions";
import {
  convertToModelMessages,
  smoothStream,
  streamText,
  type UIMessage,
} from "ai";
import { unstable_cache as cache } from "next/cache";
import type { ModelCatalog } from "tokenlens/core";
import { fetchModels } from "tokenlens/fetch";
import { getUsage } from "tokenlens/helpers";
import type { ChatModel } from "@/lib/ai/models";
import { type RequestHints, systemPrompt } from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";
import { generateImageTool } from "@/lib/ai/tools/generate-image";
import { getWeather } from "@/lib/ai/tools/get-weather";
import { isProductionEnvironment } from "@/lib/constants";
import { ChatSDKError } from "@/lib/errors";
import { upsertChatLog } from "@/lib/supabase";
import type { ChatMessage } from "@/lib/types";

/**
 * Sanitize messages before sending to the model.
 * Removes large base64 image data from tool results to prevent token limit issues.
 * The image is still displayed in the UI, but we don't send the raw data back to the model.
 */
function sanitizeMessagesForModel(messages: UIMessage[]): UIMessage[] {
  return messages.map((message) => {
    if (message.role !== "assistant" || !message.parts) {
      return message;
    }

    const sanitizedParts = message.parts.map((part: unknown) => {
      const p = part as Record<string, unknown>;
      // Check if this is a generateImageTool result with image data
      if (
        p.type === "tool-generateImageTool" &&
        p.state === "output-available" &&
        p.output
      ) {
        const output = p.output as Record<string, unknown>;
        if (output.success === true && output.image) {
          // Replace the large base64 data with a placeholder
          return {
            ...p,
            output: {
              success: true,
              prompt: output.prompt,
              aspectRatio: output.aspectRatio,
              image: {
                // Remove base64, keep only a note that image was generated
                note: "[Image data removed from context to save tokens]",
              },
            },
          };
        }
      }
      return part;
    });

    return {
      ...message,
      parts: sanitizedParts,
    } as UIMessage;
  });
}

// Keywords that indicate user wants custom tools (weather, image generation, etc.)
// rather than web search. When detected, we provide all custom tools and let Gemini decide.
const CUSTOM_TOOL_KEYWORDS = [
  // Weather keywords (English)
  "weather",
  "temperature",
  "forecast",
  "rain",
  "sunny",
  "cloudy",
  // Weather keywords (Indonesian)
  "cuaca",
  "suhu",
  "hujan",
  "cerah",
  "mendung",
  "prakiraan",
  // Image keywords (English)
  "image",
  "picture",
  "photo",
  "draw",
  "paint",
  "illustration",
  "generate image",
  "create image",
  // Image keywords (Indonesian & regional languages)
  "gambar",
  "foto",
  "lukis",
];

export const maxDuration = 120;

const getTokenlensCatalog = cache(
  async (): Promise<ModelCatalog | undefined> => {
    try {
      return await fetchModels();
    } catch (err) {
      console.warn(
        "TokenLens: catalog fetch failed, using default catalog",
        err
      );
      return; // tokenlens helpers will fall back to defaultCatalog
    }
  },
  ["tokenlens-catalog"],
  { revalidate: 24 * 60 * 60 } // 24 hours
);

export async function POST(request: Request) {
  try {
    const json = await request.json();

    // AI SDK v5: useChat sends messages array directly
    const {
      messages,
      selectedChatModel,
      webSearchEnabled,
      newsSearchEnabled,
      imageGenerationEnabled,
      languagePreference,
      chatId,
    }: {
      messages: UIMessage[];
      selectedChatModel?: ChatModel["id"];
      webSearchEnabled?: boolean;
      newsSearchEnabled?: boolean;
      imageGenerationEnabled?: boolean;
      languagePreference?: string;
      chatId?: string;
    } = json;

    if (!messages || !Array.isArray(messages)) {
      return new ChatSDKError("bad_request:api").toResponse();
    }

    const uiMessages = messages as ChatMessage[];
    const modelId: ChatModel["id"] = selectedChatModel || "chat-model";

    // Get geolocation for Indonesian context
    const { longitude, latitude, city, country } = geolocation(request);

    const requestHints: RequestHints = {
      longitude,
      latitude,
      city,
      country,
    };

    const model = myProvider.languageModel(modelId);

    // Detect explicit news or search requests to prioritise web tools
    const lastMessage = uiMessages.at(-1);
    const userMessageText = lastMessage
      ? lastMessage.parts
          ?.filter((part) => part.type === "text")
          .map((part) => (part as { text?: string }).text || "")
          .join(" ") || ""
      : "";

    // Check if user's message suggests they want custom tools (weather, images, etc.)
    // If so, provide all custom tools and let Gemini decide which to use
    const userMessageLower = userMessageText.toLowerCase();
    const wantsCustomTools =
      imageGenerationEnabled ||
      CUSTOM_TOOL_KEYWORDS.some((keyword) =>
        userMessageLower.includes(keyword)
      );

    // IMPORTANT: Cannot mix function tools with provider-defined tools!
    // Strategy: If user enables image mode OR mentions weather/image keywords, provide all custom tools.
    // Gemini will intelligently decide which tool to call based on context.
    // Otherwise, fall back to Google's native search tools.
    let tools: Record<string, any>;

    if (wantsCustomTools) {
      // Provide all custom tools - let Gemini decide which to use
      tools = {
        getWeather,
        generateImageTool,
      };
    } else {
      // Default: Provide Google search tools for general queries
      const googleSearchTool = google.tools.googleSearch({});
      tools = {
        google_search: googleSearchTool,
        search: googleSearchTool, // Alias for models that call 'search' instead of 'google_search'
        url_context: google.tools.urlContext({}),
      };
    }

    // Build system prompt
    const system = systemPrompt({
      selectedChatModel: modelId,
      requestHints,
      webSearchEnabled,
      newsSearchEnabled,
      languagePreference,
    });

    // Sanitize messages to remove large base64 image data before sending to model
    const sanitizedMessages = sanitizeMessagesForModel(messages);

    // Use AI SDK v5 streamText with toUIMessageStreamResponse
    const result = streamText({
      model,
      system,
      messages: convertToModelMessages(sanitizedMessages),
      experimental_transform: smoothStream({ chunking: "word" }),
      tools,
      experimental_telemetry: {
        isEnabled: isProductionEnvironment,
        functionId: "stream-text",
      },
      onChunk: () => {
        // Chunk processing (no logging needed)
      },
      onStepFinish: () => {
        // Step finished (no logging needed)
      },
      onFinish: async ({ usage }) => {
        try {
          const providers = await getTokenlensCatalog();
          const modelIdString = myProvider.languageModel(modelId).modelId;
          if (!modelIdString || !providers) {
            return;
          }

          // Usage tracking (no logging needed)
          getUsage({
            modelId: modelIdString,
            usage,
            providers,
          });
        } catch (err) {
          console.warn("TokenLens enrichment failed", err);
        }

        // Fire-and-forget: Log chat transcript to Supabase
        // Don't await - let it run in the background
        if (chatId && uiMessages.length > 0) {
          upsertChatLog({
            id: chatId,
            messages: uiMessages,
            locale: languagePreference,
          }).catch((error) => {
            // Silently fail - logging is non-critical
            console.warn("Failed to log chat transcript:", error);
          });
        }
      },
    });

    // Debug: Log the full stream to see what's happening
    // Note: This will consume the stream, so we need to create a new one
    // For now, just return the response and let the enhanced logging above handle it

    // AI SDK v5: Use toUIMessageStreamResponse() directly
    return result.toUIMessageStreamResponse({
      sendReasoning: true,
      sendSources: true,
    });
  } catch (error) {
    const vercelId = request.headers.get("x-vercel-id");

    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }

    // Check for Vercel AI Gateway credit card error
    if (
      error instanceof Error &&
      error.message?.includes(
        "AI Gateway requires a valid credit card on file to service requests"
      )
    ) {
      return new ChatSDKError("bad_request:activate_gateway").toResponse();
    }

    console.error("Unhandled error in chat API:", error, { vercelId });
    return new ChatSDKError("offline:chat").toResponse();
  }
}

// DELETE handler removed - stateless app doesn't persist chats
// Clients can clear messages locally

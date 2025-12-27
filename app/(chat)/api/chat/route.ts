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
import { getWeather } from "@/lib/ai/tools/get-weather";
import { isProductionEnvironment } from "@/lib/constants";
import { ChatSDKError } from "@/lib/errors";
import { upsertChatLog } from "@/lib/supabase";
import type { ChatMessage } from "@/lib/types";

export const maxDuration = 60;

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
      languagePreference,
      chatId,
    }: {
      messages: UIMessage[];
      selectedChatModel?: ChatModel["id"];
      webSearchEnabled?: boolean;
      newsSearchEnabled?: boolean;
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

    // Check for explicit weather keywords to use weather-specific tools
    const weatherKeywords = [
      // English
      "weather",
      "temperature",
      "forecast",
      "rain",
      "sunny",
      "cloudy",
      // Indonesian
      "cuaca",
      "suhu",
      "hujan",
      "cerah",
      "mendung",
      "prakiraan cuaca",
    ];
    const userRequestedWeather = weatherKeywords.some((keyword) =>
      userMessageText.toLowerCase().includes(keyword)
    );

    // IMPORTANT: Cannot mix function tools with provider-defined tools!
    // Strategy: Let the model decide when to search by always providing search tools.
    // Only use getWeather for explicit weather queries.
    let tools: Record<string, any>;

    if (userRequestedWeather) {
      // Weather-specific tools only
      tools = {
        getWeather,
      };
    } else {
      // Default: Always provide search tools - let the model decide when to use them
      // The model will autonomously determine if a query requires recent/grounded info
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

    // Use AI SDK v5 streamText with toUIMessageStreamResponse
    const result = streamText({
      model,
      system,
      messages: convertToModelMessages(uiMessages),
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

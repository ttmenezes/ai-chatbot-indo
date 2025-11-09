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
    }: {
      messages: UIMessage[];
      selectedChatModel?: ChatModel["id"];
      webSearchEnabled?: boolean;
      newsSearchEnabled?: boolean;
      languagePreference?: string;
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

    // Build tools object
    const tools: Record<string, any> = {
      getWeather,
      google_search: google.tools.googleSearch({}),
      url_context: google.tools.urlContext({}),
    };

    // Detect explicit news or search requests to prioritise web tools
    const lastMessage = uiMessages.at(-1);
    const userMessageText = lastMessage
      ? lastMessage.parts
          ?.filter((part) => part.type === "text")
          .map((part) => (part as { text?: string }).text || "")
          .join(" ") || ""
      : "";
    const userRequestedNews =
      userMessageText.toLowerCase().includes("news") ||
      userMessageText.toLowerCase().includes("search") ||
      Boolean(newsSearchEnabled) ||
      Boolean(webSearchEnabled);

    const activeTools = userRequestedNews
      ? ["google_search", "url_context", "getWeather"]
      : ["getWeather"];

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
      activeTools,
      experimental_telemetry: {
        isEnabled: isProductionEnvironment,
        functionId: "stream-text",
      },
      onChunk: ({ chunk }) => {
        // Log all chunk types to debug what we're receiving
        if (
          chunk.type === "tool-result" ||
          chunk.type === "tool-input-start" ||
          chunk.type === "tool-input-delta"
        ) {
          console.log("🔍 Chunk received:", {
            type: chunk.type,
            chunk: JSON.stringify(chunk, null, 2),
          });
        }
        // Check for source chunks (from Gemini grounding)
        if (chunk.type === "source") {
          const sourceChunk = chunk as {
            type: "source";
            sourceType?: string;
            id?: string;
            url?: string;
            title?: string;
          };
          console.log("🌐 Source chunk from Gemini grounding:", {
            sourceType: sourceChunk.sourceType,
            url: sourceChunk.url,
            title: sourceChunk.title,
          });
        }
      },
      onFinish: async ({ usage, response }) => {
        try {
          // Check response.messages for tool calls and grounding metadata
          for (const message of response.messages) {
            // Check for provider metadata (where Gemini grounding sources are)
            const messageWithMetadata = message as {
              experimental_providerMetadata?: {
                google?: {
                  groundingMetadata?: {
                    groundingChunks?: Array<{
                      web?: {
                        uri?: string | null;
                        title?: string | null;
                      } | null;
                    }>;
                  };
                };
              };
            };
            const googleMetadata =
              messageWithMetadata.experimental_providerMetadata?.google;
            if (googleMetadata?.groundingMetadata?.groundingChunks) {
              const sources = googleMetadata.groundingMetadata.groundingChunks
                .map((chunk) => chunk.web?.uri)
                .filter((uri): uri is string => Boolean(uri));
              console.log("🌐 Found Gemini grounding sources:", sources);
            }
          }
          const providers = await getTokenlensCatalog();
          const modelIdString = myProvider.languageModel(modelId).modelId;
          if (!modelIdString || !providers) {
            return;
          }

          const summary = getUsage({
            modelId: modelIdString,
            usage,
            providers,
          });
          // Usage tracking can be logged but not persisted in stateless app
          console.log("Token usage:", {
            ...usage,
            ...summary,
            modelId: modelIdString,
          });
        } catch (err) {
          console.warn("TokenLens enrichment failed", err);
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

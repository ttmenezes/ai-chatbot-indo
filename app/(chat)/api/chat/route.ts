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

function sanitizeMessagesForModel(messages: UIMessage[]): UIMessage[] {
  return messages.map((message) => {
    if (message.role !== "assistant" || !message.parts) {
      return message;
    }

    const sanitizedParts = message.parts.map((part: unknown) => {
      const p = part as Record<string, unknown>;
      if (
        p.type === "tool-generateImageTool" &&
        p.state === "output-available" &&
        p.output
      ) {
        const output = p.output as Record<string, unknown>;
        if (output.success === true && output.image) {
          return {
            ...p,
            output: {
              success: true,
              prompt: output.prompt,
              aspectRatio: output.aspectRatio,
              image: {
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

const CUSTOM_TOOL_KEYWORDS = [
  "weather",
  "temperature",
  "forecast",
  "rain",
  "sunny",
  "cloudy",
  "cuaca",
  "suhu",
  "hujan",
  "cerah",
  "mendung",
  "prakiraan",
  "image",
  "picture",
  "photo",
  "draw",
  "paint",
  "illustration",
  "generate image",
  "create image",
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
      return;
    }
  },
  ["tokenlens-catalog"],
  { revalidate: 24 * 60 * 60 }
);

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const {
      messages,
      selectedChatModel,
      webSearchEnabled,
      newsSearchEnabled,
      imageGenerationEnabled,
      languagePreference,
      chatId,
      aiTrainingOptIn,
    }: {
      messages: UIMessage[];
      selectedChatModel?: ChatModel["id"];
      webSearchEnabled?: boolean;
      newsSearchEnabled?: boolean;
      imageGenerationEnabled?: boolean;
      languagePreference?: string;
      chatId?: string;
      aiTrainingOptIn?: boolean;
    } = json;

    if (!messages || !Array.isArray(messages)) {
      return new ChatSDKError("bad_request:api").toResponse();
    }

    const uiMessages = messages as ChatMessage[];
    const modelId: ChatModel["id"] = selectedChatModel || "chat-model";

    const { longitude, latitude, city, country } = geolocation(request);

    const requestHints: RequestHints = {
      longitude,
      latitude,
      city,
      country,
    };

    const model = myProvider.languageModel(modelId);

    const lastMessage = uiMessages.at(-1);
    const userMessageText = lastMessage
      ? lastMessage.parts
          ?.filter((part) => part.type === "text")
          .map((part) => (part as { text?: string }).text || "")
          .join(" ") || ""
      : "";

    const userMessageLower = userMessageText.toLowerCase();
    const wantsCustomTools =
      imageGenerationEnabled ||
      CUSTOM_TOOL_KEYWORDS.some((keyword) =>
        userMessageLower.includes(keyword)
      );

    let tools: Record<string, any>;

    if (wantsCustomTools) {
      tools = {
        getWeather,
        generateImageTool,
      };
    } else {
      const googleSearchTool = google.tools.googleSearch({});
      tools = {
        google_search: googleSearchTool,
        search: googleSearchTool,
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

    const sanitizedMessages = sanitizeMessagesForModel(messages);

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
      onChunk: () => {},
      onStepFinish: () => {},
      onFinish: async ({ usage }) => {
        try {
          const providers = await getTokenlensCatalog();
          const modelIdString = myProvider.languageModel(modelId).modelId;
          if (!modelIdString || !providers) {
            return;
          }

          getUsage({
            modelId: modelIdString,
            usage,
            providers,
          });
        } catch (err) {
          console.warn("TokenLens enrichment failed", err);
        }

        if (chatId && uiMessages.length > 0) {
          upsertChatLog({
            id: chatId,
            messages: uiMessages,
            locale: languagePreference,
            aiTrainOptIn: aiTrainingOptIn ?? false,
          }).catch((error) => {
            console.warn("Failed to log chat transcript:", error);
          });
        }
      },
    });

    return result.toUIMessageStreamResponse({
      sendReasoning: true,
      sendSources: true,
    });
  } catch (error) {
    const vercelId = request.headers.get("x-vercel-id");

    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }

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

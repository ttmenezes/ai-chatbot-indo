import { google } from "@ai-sdk/google";
import { createReplicate } from "@ai-sdk/replicate";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        // flashModel, // Disabled - doesn't work well with provider-defined tools
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          // "chat-model-flash": flashModel, // Disabled - doesn't work well with provider-defined tools
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        // Quick model - Flash Lite (works well with grounding/search tools)
        "chat-model": google("gemini-2.5-flash-lite-preview-09-2025"),
        // NOTE: gemini-2.5-flash disabled - doesn't work well with provider-defined tools
        // The model calls google_search but fails to generate text responses after grounding
        // "chat-model-flash": google("gemini-2.5-flash"),
        // Deep/Slow model - Flash with reasoning middleware
        "chat-model-reasoning": wrapLanguageModel({
          model: google("gemini-2.5-flash-lite-preview-09-2025"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": google("gemini-2.5-flash-lite-preview-09-2025"),
        "artifact-model": google("gemini-2.5-flash-lite-preview-09-2025"),
      },
    });

// Replicate provider for image generation
export const replicateProvider = createReplicate({
  apiToken: process.env.REPLICATE_API_TOKEN ?? "",
});

import { type SupportedLocale, getTranslations } from "@/lib/i18n";

export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  nameKey: "modelQuick" | "modelSlow";
  descriptionKey: "modelQuickDesc" | "modelSlowDesc";
};

// Base model definitions with translation keys
export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    nameKey: "modelQuick",
    descriptionKey: "modelQuickDesc",
  },
  // NOTE: gemini-2.5-flash disabled - doesn't work well with provider-defined tools (google_search)
  // The model calls tools but fails to generate text responses after grounding
  // {
  //   id: "chat-model-flash",
  //   nameKey: "modelQuick",
  //   descriptionKey: "modelQuickDesc",
  // },
  {
    id: "chat-model-reasoning",
    nameKey: "modelSlow",
    descriptionKey: "modelSlowDesc",
  },
];

// Helper to get localized model info
export function getLocalizedChatModels(locale: SupportedLocale = "id") {
  const t = getTranslations(locale);
  return chatModels.map((model) => ({
    id: model.id,
    name: t[model.nameKey],
    description: t[model.descriptionKey],
  }));
}

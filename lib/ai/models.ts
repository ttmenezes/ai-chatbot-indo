export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "Gemini Flash Lite",
    description: "Optimized for Indonesian languages with cost-efficient, high-quality responses",
  },
  {
    id: "chat-model-reasoning",
    name: "Gemini Flash Lite (Reasoning)",
    description:
      "Uses advanced chain-of-thought reasoning for complex problems in Indonesian languages",
  },
];

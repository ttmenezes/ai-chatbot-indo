import type { InferUITool, UIMessage } from "ai";
import { z } from "zod";
import type { ArtifactKind } from "@/components/artifact";
import type { generateImageTool } from "./ai/tools/generate-image";
import type { getWeather } from "./ai/tools/get-weather";
import type { requestSuggestions } from "./ai/tools/request-suggestions";
import type { AppUsage } from "./usage";

export type Vote = {
  chatId: string;
  messageId: string;
  isUpvoted: boolean;
};

export type Document = {
  id: string;
  title: string;
  kind: ArtifactKind;
  content: string;
  createdAt: Date;
};

export type Chat = {
  id: string;
  title: string;
  visibility: "public" | "private";
  createdAt: Date;
  lastContext?: AppUsage | null;
};

export type Suggestion = {
  id: string;
  documentId: string;
  originalText: string;
  suggestedText: string;
  description: string;
  isResolved: boolean;
};

export type DataPart = { type: "append-message"; message: string };

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

type weatherTool = InferUITool<typeof getWeather>;
type requestSuggestionsTool = InferUITool<
  ReturnType<typeof requestSuggestions>
>;
type generateImageToolType = InferUITool<typeof generateImageTool>;

export type ChatTools = {
  getWeather: weatherTool;
  requestSuggestions: requestSuggestionsTool;
  generateImageTool: generateImageToolType;
};

export type CustomUIDataTypes = {
  textDelta: string;
  imageDelta: string;
  sheetDelta: string;
  codeDelta: string;
  suggestion: Suggestion;
  appendMessage: string;
  id: string;
  title: string;
  kind: ArtifactKind;
  clear: null;
  finish: null;
  usage: AppUsage;
  sources: string[];
};

export type ChatMessage = UIMessage<
  MessageMetadata,
  CustomUIDataTypes,
  ChatTools
>;

export type Attachment = {
  name: string;
  url: string;
  contentType: string;
};

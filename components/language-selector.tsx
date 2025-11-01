"use client";

import { memo } from "react";
import type { UseChatHelpers } from "@ai-sdk/react";
import {
  PromptInputModelSelect,
  PromptInputModelSelectContent,
} from "./elements/prompt-input";
import { SelectItem } from "./ui/select";
import { Trigger } from "@radix-ui/react-select";
import { ChevronDownIcon } from "./icons";
import type { ChatMessage } from "@/lib/types";
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/lib/constants";
import { cn } from "@/lib/utils";

function PureLanguageSelector({
  selectedLanguage,
  onLanguageChange,
  status,
}: {
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
  status: UseChatHelpers<ChatMessage>["status"];
}) {
  return (
    <PromptInputModelSelect
      onValueChange={(value) => {
        if (SUPPORTED_LANGUAGES.includes(value as SupportedLanguage)) {
          onLanguageChange(value as SupportedLanguage);
        }
      }}
      value={selectedLanguage}
    >
      <Trigger
        className={cn(
          "flex h-8 items-center gap-2 rounded-lg border-0 bg-background px-2 text-foreground shadow-none transition-colors hover:bg-accent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
          status !== "ready" && "opacity-50"
        )}
        disabled={status !== "ready"}
        type="button"
      >
        <span className="hidden font-medium text-xs sm:block">
          {LANGUAGE_LABELS[selectedLanguage]}
        </span>
        <ChevronDownIcon size={16} />
      </Trigger>
      <PromptInputModelSelectContent className="min-w-[200px] p-0">
        <div className="flex flex-col gap-px">
          {SUPPORTED_LANGUAGES.map((language) => (
            <SelectItem key={language} value={language}>
              <div className="truncate font-medium text-xs">
                {LANGUAGE_LABELS[language]}
              </div>
            </SelectItem>
          ))}
        </div>
      </PromptInputModelSelectContent>
    </PromptInputModelSelect>
  );
}

export const LanguageSelector = memo(PureLanguageSelector);

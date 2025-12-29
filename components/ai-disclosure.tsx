"use client";

import { useLocale } from "@/lib/locale-context";

/**
 * AI disclosure component required for Indonesia AI Ethics compliance.
 * Displays a notice that the user is chatting with an AI.
 */
export function AiDisclosure() {
  const { t } = useLocale();

  return (
    <p className="mt-1 text-center text-muted-foreground text-xs">
      {t.aiDisclosure}
    </p>
  );
}

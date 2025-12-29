"use client";

import type { ReactNode } from "react";
import { ConsentBanner } from "@/components/consent-banner";
import type { SupportedLocale } from "@/lib/i18n";

type ConsentProviderProps = {
  children: ReactNode;
  locale?: SupportedLocale;
};

/**
 * Client-side provider that wraps content with a consent banner.
 * Shows the consent modal before the user can interact with the chat.
 */
export function ConsentProvider({
  children,
  locale = "id",
}: ConsentProviderProps) {
  return (
    <>
      <ConsentBanner locale={locale} />
      {children}
    </>
  );
}

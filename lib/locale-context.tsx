"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  type SupportedLocale,
  type TranslationKeys,
  defaultLocale,
  getTranslations,
  createTranslator,
} from "./i18n";

type LocaleContextValue = {
  locale: SupportedLocale;
  t: TranslationKeys;
  translator: ReturnType<typeof createTranslator>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale = defaultLocale,
  children,
}: {
  locale?: SupportedLocale | string;
  children: ReactNode;
}) {
  // Map language preference strings to locale codes
  const localeMap: Record<string, SupportedLocale> = {
    auto: "id",
    indonesian: "id",
    english: "en",
    javanese: "jv",
    sundanese: "su",
    acehnese: "ace",
    balinese: "ban",
    minangkabau: "min",
    id: "id",
    en: "en",
    jv: "jv",
    su: "su",
    ace: "ace",
    ban: "ban",
    min: "min",
  };

  const normalizedLocale = localeMap[locale] ?? defaultLocale;
  const t = getTranslations(normalizedLocale);
  const translator = createTranslator(locale);

  return (
    <LocaleContext.Provider value={{ locale: normalizedLocale, t, translator }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    // Return default translations if not in provider
    const t = getTranslations(defaultLocale);
    const translator = createTranslator(defaultLocale);
    return { locale: defaultLocale, t, translator };
  }
  return context;
}


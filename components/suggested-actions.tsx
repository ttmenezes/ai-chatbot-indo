"use client";

import type { useChat } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { getResolvedLanguage } from "@/lib/i18n";
import type { ChatMessage } from "@/lib/types";
import { Suggestion } from "./elements/suggestion";
import type { VisibilityType } from "./visibility-selector";

type UseChatReturnType = ReturnType<typeof useChat<ChatMessage>>;

type SuggestedActionsProps = {
  chatId: string;
  sendMessage: UseChatReturnType["sendMessage"];
  selectedVisibilityType: VisibilityType;
  languagePreference: string;
};

const SUGGESTED_ACTIONS_BY_LANGUAGE = {
  indonesian: [
    "Bagaimana cuaca hari ini di Jakarta?",
    "Berita terbaru Jakarta hari ini?",
    "Buatkan gambar pemandangan sawah di Bali saat matahari terbenam.",
    "Tulis esai tentang gotong royong di sekolah.",
  ],
  acehnese: [
    "Kiban cuaca lam Jakarta watee nyoe?",
    "Beurita baro lam Jakarta watee nyoe?",
    "Buet gambar peumandangan sawah lam Bali watee mata uroe jeh.",
    "Tuleh esai ngen gotong royong lam sikula Indonesia.",
  ],
  banjarese: [
    "Kaya apa cuaca di Jakarta hari ini?",
    "Apa berita anyar di Jakarta hari ini?",
    "Buatakan gambar pamandangan sawah di Bali pas matahari tagalam.",
    "Tolong tulisi esai tentang gotong royong di sakulah Indonesia.",
  ],
  english: [
    "How's the weather in Jakarta today?",
    "What's the latest news from Jakarta?",
    "Create an image of rice fields in Bali at sunset.",
    "Write an essay about gotong royong in Indonesian schools.",
  ],
  madurese: [
    "Gimana cuaca e Jakarta areh neh?",
    "Apa beburita anyar dari Jakarta areh neh?",
    "Buatagi gambar pemandangan sabin e Bali pas are serap.",
    "Tolong tulis esai tentang gotong royong e sakola.",
  ],
  ngaju: [
    "Kaya apa cuaca di Jakarta andau handep?",
    "Berita anyar apa di Jakarta andau handep?",
    "Buaten gambar pamandangan petak di Bali katika matahari tembus.",
    "Tulisen esai tantang gotong royong di sekolah Indonesia.",
  ],
  sundanese: [
    "Kumaha cuaca di Jakarta ayeuna?",
    "Naon warta panganyarna ti Jakarta ayeuna?",
    "Jieun gambar pamandangan sawah di Bali pas panonpoe surup.",
    "Tuliskeun esai ngeunaan gotong royong di sakola Indonesia.",
  ],
  balinese: [
    "Kadi dados cuaca ring Jakarta mangkin?",
    "Warta sane anyar ring Jakarta mangkin?",
    "Buatang gambar pemandangan carik ring Bali rikala suryane engseb.",
    "Tulisin esai indik gotong royong ring sekolah Indonesia.",
  ],
  buginese: [
    "Naipa cuaca ri Jakarta andiang?",
    "Apa berita baru ri Jakarta andiang?",
    "Buatakan gambar pemandangan sawah ri Bali wektu mata esso tettong.",
    "Tolong tulis esai pasal gotong royong ri sekolah Indonesia.",
  ],
  javanese: [
    "Kepiye cuaca ing Jakarta dina iki?",
    "Apa ana warta anyar saka Jakarta dina iki?",
    "Gawekna gambar pemandangan sawah ing Bali nalika srengenge angslup.",
    "Tulisna esai bab gotong royong ing sekolah Indonesia.",
  ],
  minangkabau: [
    "Baa cuaco di Jakarta hari ko?",
    "Apo berito tarbaru dari Jakarta hari ko?",
    "Buekkan gambar pamandangan sawah di Bali wakatu matohari tagalam.",
    "Tuliah esai tentang gotong royong di sakola Indonesia.",
  ],
  toba_batak: [
    "Songon dia cuaca di Jakarta andorion?",
    "Ado warta imbaru aha sian Jakarta andorion?",
    "Bahen ma gambar pemandangan hauma di Bali di tingki mata ni ari sondang.",
    "Tulis ma esai taringot gotong royong di sekolah Indonesia.",
  ],
} as const;

type SupportedLanguage = keyof typeof SUGGESTED_ACTIONS_BY_LANGUAGE;

const DEFAULT_SUGGESTED_ACTIONS = SUGGESTED_ACTIONS_BY_LANGUAGE.indonesian;

const getSuggestedActions = (languagePreference?: string) => {
  const language = getResolvedLanguage(languagePreference) as SupportedLanguage;
  return SUGGESTED_ACTIONS_BY_LANGUAGE[language] ?? DEFAULT_SUGGESTED_ACTIONS;
};

function PureSuggestedActions({
  chatId,
  sendMessage,
  languagePreference,
}: SuggestedActionsProps) {
  const suggestedActions = useMemo(
    () => getSuggestedActions(languagePreference),
    [languagePreference]
  );

  return (
    <div
      className="grid w-full gap-2 sm:grid-cols-2"
      data-testid="suggested-actions"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          key={suggestedAction}
          transition={{ delay: 0.05 * index }}
        >
          <Suggestion
            className="h-auto w-full whitespace-normal p-3 text-center"
            onClick={(suggestion) => {
              window.history.replaceState({}, "", `/chat/${chatId}`);
              sendMessage({
                role: "user",
                parts: [{ type: "text", text: suggestion }],
                data: { languagePreference },
              } as unknown as Parameters<typeof sendMessage>[0]);
            }}
            suggestion={suggestedAction}
          >
            {suggestedAction}
          </Suggestion>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) {
      return false;
    }
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType) {
      return false;
    }
    if (prevProps.languagePreference !== nextProps.languagePreference) {
      return false;
    }

    return true;
  }
);

import { generateDummyPassword } from "./db/utils";

export const isProductionEnvironment = process.env.NODE_ENV === "production";
export const isDevelopmentEnvironment = process.env.NODE_ENV === "development";
export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT
);

export const guestRegex = /^guest-\d+$/;

export const DUMMY_PASSWORD = generateDummyPassword();

// Languages from prompts.ts - extracted from the CSV header
export const SUPPORTED_LANGUAGES = [
  "auto",
  "indonesian",
  "acehnese",
  "banjarese",
  "english",
  "madurese",
  "ngaju",
  "sundanese",
  "balinese",
  "buginese",
  "javanese",
  "minangkabau",
  "toba_batak",
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  auto: "Auto",
  indonesian: "Indonesian",
  acehnese: "Acehnese",
  banjarese: "Banjarese",
  english: "English",
  madurese: "Madurese",
  ngaju: "Ngaju",
  sundanese: "Sundanese",
  balinese: "Balinese",
  buginese: "Buginese",
  javanese: "Javanese",
  minangkabau: "Minangkabau",
  toba_batak: "Toba Batak",
};

/**
 * Localization system for BasaChat
 * Supports Indonesian, English, and major Indonesian regional languages
 */

export type SupportedLocale =
  | "id" // Indonesian
  | "en" // English
  | "jv" // Javanese
  | "su" // Sundanese
  | "ace" // Acehnese
  | "ban" // Balinese
  | "min"; // Minangkabau

export type TranslationKeys = {
  // App general
  appName: string;
  newChat: string;
  chatHistory: string;
  chatHistoryEmpty: string;

  // Model names
  modelQuick: string;
  modelQuickDesc: string;
  modelSlow: string;
  modelSlowDesc: string;

  // About section
  aboutTitle: string;
  aboutDescription: string;

  // Feedback
  feedbackTitle: string;
  feedbackDescription: string;
  feedbackPlaceholder: string;
  feedbackEmailPlaceholder: string;
  feedbackSubmit: string;
  feedbackSending: string;
  feedbackThankYou: string;
  feedbackAppreciate: string;
  feedbackCancel: string;
  feedbackButton: string;
  feedbackInputTitle: string;

  // Input/Chat
  inputPlaceholder: string;
  toastUploadFailed: string;
  toastWait: string;
  webSearch: string;
  news: string;
  toggleTitle: string;
  autoDetect: string;
  preferredLanguage: string;
  languageSelectTitle: string;

  // Progress/Thinking
  thinkingPrimary: string;
  progressWebSearch: string;
  progressNews: string;
  progressReasoningStep1: string;
  progressReasoningStep2: string;
  progressReasoningStep3: string;
  progressReasoningHeading: string;
  scrollToBottom: string;

  // Reasoning
  reasoningThinking: string;
  reasoningThoughtFor: string;

  // Sources
  sources: string;

  // Tool status
  toolPending: string;
  toolRunning: string;
  toolCompleted: string;
  toolError: string;
  toolParameters: string;
  toolResult: string;

  // Message actions
  copyToClipboard: string;
  copiedToClipboard: string;
  nothingToCopy: string;
  edit: string;
  upvoteResponse: string;
  upvotingResponse: string;
  upvotedResponse: string;
  failedToUpvote: string;
  downvoteResponse: string;
  downvotingResponse: string;
  downvotedResponse: string;
  failedToDownvote: string;
};

export const translations: Record<SupportedLocale, TranslationKeys> = {
  id: {
    appName: "BasaChat",
    newChat: "Obrolan baru",
    chatHistory: "Riwayat Obrolan",
    chatHistoryEmpty: "Riwayat obrolan akan muncul di sini.",

    modelQuick: "Cepat",
    modelQuickDesc: "Dioptimalkan untuk respons cepat dan efisien",
    modelSlow: "Mendalam",
    modelSlowDesc: "Penalaran mendalam untuk masalah kompleks",

    aboutTitle: "Tentang BasaChat",
    aboutDescription:
      "BasaChat hadir untuk membawa kecerdasan buatan dan informasi kepada seluruh masyarakat Indonesia. Kami percaya bahwa teknologi AI harus dapat diakses oleh semua orang.",

    feedbackTitle: "Kirim Masukan",
    feedbackDescription:
      "Bantu kami meningkatkan layanan dengan membagikan pemikiran, saran, atau masalah Anda.",
    feedbackPlaceholder: "Tulis masukan atau saran Anda...",
    feedbackEmailPlaceholder: "Email (opsional)",
    feedbackSubmit: "Kirim Masukan",
    feedbackSending: "Mengirim...",
    feedbackThankYou: "Terima kasih atas masukan Anda!",
    feedbackAppreciate:
      "Kami menghargai waktu Anda untuk membantu kami meningkatkan layanan.",
    feedbackCancel: "Batal",
    feedbackButton: "Masukan",
    feedbackInputTitle: "Masukan & Saran",

    inputPlaceholder: "Ketik pesan Anda...",
    toastUploadFailed: "Gagal mengunggah file",
    toastWait: "Mohon tunggu...",
    webSearch: "Pencarian Web",
    news: "Berita",
    toggleTitle: "Aktifkan/Nonaktifkan {label}",
    autoDetect: "Deteksi Otomatis",
    preferredLanguage: "Bahasa pilihan",
    languageSelectTitle: "Bahasa: {label}",

    thinkingPrimary: "Sedang berpikir...",
    progressWebSearch: "Mencari di web...",
    progressNews: "Mencari berita...",
    progressReasoningStep1: "Menganalisis pertanyaan...",
    progressReasoningStep2: "Menyusun pemikiran...",
    progressReasoningStep3: "Menyempurnakan jawaban...",
    progressReasoningHeading: "Proses Berpikir",
    scrollToBottom: "Gulir ke bawah",

    reasoningThinking: "Memikirkan jawaban...",
    reasoningThoughtFor: "Berpikir selama {duration} dtk",

    sources: "Sumber ({count})",

    toolPending: "Tertunda",
    toolRunning: "Berjalan",
    toolCompleted: "Selesai",
    toolError: "Error",
    toolParameters: "Parameter",
    toolResult: "Hasil",

    copyToClipboard: "Salin",
    copiedToClipboard: "Disalin ke clipboard!",
    nothingToCopy: "Tidak ada teks untuk disalin!",
    edit: "Edit",
    upvoteResponse: "Respons Bagus",
    upvotingResponse: "Memberi nilai positif...",
    upvotedResponse: "Nilai positif diberikan!",
    failedToUpvote: "Gagal memberi nilai positif.",
    downvoteResponse: "Respons Kurang",
    downvotingResponse: "Memberi nilai negatif...",
    downvotedResponse: "Nilai negatif diberikan!",
    failedToDownvote: "Gagal memberi nilai negatif.",
  },
  en: {
    appName: "BasaChat",
    newChat: "New chat",
    chatHistory: "Chat History",
    chatHistoryEmpty: "Chat history will appear here.",

    modelQuick: "Quick",
    modelQuickDesc: "Optimized for fast and efficient responses",
    modelSlow: "Deep",
    modelSlowDesc: "Advanced reasoning for complex problems",

    aboutTitle: "About BasaChat",
    aboutDescription:
      "BasaChat is here to bring artificial intelligence and information to all people of Indonesia. We believe AI technology should be accessible to everyone.",

    feedbackTitle: "Send Feedback",
    feedbackDescription:
      "Help us improve by sharing your thoughts, suggestions, or issues.",
    feedbackPlaceholder: "Tell us what you think...",
    feedbackEmailPlaceholder: "Email (optional)",
    feedbackSubmit: "Send Feedback",
    feedbackSending: "Sending...",
    feedbackThankYou: "Thank you for your feedback!",
    feedbackAppreciate: "We appreciate you taking the time to help us improve.",
    feedbackCancel: "Cancel",
    feedbackButton: "Feedback",
    feedbackInputTitle: "Feedback & Suggestions",

    inputPlaceholder: "Type your message...",
    toastUploadFailed: "Failed to upload file",
    toastWait: "Please wait...",
    webSearch: "Web Search",
    news: "News",
    toggleTitle: "Toggle {label}",
    autoDetect: "Auto Detect",
    preferredLanguage: "Preferred language",
    languageSelectTitle: "Language: {label}",

    thinkingPrimary: "Thinking...",
    progressWebSearch: "Searching the web...",
    progressNews: "Searching news...",
    progressReasoningStep1: "Analyzing your question...",
    progressReasoningStep2: "Formulating thoughts...",
    progressReasoningStep3: "Refining the answer...",
    progressReasoningHeading: "Thinking Process",
    scrollToBottom: "Scroll to bottom",

    reasoningThinking: "Thinking...",
    reasoningThoughtFor: "Thought for {duration}s",

    sources: "Sources ({count})",

    toolPending: "Pending",
    toolRunning: "Running",
    toolCompleted: "Completed",
    toolError: "Error",
    toolParameters: "Parameters",
    toolResult: "Result",

    copyToClipboard: "Copy",
    copiedToClipboard: "Copied to clipboard!",
    nothingToCopy: "There's no text to copy!",
    edit: "Edit",
    upvoteResponse: "Upvote Response",
    upvotingResponse: "Upvoting Response...",
    upvotedResponse: "Upvoted Response!",
    failedToUpvote: "Failed to upvote response.",
    downvoteResponse: "Downvote Response",
    downvotingResponse: "Downvoting Response...",
    downvotedResponse: "Downvoted Response!",
    failedToDownvote: "Failed to downvote response.",
  },
  jv: {
    appName: "BasaChat",
    newChat: "Obrolan anyar",
    chatHistory: "Riwayat Obrolan",
    chatHistoryEmpty: "Riwayat obrolan bakal muncul ing kene.",

    modelQuick: "Cepet",
    modelQuickDesc: "Dioptimalake kanggo respon cepet lan efisien",
    modelSlow: "Jero",
    modelSlowDesc: "Pikiran jero kanggo masalah kompleks",

    aboutTitle: "Babagan BasaChat",
    aboutDescription:
      "BasaChat ana kanggo nggawa kecerdasan buatan lan informasi kanggo kabeh masyarakat Indonesia. Kita percaya teknologi AI kudu bisa diakses kabeh wong.",

    feedbackTitle: "Kirim Saran",
    feedbackDescription:
      "Tulung kita nambah layanan kanthi nuduhake pikiran, saran, utawa masalah sampeyan.",
    feedbackPlaceholder: "Tulis saran utawa panemumu...",
    feedbackEmailPlaceholder: "Email (opsional)",
    feedbackSubmit: "Kirim Saran",
    feedbackSending: "Ngirim...",
    feedbackThankYou: "Matur nuwun kanggo masukanmu!",
    feedbackAppreciate:
      "Kita ngormati wektu sampeyan kanggo nulungi kita nambah layanan.",
    feedbackCancel: "Batal",
    feedbackButton: "Saran",
    feedbackInputTitle: "Masukan & Saran",

    inputPlaceholder: "Tulis pesanmu...",
    toastUploadFailed: "Gagal ngunggah file",
    toastWait: "Tunggu sedhela...",
    webSearch: "Goleki Web",
    news: "Warta",
    toggleTitle: "Aktifake/Nonaktifake {label}",
    autoDetect: "Deteksi Otomatis",
    preferredLanguage: "Basa pilihan",
    languageSelectTitle: "Basa: {label}",

    thinkingPrimary: "Lagi mikir...",
    progressWebSearch: "Nggoleki ing web...",
    progressNews: "Nggoleki warta...",
    progressReasoningStep1: "Nganalisis pitakon...",
    progressReasoningStep2: "Nyusun pikiran...",
    progressReasoningStep3: "Nyempurnakake jawaban...",
    progressReasoningHeading: "Proses Mikir",
    scrollToBottom: "Gulir ngisor",

    reasoningThinking: "Lagi mikir jawaban...",
    reasoningThoughtFor: "Mikir nganti {duration} detik",

    sources: "Sumber ({count})",

    toolPending: "Tertunda",
    toolRunning: "Mlaku",
    toolCompleted: "Rampung",
    toolError: "Error",
    toolParameters: "Parameter",
    toolResult: "Asil",

    copyToClipboard: "Salin",
    copiedToClipboard: "Wis disalin!",
    nothingToCopy: "Ora ana teks kanggo disalin!",
    edit: "Edit",
    upvoteResponse: "Respons Apik",
    upvotingResponse: "Menehi nilai apik...",
    upvotedResponse: "Wis menehi nilai apik!",
    failedToUpvote: "Gagal menehi nilai apik.",
    downvoteResponse: "Respons Kurang",
    downvotingResponse: "Menehi nilai kurang...",
    downvotedResponse: "Wis menehi nilai kurang!",
    failedToDownvote: "Gagal menehi nilai kurang.",
  },
  su: {
    appName: "BasaChat",
    newChat: "Obrolan anyar",
    chatHistory: "Riwayat Obrolan",
    chatHistoryEmpty: "Riwayat obrolan bakal muncul di dieu.",

    modelQuick: "Gancang",
    modelQuickDesc: "Dioptimalkeun pikeun respon gancang jeung efisien",
    modelSlow: "Jero",
    modelSlowDesc: "Pikiran jero pikeun masalah kompleks",

    aboutTitle: "Ngeunaan BasaChat",
    aboutDescription:
      "BasaChat aya pikeun mawa kecerdasan jieunan jeung informasi ka sadaya masarakat Indonesia. Urang percanten yén téknologi AI kedah tiasa diaksés ku sadayana.",

    feedbackTitle: "Kirim Saran",
    feedbackDescription:
      "Bantuan urang ningkatkeun layanan ku ngabagikeun pamikiran, saran, atanapi masalah anjeun.",
    feedbackPlaceholder: "Tulis saran atawa pamikiran anjeun...",
    feedbackEmailPlaceholder: "Email (opsional)",
    feedbackSubmit: "Kirim Saran",
    feedbackSending: "Ngirim...",
    feedbackThankYou: "Hatur nuhun kana masukan anjeun!",
    feedbackAppreciate:
      "Urang ngahargaan waktos anjeun pikeun ngabantosan urang ningkatkeun.",
    feedbackCancel: "Batal",
    feedbackButton: "Saran",
    feedbackInputTitle: "Masukan & Saran",

    inputPlaceholder: "Tulis talatah anjeun...",
    toastUploadFailed: "Gagal ngunggahkeun file",
    toastWait: "Mangga antosan...",
    webSearch: "Teangan Web",
    news: "Warta",
    toggleTitle: "Aktipkeun/Nonaktipkeun {label}",
    autoDetect: "Deteksi Otomatis",
    preferredLanguage: "Basa pilihan",
    languageSelectTitle: "Basa: {label}",

    thinkingPrimary: "Keur mikir...",
    progressWebSearch: "Milarian di web...",
    progressNews: "Milarian warta...",
    progressReasoningStep1: "Nganalisis patarosan...",
    progressReasoningStep2: "Nyusun pamikiran...",
    progressReasoningStep3: "Nyampurnakeun jawaban...",
    progressReasoningHeading: "Prosés Mikir",
    scrollToBottom: "Gulung ka handap",

    reasoningThinking: "Keur mikir jawaban...",
    reasoningThoughtFor: "Mikir salami {duration} detik",

    sources: "Sumber ({count})",

    toolPending: "Ditunda",
    toolRunning: "Jalan",
    toolCompleted: "Réngsé",
    toolError: "Error",
    toolParameters: "Parameter",
    toolResult: "Hasil",

    copyToClipboard: "Salin",
    copiedToClipboard: "Tos disalin!",
    nothingToCopy: "Henteu aya téks pikeun disalin!",
    edit: "Edit",
    upvoteResponse: "Réspon Saé",
    upvotingResponse: "Méré nilai saé...",
    upvotedResponse: "Tos méré nilai saé!",
    failedToUpvote: "Gagal méré nilai saé.",
    downvoteResponse: "Réspon Kirang",
    downvotingResponse: "Méré nilai kirang...",
    downvotedResponse: "Tos méré nilai kirang!",
    failedToDownvote: "Gagal méré nilai kirang.",
  },
  ace: {
    appName: "BasaChat",
    newChat: "Peugah baro",
    chatHistory: "Riwayat Peugah",
    chatHistoryEmpty: "Riwayat peugah teuka keuneuk muncul di sinoe.",

    modelQuick: "Bagah",
    modelQuickDesc: "Geupeuoptimasi keu respons bagah dan efisien",
    modelSlow: "Dalam",
    modelSlowDesc: "Peukira dalam keu masalah kompleks",

    aboutTitle: "Keu BasaChat",
    aboutDescription:
      "BasaChat na keu meuwariskan kecerdasan buatan dan informasi keu ban mandum masyarakat Indonesia. Kamoe yakin teknologi AI harus jeut diakses le bandum ureueng.",

    feedbackTitle: "Kirem Saran",
    feedbackDescription:
      "Tulong kamoe meuningkat layanan ngon meuwariskan pikiran, saran, atawa masalah gata.",
    feedbackPlaceholder: "Tuleh saran atawa pikiran gata...",
    feedbackEmailPlaceholder: "Email (opsional)",
    feedbackSubmit: "Kirem Saran",
    feedbackSending: "Lam kirem...",
    feedbackThankYou: "Terimong geunaseh keu saran gata!",
    feedbackAppreciate:
      "Kamoe menghargai watee gata keu tulong kamoe meuningkat.",
    feedbackCancel: "Batal",
    feedbackButton: "Saran",
    feedbackInputTitle: "Masukan & Saran",

    inputPlaceholder: "Tuleh pesan gata...",
    toastUploadFailed: "Hana jeut upload file",
    toastWait: "Teuneun sekeudjap...",
    webSearch: "Mita Web",
    news: "Haba",
    toggleTitle: "Peuhidep/Peumate {label}",
    autoDetect: "Deteksi Otomatis",
    preferredLanguage: "Basa pilihan",
    languageSelectTitle: "Basa: {label}",

    thinkingPrimary: "Lam peukira...",
    progressWebSearch: "Lam mita di web...",
    progressNews: "Lam mita haba...",
    progressReasoningStep1: "Lam analisis peutan...",
    progressReasoningStep2: "Lam susun pikiran...",
    progressReasoningStep3: "Lam sempurnakan jaweuban...",
    progressReasoningHeading: "Proses Peukira",
    scrollToBottom: "Gulong u yup",

    reasoningThinking: "Lam peukira jaweuban...",
    reasoningThoughtFor: "Peukira le {duration} detik",

    sources: "Sumber ({count})",

    toolPending: "Tertunda",
    toolRunning: "Lam peujaleuen",
    toolCompleted: "Ka jeuet",
    toolError: "Error",
    toolParameters: "Parameter",
    toolResult: "Hase",

    copyToClipboard: "Salin",
    copiedToClipboard: "Ka tersalin!",
    nothingToCopy: "Hana teks keu disalin!",
    edit: "Edit",
    upvoteResponse: "Respons Gét",
    upvotingResponse: "Lam bri nilai gét...",
    upvotedResponse: "Ka bri nilai gét!",
    failedToUpvote: "Gagal bri nilai gét.",
    downvoteResponse: "Respons Kureueng",
    downvotingResponse: "Lam bri nilai kureueng...",
    downvotedResponse: "Ka bri nilai kureueng!",
    failedToDownvote: "Gagal bri nilai kureueng.",
  },
  ban: {
    appName: "BasaChat",
    newChat: "Omongan anyar",
    chatHistory: "Riwayat Omongan",
    chatHistoryEmpty: "Riwayat omongan lakar muncul dini.",

    modelQuick: "Gelis",
    modelQuickDesc: "Dioptimalang anggen respon gelis lan efisien",
    modelSlow: "Dalem",
    modelSlowDesc: "Pepikian dalem anggen masalah kompleks",

    aboutTitle: "Indik BasaChat",
    aboutDescription:
      "BasaChat wenten anggen ngaba kecerdasan buatan lan informasi ring makejang masyarakat Indonesia. Tiang pracaya teknologi AI patut dados kaakses olih makejang anak.",

    feedbackTitle: "Kirim Saran",
    feedbackDescription:
      "Tulung tiang nincapang layanan antuk ngicen pepikian, saran, utawi masalah ragane.",
    feedbackPlaceholder: "Tulis saran utawi pepikian ragane...",
    feedbackEmailPlaceholder: "Email (opsional)",
    feedbackSubmit: "Kirim Saran",
    feedbackSending: "Ngirim...",
    feedbackThankYou: "Suksma antuk masukan ragane!",
    feedbackAppreciate:
      "Tiang ngargain galah ragane anggen nulung tiang nincapang.",
    feedbackCancel: "Batal",
    feedbackButton: "Saran",
    feedbackInputTitle: "Masukan & Saran",

    inputPlaceholder: "Tulis pesan ragane...",
    toastUploadFailed: "Gagal ngunggah file",
    toastWait: "Antosang dumun...",
    webSearch: "Alih Web",
    news: "Orti",
    toggleTitle: "Aktifang/Nonaktifang {label}",
    autoDetect: "Deteksi Otomatis",
    preferredLanguage: "Basa pilihan",
    languageSelectTitle: "Basa: {label}",

    thinkingPrimary: "Sedek mapikir...",
    progressWebSearch: "Sedek ngalih ring web...",
    progressNews: "Sedek ngalih orti...",
    progressReasoningStep1: "Sedek nganalisis pitaken...",
    progressReasoningStep2: "Sedek nyusun pepikian...",
    progressReasoningStep3: "Sedek nyampurnayang jawaban...",
    progressReasoningHeading: "Proses Mapikir",
    scrollToBottom: "Gulir ka beten",

    reasoningThinking: "Sedek mapikir jawaban...",
    reasoningThoughtFor: "Mapikir saking {duration} detik",

    sources: "Sumber ({count})",

    toolPending: "Kantun",
    toolRunning: "Mamargi",
    toolCompleted: "Puput",
    toolError: "Error",
    toolParameters: "Parameter",
    toolResult: "Pikolih",

    copyToClipboard: "Salin",
    copiedToClipboard: "Sampun kasalin!",
    nothingToCopy: "Nenten wenten teks sane kasalin!",
    edit: "Edit",
    upvoteResponse: "Respons Becik",
    upvotingResponse: "Ngicen nilai becik...",
    upvotedResponse: "Sampun ngicen nilai becik!",
    failedToUpvote: "Gagal ngicen nilai becik.",
    downvoteResponse: "Respons Kirang",
    downvotingResponse: "Ngicen nilai kirang...",
    downvotedResponse: "Sampun ngicen nilai kirang!",
    failedToDownvote: "Gagal ngicen nilai kirang.",
  },
  min: {
    appName: "BasaChat",
    newChat: "Kecek baru",
    chatHistory: "Riwayat Kecek",
    chatHistoryEmpty: "Riwayat kecek ka muncua di siko.",

    modelQuick: "Capek",
    modelQuickDesc: "Dioptimalkan untuak respon capek dan efisien",
    modelSlow: "Dalam",
    modelSlowDesc: "Pikiran dalam untuak masalah kompleks",

    aboutTitle: "Tantang BasaChat",
    aboutDescription:
      "BasaChat ado untuak mambao kecerdasan buatan jo informasi kapado sadonyo masyarakat Indonesia. Kami paracayo taknologi AI harus dapek diakses dek sadonyo urang.",

    feedbackTitle: "Kirim Saran",
    feedbackDescription:
      "Tolong kami maningkekan layanan jo mambagi pikiran, saran, atau masalah awak.",
    feedbackPlaceholder: "Tulis saran atau pikiran awak...",
    feedbackEmailPlaceholder: "Email (opsional)",
    feedbackSubmit: "Kirim Saran",
    feedbackSending: "Mangirim...",
    feedbackThankYou: "Tarimo kasih untuak masukan awak!",
    feedbackAppreciate:
      "Kami mangaragoi wakatu awak untuak manolong kami maningkekan.",
    feedbackCancel: "Batal",
    feedbackButton: "Saran",
    feedbackInputTitle: "Masukan & Saran",

    inputPlaceholder: "Tulis pasan awak...",
    toastUploadFailed: "Gagal mangunggah file",
    toastWait: "Tunggu saketek...",
    webSearch: "Cari Web",
    news: "Barito",
    toggleTitle: "Aktifkan/Nonaktifkan {label}",
    autoDetect: "Deteksi Otomatis",
    preferredLanguage: "Bahaso pilihan",
    languageSelectTitle: "Bahaso: {label}",

    thinkingPrimary: "Sadang bapikia...",
    progressWebSearch: "Sadang mancari di web...",
    progressNews: "Sadang mancari barito...",
    progressReasoningStep1: "Sadang manganalisis patanyoan...",
    progressReasoningStep2: "Sadang manyusun pikiran...",
    progressReasoningStep3: "Sadang manyampurnakan jawaban...",
    progressReasoningHeading: "Proses Bapikia",
    scrollToBottom: "Guliang ka bawah",

    reasoningThinking: "Sadang bapikia jawaban...",
    reasoningThoughtFor: "Bapikia salamo {duration} detik",

    sources: "Sumber ({count})",

    toolPending: "Tatunggu",
    toolRunning: "Bajalan",
    toolCompleted: "Salasai",
    toolError: "Error",
    toolParameters: "Parameter",
    toolResult: "Hasil",

    copyToClipboard: "Salin",
    copiedToClipboard: "Alah tasalin!",
    nothingToCopy: "Indak ado teks untuak disalin!",
    edit: "Edit",
    upvoteResponse: "Respons Rancak",
    upvotingResponse: "Mambari nilai rancak...",
    upvotedResponse: "Alah mambari nilai rancak!",
    failedToUpvote: "Gagal mambari nilai rancak.",
    downvoteResponse: "Respons Kurang",
    downvotingResponse: "Mambari nilai kurang...",
    downvotedResponse: "Alah mambari nilai kurang!",
    failedToDownvote: "Gagal mambari nilai kurang.",
  },
};

// Default locale
export const defaultLocale: SupportedLocale = "id";

// Get translation for a key
export function t(
  key: keyof TranslationKeys,
  locale: SupportedLocale = defaultLocale
): string {
  return translations[locale]?.[key] ?? translations[defaultLocale][key];
}

// Hook-friendly getter (for use in components)
export function getTranslations(
  locale: SupportedLocale = defaultLocale
): TranslationKeys {
  return translations[locale] ?? translations[defaultLocale];
}

// Maps language codes to locales for translator
const languageToLocale: Record<string, SupportedLocale> = {
  auto: "id",
  indonesian: "id",
  english: "en",
  javanese: "jv",
  sundanese: "su",
  acehnese: "ace",
  balinese: "ban",
  minangkabau: "min",
};

/**
 * Creates a translator function for the given language preference
 * Compatible with the existing createTranslator API
 */
export function createTranslator(languagePreference: string = "auto") {
  const locale = languageToLocale[languagePreference] ?? "id";
  const trans = translations[locale] ?? translations.id;

  return function translator(
    key: keyof TranslationKeys,
    params?: Record<string, string>
  ): string {
    let text = trans[key] ?? translations.id[key] ?? key;

    // Replace {param} placeholders with values
    if (params) {
      for (const [paramKey, paramValue] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, "g"), paramValue);
      }
    }

    return text;
  };
}

/**
 * Resolves a language preference string to a normalized language name
 * Used for suggested actions and other language-specific content
 */
export function getResolvedLanguage(
  languagePreference: string = "auto"
): string {
  // Handle auto and empty cases
  if (!languagePreference || languagePreference === "auto") {
    return "indonesian";
  }
  return languagePreference;
}

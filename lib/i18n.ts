/**
 * Localization system for BasaChat
 * Supports Indonesian, English, and major Indonesian regional languages
 */

export type SupportedLocale =
  | "id"
  | "en"
  | "jv"
  | "su"
  | "ace"
  | "ban"
  | "min";

export type TranslationKeys = {
  appName: string;
  newChat: string;
  chatHistory: string;
  chatHistoryEmpty: string;

  modelQuick: string;
  modelQuickDesc: string;
  modelSlow: string;
  modelSlowDesc: string;

  aboutTitle: string;
  aboutDescription: string;

  aboutPageTitle: string;
  aboutPageParagraph1: string;
  aboutPageParagraph2: string;
  aboutPageParagraph3: string;
  aboutPageStartChatting: string;
  aboutLink: string;

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

  inputPlaceholder: string;
  toastUploadFailed: string;
  toastWait: string;
  webSearch: string;
  news: string;
  toggleTitle: string;
  autoDetect: string;
  preferredLanguage: string;
  languageSelectTitle: string;

  thinkingPrimary: string;
  progressWebSearch: string;
  progressNews: string;
  progressReasoningStep1: string;
  progressReasoningStep2: string;
  progressReasoningStep3: string;
  progressReasoningHeading: string;
  scrollToBottom: string;

  reasoningThinking: string;
  reasoningThoughtFor: string;

  sources: string;

  toolPending: string;
  toolRunning: string;
  toolCompleted: string;
  toolError: string;
  toolParameters: string;
  toolResult: string;
  checkingWeather: string;
  generatingImage: string;
  generatedImage: string;
  download: string;
  createImage: string;

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

  consentTitle: string;
  consentDescription: string;
  consentStorageNotice: string;
  consentAiNotice: string;
  consentPrivacyLink: string;
  consentTrainingLabel: string;
  consentTrainingDescription: string;
  consentAcceptButton: string;
  consentRequiredNotice: string;

  aiDisclosure: string;

  privacyPageTitle: string;
  privacyLastUpdated: string;
  privacyIntro: string;
  privacyDataCollectionTitle: string;
  privacyDataCollectionContent: string;
  privacyDataUsageTitle: string;
  privacyDataUsageContent: string;
  privacyDataStorageTitle: string;
  privacyDataStorageContent: string;
  privacyUserRightsTitle: string;
  privacyUserRightsContent: string;
  privacyContactTitle: string;
  privacyContactContent: string;

  clearDataButton: string;
  clearDataConfirmTitle: string;
  clearDataConfirmDescription: string;
  clearDataConfirmButton: string;
  clearDataCancelButton: string;
  clearDataSuccess: string;
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

    aboutPageTitle: "Tentang BasaChat",
    aboutPageParagraph1:
      "BasaChat lahir dari visi sederhana namun berani: membawa kekuatan kecerdasan buatan dan akses informasi internet kepada seluruh masyarakat Indonesia. Kami percaya bahwa teknologi AI seharusnya tidak hanya menjadi hak istimewa segelintir orang, melainkan alat yang dapat memberdayakan setiap individu, dari kota besar hingga pelosok desa, untuk belajar, berkembang, dan terhubung dengan dunia.",
    aboutPageParagraph2:
      "Kami telah mengadaptasi model bahasa besar (LLM) modern untuk bekerja dengan bahasa-bahasa lokal Indonesia. BasaChat tidak hanya memahami Bahasa Indonesia, tetapi juga bahasa daerah seperti Jawa, Sunda, Aceh, Bali, dan Minangkabau. Dengan pendekatan ini, kami berharap dapat menjangkau lebih banyak masyarakat Indonesia yang mungkin lebih nyaman berkomunikasi dalam bahasa ibu mereka.",
    aboutPageParagraph3:
      "Ini baru permulaan. Kami terus bekerja untuk meningkatkan kemampuan BasaChat, menambah dukungan bahasa daerah lainnya, dan membuat teknologi AI semakin mudah diakses. Perjalanan kami menuju Indonesia yang lebih terhubung dan berdaya masih panjang, dan kami bersemangat untuk menempuhnya bersama Anda.",
    aboutPageStartChatting: "Mulai Mengobrol",
    aboutLink: "Tentang Kami",

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
    checkingWeather: "Memeriksa cuaca...",
    generatingImage: "Membuat gambar...",
    generatedImage: "Gambar Hasil",
    download: "Unduh",
    createImage: "Buat Gambar",

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

    // Consent banner
    consentTitle: "Selamat Datang di BasaChat",
    consentDescription:
      "Dengan melanjutkan, Anda menyetujui ketentuan berikut:",
    consentStorageNotice:
      "Kami menyimpan riwayat obrolan Anda untuk menyediakan layanan ini",
    consentAiNotice:
      "Anda berinteraksi dengan kecerdasan buatan (AI), bukan manusia",
    consentPrivacyLink: "Baca Kebijakan Privasi",
    consentTrainingLabel: "Bantu tingkatkan BasaChat",
    consentTrainingDescription:
      "Izinkan penggunaan obrolan Anda untuk melatih dan meningkatkan AI kami (opsional)",
    consentAcceptButton: "Mulai Mengobrol",
    consentRequiredNotice:
      "Persetujuan diperlukan untuk menggunakan layanan ini",

    // AI disclosure
    aiDisclosure:
      "Anda sedang berbicara dengan AI. Respons mungkin tidak selalu akurat.",

    // Privacy page
    privacyPageTitle: "Kebijakan Privasi",
    privacyLastUpdated: "Terakhir diperbarui: {date}",
    privacyIntro:
      "BasaChat berkomitmen melindungi privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda sesuai dengan Undang-Undang Pelindungan Data Pribadi (UU PDP) Indonesia.",
    privacyDataCollectionTitle: "Data yang Kami Kumpulkan",
    privacyDataCollectionContent:
      "Kami mengumpulkan: riwayat obrolan Anda dengan BasaChat, preferensi bahasa, dan data teknis seperti jenis perangkat dan browser. Kami tidak mengumpulkan nama, email, atau informasi identitas pribadi lainnya kecuali Anda memberikannya secara sukarela dalam obrolan.",
    privacyDataUsageTitle: "Penggunaan Data",
    privacyDataUsageContent:
      "Data obrolan digunakan untuk: menyediakan layanan AI, meningkatkan kualitas respons, dan jika Anda menyetujui, melatih model AI kami. Kami tidak menjual data Anda kepada pihak ketiga.",
    privacyDataStorageTitle: "Penyimpanan Data",
    privacyDataStorageContent:
      "Data disimpan dengan aman di server kami. Riwayat obrolan disimpan selama akun Anda aktif atau sampai Anda menghapusnya. Anda dapat menghapus riwayat obrolan kapan saja.",
    privacyUserRightsTitle: "Hak Anda",
    privacyUserRightsContent:
      "Sesuai UU PDP Indonesia, Anda berhak: mengakses data Anda, meminta penghapusan data, menarik persetujuan, dan mengajukan keberatan atas pemrosesan data.",
    privacyContactTitle: "Hubungi Kami",
    privacyContactContent:
      "Untuk pertanyaan tentang privasi atau permintaan penghapusan data, hubungi kami di privacy@basachat.com",

    // Clear data
    clearDataButton: "Hapus Riwayat Saya",
    clearDataConfirmTitle: "Hapus Semua Data?",
    clearDataConfirmDescription:
      "Tindakan ini akan menghapus semua riwayat obrolan dan preferensi Anda secara permanen. Tindakan ini tidak dapat dibatalkan.",
    clearDataConfirmButton: "Ya, Hapus Semua",
    clearDataCancelButton: "Batal",
    clearDataSuccess: "Data Anda telah dihapus.",
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

    aboutPageTitle: "About BasaChat",
    aboutPageParagraph1:
      "BasaChat was born from a simple yet bold vision: to bring the power of artificial intelligence and internet information access to all people of Indonesia. We believe that AI technology should not be a privilege for the few, but a tool that can empower every individual—from major cities to remote villages—to learn, grow, and connect with the world.",
    aboutPageParagraph2:
      "We have adapted modern large language models (LLMs) to work with Indonesia's local languages. BasaChat not only understands Bahasa Indonesia, but also regional languages such as Javanese, Sundanese, Acehnese, Balinese, and Minangkabau. With this approach, we hope to reach more Indonesians who may feel more comfortable communicating in their mother tongue.",
    aboutPageParagraph3:
      "This is just the beginning. We continue to work on improving BasaChat's capabilities, adding support for more regional languages, and making AI technology increasingly accessible. Our journey toward a more connected and empowered Indonesia is long, and we are excited to walk it together with you.",
    aboutPageStartChatting: "Start Chatting",
    aboutLink: "About Us",

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
    checkingWeather: "Checking weather...",
    generatingImage: "Generating image...",
    generatedImage: "Generated Image",
    download: "Download",
    createImage: "Create Image",

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

    // Consent banner
    consentTitle: "Welcome to BasaChat",
    consentDescription: "By continuing, you agree to the following:",
    consentStorageNotice: "We store your chat history to provide this service",
    consentAiNotice:
      "You are interacting with artificial intelligence (AI), not a human",
    consentPrivacyLink: "Read Privacy Policy",
    consentTrainingLabel: "Help improve BasaChat",
    consentTrainingDescription:
      "Allow your chats to be used to train and improve our AI (optional)",
    consentAcceptButton: "Start Chatting",
    consentRequiredNotice: "Consent is required to use this service",

    // AI disclosure
    aiDisclosure:
      "You are chatting with an AI. Responses may not always be accurate.",

    // Privacy page
    privacyPageTitle: "Privacy Policy",
    privacyLastUpdated: "Last updated: {date}",
    privacyIntro:
      "BasaChat is committed to protecting your privacy. This policy explains how we collect, use, and protect your data in accordance with Indonesia's Personal Data Protection Law (UU PDP).",
    privacyDataCollectionTitle: "Data We Collect",
    privacyDataCollectionContent:
      "We collect: your chat history with BasaChat, language preferences, and technical data such as device type and browser. We do not collect names, emails, or other personally identifiable information unless you voluntarily provide it in your chats.",
    privacyDataUsageTitle: "Data Usage",
    privacyDataUsageContent:
      "Chat data is used to: provide the AI service, improve response quality, and if you consent, train our AI models. We do not sell your data to third parties.",
    privacyDataStorageTitle: "Data Storage",
    privacyDataStorageContent:
      "Data is stored securely on our servers. Chat history is kept as long as your account is active or until you delete it. You can delete your chat history at any time.",
    privacyUserRightsTitle: "Your Rights",
    privacyUserRightsContent:
      "Under Indonesia's PDP Law, you have the right to: access your data, request data deletion, withdraw consent, and object to data processing.",
    privacyContactTitle: "Contact Us",
    privacyContactContent:
      "For privacy questions or data deletion requests, contact us at privacy@basachat.com",

    // Clear data
    clearDataButton: "Clear My History",
    clearDataConfirmTitle: "Delete All Data?",
    clearDataConfirmDescription:
      "This will permanently delete all your chat history and preferences. This action cannot be undone.",
    clearDataConfirmButton: "Yes, Delete All",
    clearDataCancelButton: "Cancel",
    clearDataSuccess: "Your data has been deleted.",
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

    aboutPageTitle: "Babagan BasaChat",
    aboutPageParagraph1:
      "BasaChat lair saka visi sing prasaja nanging wani: nggawa kekuatan kecerdasan buatan lan akses informasi internet kanggo kabeh masyarakat Indonesia. Kita percaya yen teknologi AI ora mung kudu dadi hak istimewa sawetara wong, nanging dadi piranti sing bisa nguatake saben individu—saka kutha gedhe nganti desa sing adoh—kanggo sinau, berkembang, lan nyambung karo donya.",
    aboutPageParagraph2:
      "Kita wis ngadaptasi model basa gedhe (LLM) modern supaya bisa kerja karo basa-basa lokal Indonesia. BasaChat ora mung ngerti Basa Indonesia, nanging uga basa dhaerah kayata Jawa, Sunda, Aceh, Bali, lan Minangkabau. Kanthi pendekatan iki, kita ngarep-arep bisa nggayuh luwih akeh wong Indonesia sing luwih nyaman komunikasi nganggo basa ibu.",
    aboutPageParagraph3:
      "Iki mung wiwitan. Kita terus kerja kanggo ningkatake kemampuan BasaChat, nambah dhukungan basa dhaerah liyane, lan nggawe teknologi AI saya gampang diakses. Perjalanan kita menyang Indonesia sing luwih nyambung lan kuwat isih dawa, lan kita semangat kanggo nglakoni bareng sampeyan.",
    aboutPageStartChatting: "Mulai Ngobrol",
    aboutLink: "Babagan Kita",

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
    checkingWeather: "Lagi ngecek cuaca...",
    generatingImage: "Lagi nggawe gambar...",
    generatedImage: "Gambar Asil",
    download: "Unduh",
    createImage: "Gawe Gambar",

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

    // Consent banner
    consentTitle: "Sugeng Rawuh ing BasaChat",
    consentDescription: "Kanthi nerusake, sampeyan setuju karo ketentuan iki:",
    consentStorageNotice:
      "Kita nyimpen riwayat obrolan sampeyan kanggo nyedhiyakake layanan iki",
    consentAiNotice:
      "Sampeyan lagi ngobrol karo kecerdasan buatan (AI), dudu manungsa",
    consentPrivacyLink: "Waca Kebijakan Privasi",
    consentTrainingLabel: "Tulung tingkatake BasaChat",
    consentTrainingDescription:
      "Ijinake obrolan sampeyan digunakake kanggo nglatih lan ningkatake AI kita (opsional)",
    consentAcceptButton: "Mulai Ngobrol",
    consentRequiredNotice:
      "Persetujuan dibutuhake kanggo nggunakake layanan iki",

    // AI disclosure
    aiDisclosure:
      "Sampeyan lagi ngobrol karo AI. Jawaban bisa uga ora selawase bener.",

    // Privacy page
    privacyPageTitle: "Kebijakan Privasi",
    privacyLastUpdated: "Pungkasan dianyari: {date}",
    privacyIntro:
      "BasaChat komitmen njaga privasi sampeyan. Kebijakan iki nerangake cara kita ngumpulake, nggunakake, lan njaga data sampeyan miturut UU PDP Indonesia.",
    privacyDataCollectionTitle: "Data sing Dikumpulake",
    privacyDataCollectionContent:
      "Kita ngumpulake: riwayat obrolan sampeyan karo BasaChat, preferensi basa, lan data teknis kaya jinis piranti lan browser.",
    privacyDataUsageTitle: "Panggunaan Data",
    privacyDataUsageContent:
      "Data obrolan digunakake kanggo: nyedhiyakake layanan AI, ningkatake kualitas jawaban, lan yen sampeyan setuju, nglatih model AI kita.",
    privacyDataStorageTitle: "Panyimpenan Data",
    privacyDataStorageContent:
      "Data disimpen kanthi aman ing server kita. Sampeyan bisa mbusak riwayat obrolan kapan wae.",
    privacyUserRightsTitle: "Hak Sampeyan",
    privacyUserRightsContent:
      "Miturut UU PDP Indonesia, sampeyan duwe hak kanggo: ngakses data, njaluk pambusakan data, mbatalake persetujuan, lan nolak pemrosesan data.",
    privacyContactTitle: "Hubungi Kita",
    privacyContactContent:
      "Kanggo pitakon babagan privasi, hubungi kita ing privacy@basachat.com",

    // Clear data
    clearDataButton: "Busak Riwayatku",
    clearDataConfirmTitle: "Busak Kabeh Data?",
    clearDataConfirmDescription:
      "Iki bakal mbusak kabeh riwayat obrolan lan preferensi sampeyan. Ora bisa dibatalake.",
    clearDataConfirmButton: "Ya, Busak Kabeh",
    clearDataCancelButton: "Batal",
    clearDataSuccess: "Data sampeyan wis dibusak.",
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

    aboutPageTitle: "Ngeunaan BasaChat",
    aboutPageParagraph1:
      "BasaChat lahir tina visi basajan tapi wani: mawa kakuatan kecerdasan jieunan jeung aksés informasi internét ka sadaya masarakat Indonésia. Urang percanten yén téknologi AI teu kedah jadi hak istimewa sawaréh jalma, tapi alat anu tiasa nguatkeun unggal individu—ti kota gedé dugi ka désa nu jauh—pikeun diajar, mekar, jeung nyambung ka dunya.",
    aboutPageParagraph2:
      "Urang parantos ngadaptasi modél basa gedé (LLM) modérn pikeun tiasa jalan sareng basa-basa lokal Indonésia. BasaChat henteu ngan ukur ngarti Basa Indonésia, tapi ogé basa daérah sapertos Jawa, Sunda, Acéh, Bali, sareng Minangkabau. Ku pendekatan ieu, urang miharep tiasa ngahontal langkung seueur urang Indonésia anu langkung nyaman komunikasi dina basa indung.",
    aboutPageParagraph3:
      "Ieu ngan ukur awalan. Urang terus damel pikeun ningkatkeun kamampuan BasaChat, nambihan dukungan basa daérah sanésna, sareng ngajantenkeun téknologi AI beuki gampang diaksés. Perjalanan urang ka arah Indonésia anu langkung nyambung sareng kuat masih panjang, sareng urang sumanget pikeun ngalakukeunana babarengan sareng anjeun.",
    aboutPageStartChatting: "Mimitian Ngobrol",
    aboutLink: "Ngeunaan Urang",

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
    checkingWeather: "Keur mariksa cuaca...",
    generatingImage: "Keur nyieun gambar...",
    generatedImage: "Gambar Hasil",
    download: "Undeur",
    createImage: "Jieun Gambar",

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

    // Consent banner
    consentTitle: "Wilujeng Sumping di BasaChat",
    consentDescription: "Ku neraskeun, anjeun satuju sareng katangtuan ieu:",
    consentStorageNotice:
      "Urang nyimpen riwayat obrolan anjeun pikeun nyayogikeun layanan ieu",
    consentAiNotice:
      "Anjeun keur ngobrol sareng kecerdasan jieunan (AI), sanés manusa",
    consentPrivacyLink: "Baca Kabijakan Privasi",
    consentTrainingLabel: "Bantosan ningkatkeun BasaChat",
    consentTrainingDescription:
      "Idinan obrolan anjeun dianggo pikeun ngalatih sareng ningkatkeun AI urang (opsional)",
    consentAcceptButton: "Mimitian Ngobrol",
    consentRequiredNotice:
      "Persetujuan diperyogikeun pikeun nganggo layanan ieu",

    // AI disclosure
    aiDisclosure:
      "Anjeun keur ngobrol sareng AI. Jawaban tiasa henteu salawasna akurat.",

    // Privacy page
    privacyPageTitle: "Kabijakan Privasi",
    privacyLastUpdated: "Pamungkas diropéa: {date}",
    privacyIntro:
      "BasaChat komitmen ngajagi privasi anjeun. Kabijakan ieu ngajelaskeun kumaha urang ngumpulkeun, nganggo, sareng ngajagi data anjeun dumasar kana UU PDP Indonésia.",
    privacyDataCollectionTitle: "Data anu Dikumpulkeun",
    privacyDataCollectionContent:
      "Urang ngumpulkeun: riwayat obrolan anjeun sareng BasaChat, préferénsi basa, sareng data téknis sapertos jinis alat sareng browser.",
    privacyDataUsageTitle: "Panggunaan Data",
    privacyDataUsageContent:
      "Data obrolan dianggo pikeun: nyayogikeun layanan AI, ningkatkeun kualitas jawaban, sareng upami anjeun satuju, ngalatih modél AI urang.",
    privacyDataStorageTitle: "Panyimpenan Data",
    privacyDataStorageContent:
      "Data disimpen kalayan aman dina server urang. Anjeun tiasa ngahapus riwayat obrolan iraha waé.",
    privacyUserRightsTitle: "Hak Anjeun",
    privacyUserRightsContent:
      "Dumasar kana UU PDP Indonésia, anjeun gaduh hak pikeun: ngaksés data, ménta ngahapus data, narik deui persetujuan, sareng nolak pamrosésan data.",
    privacyContactTitle: "Hubungi Urang",
    privacyContactContent:
      "Pikeun patarosan ngeunaan privasi, hubungi urang di privacy@basachat.com",

    // Clear data
    clearDataButton: "Hapus Riwayat Kuring",
    clearDataConfirmTitle: "Hapus Sadaya Data?",
    clearDataConfirmDescription:
      "Ieu bakal ngahapus sadaya riwayat obrolan sareng préferénsi anjeun. Teu tiasa dibatalkeun.",
    clearDataConfirmButton: "Enya, Hapus Sadayana",
    clearDataCancelButton: "Batal",
    clearDataSuccess: "Data anjeun parantos dihapus.",
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

    aboutPageTitle: "Keu BasaChat",
    aboutPageParagraph1:
      "BasaChat lahé nibak visi sederhana tapi berani: meuwariskan kekuatan kecerdasan buatan dan akses informasi internet keu ban mandum masyarakat Indonesia. Kamoe yakin teknologi AI hana jeuet cuma jadi hak istimewa sigöt-göt ureueng, tapi jadi alat nyang jeut peuteukôn tiep individu—nibak kuta rayeuk sampoe desa nyang jiôh—keu meunurot ilmoe, meukeutamah, dan meusambông ngon donya.",
    aboutPageParagraph2:
      "Kamoe ka meuadaptasi model bahasa rayeuk (LLM) modern mangat jeut meukureuja ngon bahasa-bahasa lokal Indonesia. BasaChat hana cuma meuphôm Bahasa Indonesia, tapi cit bahasa daerah lagèe Jawa, Sunda, Acèh, Bali, dan Minangkabau. Ngon pendekatan nyoe, kamoe harap jeut meugapai lé jai ureueng Indonesia nyang lé nyaman meukomunikasi ngon bahasa indông.",
    aboutPageParagraph3:
      "Nyoe cuma peumulaan. Kamoe terus meukureuja keu peutingkat kemampuan BasaChat, peutamah dukungan bahasa daerah laén, dan peujeuet teknologi AI semakin mudah diakses. Perjalanan kamoe keu Indonesia nyang lé meusambông dan teukôn masih panyang, dan kamoe semangat keu jalang sajan ngon gata.",
    aboutPageStartChatting: "Mulai Peugah",
    aboutLink: "Keu Kamoe",

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
    checkingWeather: "Lam cèk cuaca...",
    generatingImage: "Lam peugöt gambar...",
    generatedImage: "Gambar Hase",
    download: "Unduh",
    createImage: "Buet Gambar",

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

    // Consent banner
    consentTitle: "Meuseulawet u BasaChat",
    consentDescription:
      "Ngon meuteureubeh, gata meuseutuju ngon ketentuan nyoe:",
    consentStorageNotice:
      "Kamoe meusimpen riwayat peugah gata keu meuseudiya layanan nyoe",
    consentAiNotice:
      "Gata lam meupeugah ngon kecerdasan buatan (AI), kon manusia",
    consentPrivacyLink: "Baca Kebijakan Privasi",
    consentTrainingLabel: "Tulong tingkatkan BasaChat",
    consentTrainingDescription:
      "Bri izin peugah gata digunakan keu melatih dan meningkatkan AI kamoe (opsional)",
    consentAcceptButton: "Mulai Meupeugah",
    consentRequiredNotice: "Persetujuan diperlukan keu meugunakan layanan nyoe",

    // AI disclosure
    aiDisclosure: "Gata lam meupeugah ngon AI. Jaweuban mungken hana teupat.",

    // Privacy page
    privacyPageTitle: "Kebijakan Privasi",
    privacyLastUpdated: "Teureakhée diperbarui: {date}",
    privacyIntro:
      "BasaChat komitmen meulindungi privasi gata. Kebijakan nyoe neujelaskan bagaimana kamoe mengumpulkan, meugunakan, dan meulindungi data gata sesuai ngon UU PDP Indonesia.",
    privacyDataCollectionTitle: "Data nyang Dikumpulkan",
    privacyDataCollectionContent:
      "Kamoe mengumpulkan: riwayat peugah gata ngon BasaChat, preferensi bahasa, dan data teknis.",
    privacyDataUsageTitle: "Penggunaan Data",
    privacyDataUsageContent:
      "Data peugah digunakan keu: meuseudiya layanan AI, meningkatkan kualitas jaweuban, dan jika gata setuju, melatih model AI kamoe.",
    privacyDataStorageTitle: "Penyimpanan Data",
    privacyDataStorageContent:
      "Data disimpen ngon aman di server kamoe. Gata jeut meuhapus riwayat peugah bilapun.",
    privacyUserRightsTitle: "Hak Gata",
    privacyUserRightsContent:
      "Sesuai UU PDP Indonesia, gata na hak keu: meungakses data, meununtut penghapusan data, meutarik persetujuan, dan meunolak pemrosesan data.",
    privacyContactTitle: "Hubungi Kamoe",
    privacyContactContent:
      "Keu pertanyaan tentang privasi, hubungi kamoe di privacy@basachat.com",

    // Clear data
    clearDataButton: "Hapus Riwayat Lon",
    clearDataConfirmTitle: "Hapus Ban Mandum Data?",
    clearDataConfirmDescription:
      "Nyoe akan meuhapus ban mandum riwayat peugah dan preferensi gata. Hana jeut dibatalkan.",
    clearDataConfirmButton: "Jeh, Hapus Ban Mandum",
    clearDataCancelButton: "Batal",
    clearDataSuccess: "Data gata ka teuhapus.",
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

    aboutPageTitle: "Indik BasaChat",
    aboutPageParagraph1:
      "BasaChat embas saking visi sederhana nanging wanen: ngaba kakuatan kecerdasan buatan lan akses informasi internet ring makejang masyarakat Indonesia. Tiang pracaya yéning téknologi AI tan patut dados hak istimewa anak akidik, nanging dados piranti sané prasida nguatang nyabran individu—saking kota gedé kantos désa sané doh—anggen malajah, berkembang, lan masambungan ring jagaté.",
    aboutPageParagraph2:
      "Tiang sampun ngadaptasi modél basa gedé (LLM) modérn mangda prasida makarya sareng basa-basa lokal Indonésia. BasaChat nénten wantah ngresep Basa Indonésia, nanging taler basa daérah sakadi Jawi, Sunda, Acéh, Bali, lan Minangkabau. Antuk pendekatan puniki, tiang mapangapti prasida ngaksi langkungan akéh anak Indonésia sané langkungan nyaman makomunikasi ring basa rerama.",
    aboutPageParagraph3:
      "Puniki wantah purwaka. Tiang terus makarya anggen nincapang kamampuan BasaChat, nambahang dukungan basa daérah lianan, lan ngaénang téknologi AI sayan aluh kaakses. Pamargin tiang nuju Indonésia sané langkungan masambungan lan tegteg kantun dawa, lan tiang semangat anggen nglaksanayang sareng-sareng ring Ragané.",
    aboutPageStartChatting: "Ngawitin Mabebaosan",
    aboutLink: "Indik Tiang",

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
    checkingWeather: "Sedek ngecek cuaca...",
    generatingImage: "Sedek ngaénang gambar...",
    generatedImage: "Gambar Pikolih",
    download: "Unduh",
    createImage: "Ngaé Gambar",

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

    // Consent banner
    consentTitle: "Rahajeng Rauh ring BasaChat",
    consentDescription:
      "Antuk nglanturang, ragané setuju sareng katentuan puniki:",
    consentStorageNotice:
      "Tiang nyimpen riwayat omongan ragané anggen nyediaang layanan puniki",
    consentAiNotice:
      "Ragané sedek mabebaosan sareng kecerdasan buatan (AI), nénten manusa",
    consentPrivacyLink: "Wacen Kabijakan Privasi",
    consentTrainingLabel: "Tulung tingkatang BasaChat",
    consentTrainingDescription:
      "Lugrayang omongan ragané kaanggo anggen nglatih lan ningkatang AI tiang (opsional)",
    consentAcceptButton: "Ngawitin Mabebaosan",
    consentRequiredNotice:
      "Persetujuan kabuatang anggen nganggo layanan puniki",

    // AI disclosure
    aiDisclosure:
      "Ragané sedek mabebaosan sareng AI. Jawaban mrasidayang nénten selalu tepat.",

    // Privacy page
    privacyPageTitle: "Kabijakan Privasi",
    privacyLastUpdated: "Kaping terakhir kanyarin: {date}",
    privacyIntro:
      "BasaChat komitmen ngajagi privasi ragané. Kabijakan puniki nerangang sapunapi tiang ngumpulang, nganggo, lan ngajagi data ragané manut UU PDP Indonésia.",
    privacyDataCollectionTitle: "Data sané Kakumpulang",
    privacyDataCollectionContent:
      "Tiang ngumpulang: riwayat omongan ragané sareng BasaChat, préferénsi basa, lan data téknis.",
    privacyDataUsageTitle: "Panggunaan Data",
    privacyDataUsageContent:
      "Data omongan kaanggo anggen: nyediaang layanan AI, ningkatang kualitas jawaban, lan yéning ragané setuju, nglatih modél AI tiang.",
    privacyDataStorageTitle: "Panyimpenan Data",
    privacyDataStorageContent:
      "Data kasimpen antuk aman ring server tiang. Ragané prasida ngahapus riwayat omongan ring semengan.",
    privacyUserRightsTitle: "Hak Ragané",
    privacyUserRightsContent:
      "Manut UU PDP Indonésia, ragané maduwe hak anggen: ngaksés data, ngidih penghapusan data, narik persetujuan, lan nolak pemrosesan data.",
    privacyContactTitle: "Hubungi Tiang",
    privacyContactContent:
      "Anggen pitakén indik privasi, hubungi tiang ring privacy@basachat.com",

    // Clear data
    clearDataButton: "Hapus Riwayat Titiangé",
    clearDataConfirmTitle: "Hapus Makejang Data?",
    clearDataConfirmDescription:
      "Puniki pacang ngahapus makejang riwayat omongan lan préferénsi ragané. Nénten prasida kabatalang.",
    clearDataConfirmButton: "Inggih, Hapus Makejang",
    clearDataCancelButton: "Batal",
    clearDataSuccess: "Data ragané sampun kahapus.",
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

    aboutPageTitle: "Tantang BasaChat",
    aboutPageParagraph1:
      "BasaChat lahia dari visi nan saderhana tapi barani: mambao kakuatan kecerdasan buatan jo akses informasi internet kapado sadonyo masyarakat Indonésia. Kami paracayo taknologi AI indak sajo musti jadi hak istimewa sakaliak urang, tapi jadi alaik nan dapek manguatkan tiok individu—dari kota gadang sampai desa nan jauah—untuak balajar, bakambang, jo tasambung jo dunia.",
    aboutPageParagraph2:
      "Kami lah mangadaptasi modél bahaso gadang (LLM) modérn supayo dapek bakarajo jo bahaso-bahaso lokal Indonésia. BasaChat indak hanyo mangarati Bahaso Indonésia, tapi juo bahaso daerah sarupo Jawa, Sunda, Acéh, Bali, jo Minangkabau. Jo pendekatan ko, kami baharok dapek manggapai labiah banyak urang Indonésia nan labiah nyaman bakomunikasi jo bahaso induak.",
    aboutPageParagraph3:
      "Ko baru pamulaan. Kami taruih bakarajo untuak maningkekan kamampuan BasaChat, manambah dukungan bahaso daerah lain, jo mambuek taknologi AI semakin mudah diakses. Parjalanan kami ka Indonésia nan labiah tasambung jo kuaik masih panjang, jo kami samangaik untuak manjalanih basamo jo awak.",
    aboutPageStartChatting: "Mulai Bakecek",
    aboutLink: "Tantang Kami",

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
    checkingWeather: "Sadang mangecek cuaco...",
    generatingImage: "Sadang mambuek gambar...",
    generatedImage: "Gambar Hasil",
    download: "Unduah",
    createImage: "Buek Gambar",

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

    // Consent banner
    consentTitle: "Salamaik Datang ka BasaChat",
    consentDescription: "Jo malanjuikkan, awak satuju jo katantuan ko:",
    consentStorageNotice:
      "Kami manyimpan riwayat kecek awak untuak manyediakan layanan ko",
    consentAiNotice:
      "Awak sadang bakecek jo kecerdasan buatan (AI), bukan manusia",
    consentPrivacyLink: "Baco Kabijakan Privasi",
    consentTrainingLabel: "Tolong tingkekan BasaChat",
    consentTrainingDescription:
      "Izinkan kecek awak diagunoan untuak malatih jo maningkekan AI kami (opsional)",
    consentAcceptButton: "Mulai Bakecek",
    consentRequiredNotice:
      "Parsetujuan diparalukan untuak manggunoan layanan ko",

    // AI disclosure
    aiDisclosure:
      "Awak sadang bakecek jo AI. Jawaban mungkin indak salalu tapek.",

    // Privacy page
    privacyPageTitle: "Kabijakan Privasi",
    privacyLastUpdated: "Tarakhir diperbarui: {date}",
    privacyIntro:
      "BasaChat komitmen malindungi privasi awak. Kabijakan ko manjolaskan baa kami mangumpuakan, manggunoan, jo malindungi data awak manut UU PDP Indonesia.",
    privacyDataCollectionTitle: "Data nan Dikumpuakan",
    privacyDataCollectionContent:
      "Kami mangumpuakan: riwayat kecek awak jo BasaChat, preferensi bahaso, jo data teknis.",
    privacyDataUsageTitle: "Panggunoan Data",
    privacyDataUsageContent:
      "Data kecek diagunoan untuak: manyediakan layanan AI, maningkekan kualitas jawaban, jo jikok awak satuju, malatih model AI kami.",
    privacyDataStorageTitle: "Panyimpanan Data",
    privacyDataStorageContent:
      "Data disimpan jo aman di server kami. Awak dapek mahapuih riwayat kecek bilo sajo.",
    privacyUserRightsTitle: "Hak Awak",
    privacyUserRightsContent:
      "Manut UU PDP Indonesia, awak punyo hak untuak: mangakses data, maminta panghapusan data, manarik parsetujuan, jo manolak pamrosesan data.",
    privacyContactTitle: "Hubungi Kami",
    privacyContactContent:
      "Untuak patanyoan tantang privasi, hubungi kami di privacy@basachat.com",

    // Clear data
    clearDataButton: "Hapuih Riwayat Denai",
    clearDataConfirmTitle: "Hapuih Sadonyo Data?",
    clearDataConfirmDescription:
      "Ko ka mahapuih sadonyo riwayat kecek jo preferensi awak. Indak dapek dibatakan.",
    clearDataConfirmButton: "Yo, Hapuih Sadonyo",
    clearDataCancelButton: "Batal",
    clearDataSuccess: "Data awak alah tahapuih.",
  },
};

export const defaultLocale: SupportedLocale = "id";

export function t(
  key: keyof TranslationKeys,
  locale: SupportedLocale = defaultLocale
): string {
  return translations[locale]?.[key] ?? translations[defaultLocale][key];
}

export function getTranslations(
  locale: SupportedLocale = defaultLocale
): TranslationKeys {
  return translations[locale] ?? translations[defaultLocale];
}

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
export function createTranslator(languagePreference = "auto") {
  const locale = languageToLocale[languagePreference] ?? "id";
  const trans = translations[locale] ?? translations.id;

  return function translator(
    key: keyof TranslationKeys,
    params?: Record<string, string>
  ): string {
    let text = trans[key] ?? translations.id[key] ?? key;

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
export function getResolvedLanguage(languagePreference = "auto"): string {
  if (!languagePreference || languagePreference === "auto") {
    return "indonesian";
  }
  return languagePreference;
}

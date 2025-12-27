import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getTranslations,
  type SupportedLocale,
} from "@/lib/i18n";

const supportedLocales: SupportedLocale[] = [
  "id",
  "en",
  "jv",
  "su",
  "ace",
  "ban",
  "min",
];

// SEO metadata for each language
const localeMetadata: Record<
  SupportedLocale,
  { title: string; description: string; locale: string }
> = {
  id: {
    title: "Tentang BasaChat",
    description:
      "BasaChat membawa kecerdasan buatan kepada seluruh masyarakat Indonesia. Pelajari misi kami untuk menjembatani kesenjangan digital dengan AI yang mendukung bahasa daerah.",
    locale: "id_ID",
  },
  en: {
    title: "About BasaChat",
    description:
      "BasaChat brings artificial intelligence to all people of Indonesia. Learn about our mission to bridge the digital divide with AI that supports local languages.",
    locale: "en_US",
  },
  jv: {
    title: "Babagan BasaChat",
    description:
      "BasaChat nggawa kecerdasan buatan kanggo kabeh masyarakat Indonesia. Sinau babagan misi kita kanggo nyambungake kesenjangan digital nganggo AI sing ndhukung basa daerah.",
    locale: "jv_ID",
  },
  su: {
    title: "Ngeunaan BasaChat",
    description:
      "BasaChat mawa kecerdasan jieunan ka sadaya masarakat Indonesia. Diajar ngeunaan misi urang pikeun nyambungkeun kesenjangan digital nganggo AI anu ngarojong basa daérah.",
    locale: "su_ID",
  },
  ace: {
    title: "Keu BasaChat",
    description:
      "BasaChat meuwariskan kecerdasan buatan keu ban mandum masyarakat Indonesia. Blajar keu misi kamoe keu meusambông kesenjangan digital ngon AI nyang ndhukung basa daerah.",
    locale: "ace_ID",
  },
  ban: {
    title: "Indik BasaChat",
    description:
      "BasaChat ngaba kecerdasan buatan ring makejang masyarakat Indonesia. Malajah indik misi tiang anggen nyambungyang kesenjangan digital antuk AI sané ngarojongang basa daérah.",
    locale: "ban_ID",
  },
  min: {
    title: "Tantang BasaChat",
    description:
      "BasaChat mambao kecerdasan buatan kapado sadonyo masyarakat Indonesia. Balajar tantang misi kami untuak manyambung kesenjangan digital jo AI nan mandukuang bahaso daerah.",
    locale: "min_ID",
  },
};

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!supportedLocales.includes(lang as SupportedLocale)) {
    return {
      title: "Not Found",
    };
  }

  const locale = lang as SupportedLocale;
  const meta = localeMetadata[locale];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/about/${locale}`,
      languages: Object.fromEntries(
        supportedLocales.map((loc) => [loc, `/about/${loc}`])
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/about/${locale}`,
      locale: meta.locale,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return supportedLocales.map((lang) => ({ lang }));
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;

  if (!supportedLocales.includes(lang as SupportedLocale)) {
    notFound();
  }

  const locale = lang as SupportedLocale;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/10 via-accent/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-accent/10 via-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-12 md:py-20">
        {/* CTA Button at top */}
        <div className="mb-12 flex justify-center">
          <Link
            href={`/?lang=${locale}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {t.aboutPageStartChatting}
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary/10 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 6V2H8" />
              <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
              <path d="M2 12h2" />
              <path d="M9 11v2" />
              <path d="M15 11v2" />
              <path d="M20 12h2" />
            </svg>
          </div>
          <h1 className="font-bold text-4xl tracking-tight text-foreground md:text-5xl">
            {t.aboutPageTitle}
          </h1>
        </header>

        {/* Content */}
        <main className="space-y-8">
          <article className="rounded-2xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur-sm md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <h2 className="font-semibold text-lg text-foreground">
                {locale === "id" ? "Visi Kami" : locale === "en" ? "Our Vision" : t.aboutTitle}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t.aboutPageParagraph1}
            </p>
          </article>

          <article className="rounded-2xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur-sm md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent-foreground"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h2 className="font-semibold text-lg text-foreground">
                {locale === "id" ? "Bahasa Lokal" : locale === "en" ? "Local Languages" : t.aboutTitle}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t.aboutPageParagraph2}
            </p>
          </article>

          <article className="rounded-2xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur-sm md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-3/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-chart-3"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h2 className="font-semibold text-lg text-foreground">
                {locale === "id" ? "Masa Depan" : locale === "en" ? "The Future" : t.aboutTitle}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t.aboutPageParagraph3}
            </p>
          </article>
        </main>

        {/* Footer with language switcher */}
        <footer className="mt-16 border-border/50 border-t pt-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {supportedLocales.map((loc) => (
              <Link
                key={loc}
                href={`/about/${loc}`}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  loc === locale
                    ? "bg-primary font-medium text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {loc === "id"
                  ? "Indonesia"
                  : loc === "en"
                    ? "English"
                    : loc === "jv"
                      ? "Jawa"
                      : loc === "su"
                        ? "Sunda"
                        : loc === "ace"
                          ? "Acèh"
                          : loc === "ban"
                            ? "Bali"
                            : "Minang"}
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, type SupportedLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Privacy Policy",
  description:
    "Kebijakan privasi BasaChat - Bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda sesuai dengan UU PDP Indonesia.",
  alternates: {
    canonical: "/privacy",
  },
};

type PageProps = {
  searchParams: Promise<{ lang?: string }>;
};

const supportedLocales: SupportedLocale[] = ["id", "en"];

function getLocaleFromSearchParams(lang?: string): SupportedLocale {
  if (lang && supportedLocales.includes(lang as SupportedLocale)) {
    return lang as SupportedLocale;
  }
  return "id"; // Default to Indonesian for privacy policy
}

export default async function PrivacyPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const locale = getLocaleFromSearchParams(resolved.lang);
  const t = getTranslations(locale);

  // Format the last updated date
  const lastUpdatedDate = new Date("2025-01-01").toLocaleDateString(
    locale === "id" ? "id-ID" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="-top-40 -right-40 absolute h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/10 via-accent/5 to-transparent blur-3xl" />
        <div className="-bottom-40 -left-40 absolute h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-accent/10 via-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-12 md:py-20">
        {/* Back to chat button */}
        <div className="mb-8 flex justify-center">
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-muted-foreground text-sm transition-all hover:bg-muted/80 hover:text-foreground"
            href="/"
          >
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            {locale === "id" ? "Kembali ke Chat" : "Back to Chat"}
          </Link>
        </div>

        {/* Header */}
        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary/10 p-4">
            <svg
              className="text-primary"
              fill="none"
              height="48"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect height="18" rx="2" width="18" x="3" y="3" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>
          <h1 className="mb-2 font-bold text-3xl text-foreground tracking-tight md:text-4xl">
            {t.privacyPageTitle}
          </h1>
          <p className="text-muted-foreground text-sm">
            {t.privacyLastUpdated.replace("{date}", lastUpdatedDate)}
          </p>
        </header>

        {/* Content */}
        <main className="space-y-6">
          {/* Intro */}
          <div className="rounded-2xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <p className="text-muted-foreground leading-relaxed">
              {t.privacyIntro}
            </p>
          </div>

          {/* Data Collection */}
          <article className="rounded-2xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <svg
                  className="text-primary"
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h2 className="font-semibold text-foreground text-lg">
                {t.privacyDataCollectionTitle}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t.privacyDataCollectionContent}
            </p>
          </article>

          {/* Data Usage */}
          <article className="rounded-2xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-accent/20">
                <svg
                  className="text-accent-foreground"
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h2 className="font-semibold text-foreground text-lg">
                {t.privacyDataUsageTitle}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t.privacyDataUsageContent}
            </p>
          </article>

          {/* Data Storage */}
          <article className="rounded-2xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-chart-3/20">
                <svg
                  className="text-chart-3"
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14a9 3 0 0 0 18 0V5" />
                  <path d="M3 12a9 3 0 0 0 18 0" />
                </svg>
              </div>
              <h2 className="font-semibold text-foreground text-lg">
                {t.privacyDataStorageTitle}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t.privacyDataStorageContent}
            </p>
          </article>

          {/* User Rights */}
          <article className="rounded-2xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-chart-4/20">
                <svg
                  className="text-chart-4"
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h2 className="font-semibold text-foreground text-lg">
                {t.privacyUserRightsTitle}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t.privacyUserRightsContent}
            </p>
          </article>

          {/* Contact */}
          <article className="rounded-2xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-chart-5/20">
                <svg
                  className="text-chart-5"
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect height="16" rx="2" width="20" x="2" y="4" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h2 className="font-semibold text-foreground text-lg">
                {t.privacyContactTitle}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t.privacyContactContent}
            </p>
          </article>
        </main>

        {/* Language switcher */}
        <footer className="mt-12 border-border/50 border-t pt-8">
          <div className="flex items-center justify-center gap-2">
            {supportedLocales.map((loc) => (
              <Link
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  loc === locale
                    ? "bg-primary font-medium text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                href={`/privacy?lang=${loc}`}
                key={loc}
              >
                {loc === "id" ? "Indonesia" : "English"}
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useConsent } from "@/hooks/use-consent";
import { getTranslations, type SupportedLocale } from "@/lib/i18n";

type ConsentBannerProps = {
  locale?: SupportedLocale;
};

export function ConsentBanner({ locale = "id" }: ConsentBannerProps) {
  const t = getTranslations(locale);
  const { hasConsented, isLoading, acceptConsent } = useConsent();
  const [aiTrainingOptIn, setAiTrainingOptIn] = useState(false);

  if (isLoading) {
    return null;
  }

  if (hasConsented) {
    return null;
  }

  const handleAccept = () => {
    acceptConsent(aiTrainingOptIn);
  };

  return (
    <AlertDialog open>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mb-2 flex items-center justify-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <svg
                className="size-6 text-primary"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 6V2H8" />
                <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
                <path d="M2 12h2" />
                <path d="M9 11v2" />
                <path d="M15 11v2" />
                <path d="M20 12h2" />
              </svg>
            </div>
          </div>
          <AlertDialogTitle className="text-center text-xl">
            {t.consentTitle}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {t.consentDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3 py-2">
          <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
            <svg
              className="mt-0.5 size-5 shrink-0 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <p className="text-muted-foreground text-sm">
              {t.consentStorageNotice}
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
            <svg
              className="mt-0.5 size-5 shrink-0 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 8V4H8" />
              <rect height="12" rx="2" width="16" x="4" y="8" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
            <p className="text-muted-foreground text-sm">{t.consentAiNotice}</p>
          </div>

          <div className="text-center">
            <Link
              className="text-primary text-sm underline-offset-4 hover:underline"
              href="/privacy"
              target="_blank"
            >
              {t.consentPrivacyLink}
            </Link>
          </div>

          <div className="rounded-lg border border-border/50 p-3">
            <div className="flex cursor-pointer items-start gap-3">
              <Checkbox
                checked={aiTrainingOptIn}
                className="mt-0.5"
                id="ai-training-consent"
                onCheckedChange={(checked) =>
                  setAiTrainingOptIn(checked === true)
                }
              />
              <label className="space-y-1" htmlFor="ai-training-consent">
                <p className="cursor-pointer font-medium text-sm leading-none">
                  {t.consentTrainingLabel}
                </p>
                <p className="text-muted-foreground text-xs">
                  {t.consentTrainingDescription}
                </p>
              </label>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction
            className="w-full sm:w-auto"
            onClick={handleAccept}
          >
            {t.consentAcceptButton}
          </AlertDialogAction>
        </AlertDialogFooter>

        <p className="text-center text-muted-foreground text-xs">
          {t.consentRequiredNotice}
        </p>
      </AlertDialogContent>
    </AlertDialog>
  );
}

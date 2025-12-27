"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
// biome-ignore lint/performance/noNamespaceImport: will use this import
import * as React from "react";
import { RestartIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { getTranslations, type SupportedLocale } from "@/lib/i18n";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type AppSidebarProps = {
  locale?: SupportedLocale;
};

export function AppSidebar({ locale = "id" }: AppSidebarProps) {
  const t = getTranslations(locale);
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const [feedback, setFeedback] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim() || undefined,
          feedbackText: feedback.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setIsSubmitted(true);
      setFeedback("");
      setEmail("");

      // Reset submitted state after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Still show success to user, but log error
      setIsSubmitted(true);
      setFeedback("");
      setEmail("");
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <Link
                className="flex flex-row items-center gap-3"
                href="/"
                onClick={() => {
                  setOpenMobile(false);
                }}
              >
                <span className="cursor-pointer rounded-md px-2 font-semibold text-lg hover:bg-muted">
                  {t.appName}
                </span>
              </Link>
              <div className="flex flex-row gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="h-8 p-1 md:h-fit md:p-2"
                      onClick={() => {
                        setOpenMobile(false);
                        router.push("/");
                        router.refresh();
                      }}
                      type="button"
                      variant="ghost"
                    >
                      <RestartIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent align="end" className="hidden md:block">
                    {t.newChat}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* About Section */}
            <div className="rounded-lg bg-muted/50 p-3 text-xs">
              <p className="mb-1 font-medium text-foreground">{t.aboutTitle}</p>
              <p className="text-muted-foreground leading-relaxed">
                {t.aboutDescription}
              </p>
            </div>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      {/* <SidebarContent>
        <SidebarHistory locale={locale} />
      </SidebarContent> */}
      <SidebarFooter>
        {/* About Link */}
        <Link
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
          href={`/about/${locale}`}
          onClick={() => setOpenMobile(false)}
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
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          {t.aboutLink}
        </Link>

        {/* Feedback Section */}
        <div className="rounded-lg border p-3">
          <p className="mb-2 font-medium text-sm">{t.feedbackInputTitle}</p>
          {isSubmitted ? (
            <div className="py-2 text-center">
              <p className="font-medium text-green-600 text-xs">
                {t.feedbackThankYou}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Input
                  className="h-8 text-xs"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholder={t.feedbackEmailPlaceholder}
                  type="email"
                  value={email}
                />
                <Textarea
                  className="min-h-[80px] resize-none text-xs"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFeedback(e.target.value)
                  }
                  placeholder={t.feedbackPlaceholder}
                  value={feedback}
                />
              </div>
              <Button
                className="mt-2 w-full text-xs"
                disabled={!feedback.trim() || isSubmitting}
                onClick={handleFeedbackSubmit}
                size="sm"
                type="button"
              >
                {isSubmitting ? t.feedbackSending : t.feedbackSubmit}
              </Button>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

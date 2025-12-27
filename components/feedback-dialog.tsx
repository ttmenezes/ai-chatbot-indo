"use client";

// biome-ignore lint/performance/noNamespaceImport: will use this import
import * as React from "react";
import { MessageIcon } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getTranslations, type SupportedLocale } from "@/lib/i18n";

type FeedbackDialogProps = {
  locale?: SupportedLocale;
};

export function FeedbackDialog({ locale = "id" }: FeedbackDialogProps) {
  const t = getTranslations(locale);
  const [feedback, setFeedback] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async () => {
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

      // Close dialog after a short delay
      setTimeout(() => {
        setIsOpen(false);
        setFeedback("");
        setEmail("");
        setIsSubmitted(false);
      }, 1500);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Still show success to user, but log error
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setFeedback("");
        setEmail("");
        setIsSubmitted(false);
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="h-8 px-2 md:h-fit md:px-2"
          data-testid="feedback-button"
          variant="outline"
        >
          <MessageIcon />
          <span className="hidden md:inline">{t.feedbackButton}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t.feedbackTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {t.feedbackDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isSubmitted ? (
          <div className="py-6 text-center">
            <div className="mb-2 font-medium text-green-600 text-lg">
              {t.feedbackThankYou}
            </div>
            <p className="text-muted-foreground text-sm">
              {t.feedbackAppreciate}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholder={t.feedbackEmailPlaceholder}
                  type="email"
                  value={email}
                />
              </div>
              <Textarea
                className="min-h-[120px] resize-none"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFeedback(e.target.value)
                }
                placeholder={t.feedbackPlaceholder}
                value={feedback}
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>{t.feedbackCancel}</AlertDialogCancel>
              <AlertDialogAction
                disabled={!feedback.trim() || isSubmitting}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {isSubmitting ? t.feedbackSending : t.feedbackSubmit}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

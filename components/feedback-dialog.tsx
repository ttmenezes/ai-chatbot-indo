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
import { Textarea } from "@/components/ui/textarea";
import { getTranslations, type SupportedLocale } from "@/lib/i18n";

type FeedbackDialogProps = {
  locale?: SupportedLocale;
};

export function FeedbackDialog({ locale = "id" }: FeedbackDialogProps) {
  const t = getTranslations(locale);
  const [feedback, setFeedback] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - in production, replace with actual feedback submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log feedback to console for now
    console.log("Feedback submitted:", feedback);

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Close dialog after a short delay
    setTimeout(() => {
      setIsOpen(false);
      setFeedback("");
      setIsSubmitted(false);
    }, 1500);
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
          {t.feedbackButton}
          <span className="md:sr-only">{t.feedbackButton}</span>
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
            <Textarea
              className="min-h-[120px] resize-none"
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={t.feedbackPlaceholder}
              value={feedback}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>{t.feedbackCancel}</AlertDialogCancel>
              <AlertDialogAction
                disabled={!feedback.trim() || isSubmitting}
                onClick={(e) => {
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

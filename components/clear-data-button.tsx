"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useConsent } from "@/hooks/use-consent";
import { useLocale } from "@/lib/locale-context";

type ClearDataButtonProps = {
  chatId?: string;
};

export function ClearDataButton({ chatId: propChatId }: ClearDataButtonProps) {
  const { t } = useLocale();
  const { withdrawConsent } = useConsent();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const chatId =
    propChatId ||
    (pathname?.startsWith("/chat/") ? pathname.split("/chat/")[1] : null);

  const handleClearData = async () => {
    setIsDeleting(true);

    try {
      if (chatId) {
        const response = await fetch(`/api/data/delete?chatId=${chatId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete server data");
        }
      }

      withdrawConsent();

      toast({
        type: "success",
        description: t.clearDataSuccess,
      });

      setIsOpen(false);

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 500);
    } catch (error) {
      console.error("Failed to clear data:", error);
      toast({
        type: "error",
        description: "Gagal menghapus data. Silakan coba lagi.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={() => setIsOpen(true)}
        variant="outline"
      >
        <svg
          className="mr-2 size-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
        {t.clearDataButton}
      </Button>

      <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.clearDataConfirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.clearDataConfirmDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              {t.clearDataCancelButton}
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
              onClick={handleClearData}
            >
              {isDeleting ? "Menghapus..." : t.clearDataConfirmButton}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

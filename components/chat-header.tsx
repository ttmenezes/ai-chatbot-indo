"use client";

import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { memo } from "react";
import { useWindowSize } from "usehooks-ts";
import { FeedbackDialog } from "@/components/feedback-dialog";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { getTranslations, type SupportedLocale } from "@/lib/i18n";
import { RestartIcon } from "./icons";
import { useSidebar } from "./ui/sidebar";

type ChatHeaderProps = {
  locale?: SupportedLocale;
};

function PureChatHeader({ locale = "id" }: ChatHeaderProps) {
  const t = getTranslations(locale);
  const router = useRouter();
  const { open } = useSidebar();
  const { setTheme, resolvedTheme } = useTheme();

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="sticky top-0 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2">
      <SidebarToggle />

      {(!open || windowWidth < 768) && (
        <Button
          className="order-2 ml-auto h-8 px-2 md:order-1 md:ml-0 md:h-fit md:px-2"
          onClick={() => {
            router.push("/");
            router.refresh();
          }}
          variant="outline"
        >
          <RestartIcon />
          <span className="md:sr-only">{t.newChat}</span>
        </Button>
      )}

      {/* {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          className="order-1 md:order-2"
          selectedVisibilityType={selectedVisibilityType}
          showPublicOption={showPublicOption}
        />
      )} */}

      <Button
        aria-label={
          resolvedTheme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
        className="h-8 px-2"
        onClick={() => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        }}
        title={
          resolvedTheme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
        variant="outline"
      >
        {resolvedTheme === "dark" ? (
          <Sun size={16} />
        ) : resolvedTheme === "light" ? (
          <Moon size={16} />
        ) : (
          <Moon size={16} />
        )}
      </Button>

      <FeedbackDialog locale={locale} />
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader);

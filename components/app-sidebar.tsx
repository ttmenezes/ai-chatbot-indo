"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RestartIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
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
        {/* Feedback Section */}
        <div className="rounded-lg border p-3">
          <p className="mb-2 font-medium text-sm">{t.feedbackInputTitle}</p>
          <Textarea
            className="min-h-[80px] resize-none text-xs"
            placeholder={t.feedbackPlaceholder}
          />
          <Button className="mt-2 w-full text-xs" size="sm">
            {t.feedbackSubmit}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

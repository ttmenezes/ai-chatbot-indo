"use client";

import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { getTranslations, type SupportedLocale } from "@/lib/i18n";

export type ChatHistory = {
  chats: never[];
  hasMore: boolean;
};

export function getChatHistoryPaginationKey(
  _pageIndex: number,
  previousPageData: ChatHistory
) {
  if (previousPageData && previousPageData.hasMore === false) {
    return null;
  }

  if (_pageIndex === 0) {
    return "/api/history?limit=20";
  }

  return null;
}

type SidebarHistoryProps = {
  locale?: SupportedLocale;
};

export function SidebarHistory({ locale = "id" }: SidebarHistoryProps) {
  const t = getTranslations(locale);

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <div className="flex w-full flex-row items-center justify-center gap-2 px-2 text-sm text-zinc-500">
          {t.chatHistoryEmpty}
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

import { cookies } from "next/headers";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import type { SupportedLocale } from "@/lib/i18n";

// Stateless: Chat page loads client-side state only
// Messages are managed by client, no server-side loading
const VALID_LOCALES: SupportedLocale[] = [
  "id",
  "en",
  "jv",
  "su",
  "ace",
  "ban",
  "min",
];

async function resolveLocale(
  searchParams: Promise<{ lang?: string }>
): Promise<SupportedLocale> {
  const resolved = await searchParams;
  const lang = resolved.lang;

  if (lang && VALID_LOCALES.includes(lang as SupportedLocale)) {
    return lang as SupportedLocale;
  }

  return "id";
}

export default async function Page(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await props.params;
  const { id } = params;
  const locale = await resolveLocale(props.searchParams);

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get("chat-model");

  // Stateless: Start with empty messages, client maintains state
  const initialMessages: never[] = [];

  if (!chatModelFromCookie) {
    return (
      <>
        <Chat
          autoResume={false}
          id={id}
          initialChatModel={DEFAULT_CHAT_MODEL}
          initialLocale={locale}
          initialMessages={initialMessages}
          initialVisibilityType="private"
          isReadonly={false}
        />
        <DataStreamHandler />
      </>
    );
  }

  return (
    <>
      <Chat
        autoResume={false}
        id={id}
        initialChatModel={chatModelFromCookie.value}
        initialLocale={locale}
        initialMessages={initialMessages}
        initialVisibilityType="private"
        isReadonly={false}
      />
      <DataStreamHandler />
    </>
  );
}

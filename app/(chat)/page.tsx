import { cookies } from "next/headers";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import type { SupportedLocale } from "@/lib/i18n";
import { generateUUID } from "@/lib/utils";

const VALID_LOCALES: SupportedLocale[] = [
  "id",
  "en",
  "jv",
  "su",
  "ace",
  "ban",
  "min",
];

function resolveLocale(
  searchParams: Promise<{ lang?: string }>
): SupportedLocale {
  const params = searchParams instanceof Promise ? searchParams : Promise.resolve(searchParams);
  const resolved = params as unknown as { lang?: string };
  const lang = resolved.lang;

  if (lang && VALID_LOCALES.includes(lang as SupportedLocale)) {
    return lang as SupportedLocale;
  }

  return "id";
}

export default async function Page(props: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const id = generateUUID();
  const locale = resolveLocale(props.searchParams);

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  if (!modelIdFromCookie) {
    return (
      <>
        <Chat
          autoResume={false}
          id={id}
          initialChatModel={DEFAULT_CHAT_MODEL}
          initialMessages={[]}
          initialVisibilityType="private"
          isReadonly={false}
          key={id}
          initialLocale={locale}
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
        initialChatModel={modelIdFromCookie.value}
        initialMessages={[]}
        initialVisibilityType="private"
        isReadonly={false}
        key={id}
        initialLocale={locale}
      />
      <DataStreamHandler />
    </>
  );
}

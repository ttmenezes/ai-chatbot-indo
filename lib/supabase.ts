import { createClient } from "@supabase/supabase-js";
import type { ChatMessage } from "./types";

const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    "Missing Supabase environment variables: SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_PUBLISHABLE_KEY/SUPABASE_PUBLISHABLE_DEFAULT_KEY (or SUPABASE_ANON_KEY) must be set"
  );
}

const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export async function saveFeedback({
  email,
  feedbackText,
}: {
  email?: string;
  feedbackText: string;
}) {
  const { error } = await supabase.from("feedback").insert({
    email: email || null,
    feedback_text: feedbackText,
  });

  if (error) {
    console.error("Failed to save feedback:", error);
    throw error;
  }
}

export async function upsertChatLog({
  id,
  messages,
  locale,
}: {
  id: string;
  messages: ChatMessage[];
  locale?: string;
}) {
  const { error } = await supabase.from("logs").upsert(
    {
      id,
      messages: messages as unknown as Record<string, unknown>,
      locale: locale || null,
    },
    {
      onConflict: "id",
    }
  );

  if (error) {
    console.error("Failed to upsert chat log:", error);
    throw error;
  }
}

export async function deleteChatLogById(id: string) {
  const { error } = await supabase.from("logs").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete chat log:", error);
    throw error;
  }
}

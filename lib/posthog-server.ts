import "server-only";

import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

function isLlmTracingEnabled() {
  if (process.env.POSTHOG_LLM_TRACING_ENABLED === "false") {
    return false;
  }

  return true;
}

function getPostHogProjectKey() {
  return process.env.POSTHOG_KEY ?? process.env.NEXT_PUBLIC_POSTHOG_KEY;
}

function getPostHogHost() {
  return process.env.POSTHOG_HOST ?? process.env.NEXT_PUBLIC_POSTHOG_HOST;
}

export function getPostHogServerClient(): PostHog | null {
  if (!isLlmTracingEnabled()) {
    return null;
  }

  const apiKey = getPostHogProjectKey();
  const host = getPostHogHost();

  if (!apiKey || !host) {
    return null;
  }

  if (posthogClient) {
    return posthogClient;
  }

  posthogClient = new PostHog(apiKey, {
    flushAt: 1,
    flushInterval: 0,
    host,
  });

  return posthogClient;
}

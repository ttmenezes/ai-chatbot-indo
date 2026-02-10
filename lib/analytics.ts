"use client";

import posthog from "posthog-js";

export function track(
  event: string,
  properties: Record<string, unknown> = {}
) {
  try {
    posthog.capture(event, properties);
  } catch {
    // no-op
  }
}

export function clientContext() {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    online: navigator.onLine,
    path: window.location.pathname,
    query: window.location.search,
    referrer: document.referrer || null,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ua: navigator.userAgent,
  };
}

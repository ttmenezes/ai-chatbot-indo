"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import posthog from "posthog-js";
import { useConsent } from "@/hooks/use-consent";

export function PostHogPageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { hasConsented, isLoading } = useConsent();
  const query = searchParams?.toString() ?? "";
  const isPosthogEnabled =
    process.env.NEXT_PUBLIC_POSTHOG_ENABLED === "true" &&
    Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

  useEffect(() => {
    if (
      !isPosthogEnabled ||
      isLoading ||
      !hasConsented ||
      !pathname ||
      typeof window === "undefined"
    ) {
      return;
    }

    const url = `${window.location.origin}${pathname}${query ? `?${query}` : ""}`;

    posthog.capture("$pageview", {
      $current_url: url,
      path: pathname,
      query,
    });
  }, [pathname, query, hasConsented, isLoading, isPosthogEnabled]);

  return null;
}

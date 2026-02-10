"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useConsent } from "@/hooks/use-consent";
import { PostHogPageviewTracker } from "@/components/analytics/posthog-pageview-tracker";

type PostHogClientProviderProps = {
  children: ReactNode;
};

export function PostHogClientProvider({
  children,
}: PostHogClientProviderProps) {
  const { hasConsented, isLoading } = useConsent();
  const initializedRef = useRef(false);

  useEffect(() => {
    const enabled = process.env.NEXT_PUBLIC_POSTHOG_ENABLED === "true";
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

    if (!enabled || !key || initializedRef.current) {
      return;
    }

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
      autocapture: false,
      capture_pageleave: true,
      capture_pageview: false,
      person_profiles: "identified_only",
      persistence: "localStorage",
    });

    initializedRef.current = true;
  }, []);

  useEffect(() => {
    if (!initializedRef.current || isLoading) {
      return;
    }

    if (hasConsented) {
      posthog.opt_in_capturing();
      return;
    }

    posthog.opt_out_capturing();
  }, [hasConsented, isLoading]);

  return (
    <PostHogProvider client={posthog}>
      <PostHogPageviewTracker />
      {children}
    </PostHogProvider>
  );
}

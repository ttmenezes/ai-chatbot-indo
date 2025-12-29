"use client";

import { useCallback, useEffect, useState } from "react";

// localStorage keys for consent management
const CONSENT_KEYS = {
  hasConsented: "basachat-consent-accepted",
  consentTimestamp: "basachat-consent-timestamp",
  aiTrainingOptIn: "basachat-ai-training-opt-in",
} as const;

export type ConsentState = {
  hasConsented: boolean;
  consentTimestamp: string | null;
  aiTrainingOptIn: boolean;
  isLoading: boolean;
};

export type ConsentActions = {
  acceptConsent: (aiTrainingOptIn?: boolean) => void;
  withdrawConsent: () => void;
  updateAiTrainingOptIn: (optIn: boolean) => void;
};

/**
 * Hook for managing user consent state for Indonesia PDP Law compliance.
 * Stores consent in localStorage for guest/anonymous users.
 */
export function useConsent(): ConsentState & ConsentActions {
  const [isLoading, setIsLoading] = useState(true);
  const [hasConsented, setHasConsented] = useState(false);
  const [consentTimestamp, setConsentTimestamp] = useState<string | null>(null);
  const [aiTrainingOptIn, setAiTrainingOptIn] = useState(false);

  // Load consent state from localStorage on mount
  useEffect(() => {
    const storedConsent = localStorage.getItem(CONSENT_KEYS.hasConsented);
    const storedTimestamp = localStorage.getItem(CONSENT_KEYS.consentTimestamp);
    const storedTrainingOptIn = localStorage.getItem(
      CONSENT_KEYS.aiTrainingOptIn
    );

    setHasConsented(storedConsent === "true");
    setConsentTimestamp(storedTimestamp);
    setAiTrainingOptIn(storedTrainingOptIn === "true");
    setIsLoading(false);
  }, []);

  // Accept consent with optional AI training opt-in
  const acceptConsent = useCallback((trainingOptIn = false) => {
    const timestamp = new Date().toISOString();

    localStorage.setItem(CONSENT_KEYS.hasConsented, "true");
    localStorage.setItem(CONSENT_KEYS.consentTimestamp, timestamp);
    localStorage.setItem(
      CONSENT_KEYS.aiTrainingOptIn,
      trainingOptIn ? "true" : "false"
    );

    setHasConsented(true);
    setConsentTimestamp(timestamp);
    setAiTrainingOptIn(trainingOptIn);
  }, []);

  // Withdraw consent and clear all data
  const withdrawConsent = useCallback(() => {
    // Clear consent-related localStorage
    localStorage.removeItem(CONSENT_KEYS.hasConsented);
    localStorage.removeItem(CONSENT_KEYS.consentTimestamp);
    localStorage.removeItem(CONSENT_KEYS.aiTrainingOptIn);

    // Clear other app-related localStorage items
    localStorage.removeItem("webSearchEnabled");
    localStorage.removeItem("newsSearchEnabled");
    localStorage.removeItem("chat-language-preference");
    localStorage.removeItem("input");
    localStorage.removeItem("imageGenerationEnabled");

    setHasConsented(false);
    setConsentTimestamp(null);
    setAiTrainingOptIn(false);
  }, []);

  // Update AI training opt-in preference
  const updateAiTrainingOptIn = useCallback((optIn: boolean) => {
    localStorage.setItem(
      CONSENT_KEYS.aiTrainingOptIn,
      optIn ? "true" : "false"
    );
    setAiTrainingOptIn(optIn);
  }, []);

  return {
    hasConsented,
    consentTimestamp,
    aiTrainingOptIn,
    isLoading,
    acceptConsent,
    withdrawConsent,
    updateAiTrainingOptIn,
  };
}

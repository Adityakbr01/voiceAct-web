"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getConsent,
  setConsent as saveConsent,
  hasConsent,
  type ConsentCategories,
} from "@/lib/cookie-consent";

type CookieConsentContextValue = {
  consent: ConsentCategories;
  showBanner: boolean;
  setConsent: (categories: ConsentCategories) => void;
  acceptAll: () => void;
  rejectAll: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

const DEFAULT_CONSENT: ConsentCategories = { analytics: false, preferences: false };

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentCategories>(DEFAULT_CONSENT);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (existing) {
      setConsentState(existing);
    } else {
      setShowBanner(true);
    }
  }, []);

  const setConsent = useCallback((categories: ConsentCategories) => {
    setConsentState(categories);
    saveConsent(categories);
    setShowBanner(false);
  }, []);

  const acceptAll = useCallback(() => {
    setConsent({ analytics: true, preferences: true });
  }, [setConsent]);

  const rejectAll = useCallback(() => {
    setConsent({ analytics: false, preferences: false });
  }, [setConsent]);

  const value = useMemo(
    () => ({ consent, showBanner, setConsent, acceptAll, rejectAll }),
    [consent, showBanner, setConsent, acceptAll, rejectAll],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}

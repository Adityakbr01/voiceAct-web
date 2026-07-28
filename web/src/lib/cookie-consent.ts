const CONSENT_COOKIE = "va_cookie_consent";
const MAX_AGE = 365 * 24 * 60 * 60; // 1 year

export type ConsentCategories = {
  analytics: boolean;
  preferences: boolean;
};

type ConsentData = ConsentCategories & {
  timestamp: string;
};

function parseCookie(): ConsentData | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`${CONSENT_COOKIE}=([^;]+)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

export function getConsent(): ConsentCategories | null {
  const data = parseCookie();
  if (!data) return null;
  return { analytics: data.analytics, preferences: data.preferences };
}

export function setConsent(categories: ConsentCategories): void {
  const data: ConsentData = {
    ...categories,
    timestamp: new Date().toISOString(),
  };
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

export function hasConsent(): boolean {
  return parseCookie() !== null;
}

export function clearConsent(): void {
  document.cookie = `${CONSENT_COOKIE}=; path=/; max-age=0`;
}

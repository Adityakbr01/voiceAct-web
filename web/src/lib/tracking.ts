import api from "./api";

const SESSION_KEY = "va_session_id";
const TRACKING_KEY = "va_tracking";

function generateSessionId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = generateSessionId();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function captureUTMParams() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const adKeys = ["gclid", "fbclid", "msclkid", "ttclid", "li_fat_id", "campaign_id", "ad_id", "creative_id", "keyword"];

  const data: Record<string, string> = {};
  for (const key of [...utmKeys, ...adKeys]) {
    const val = params.get(key);
    if (val) data[key] = val;
  }

  if (Object.keys(data).length > 0) {
    localStorage.setItem(TRACKING_KEY, JSON.stringify({ ...JSON.parse(localStorage.getItem(TRACKING_KEY) || "{}"), ...data }));
  }

  const ref = params.get("ref");
  if (ref) {
    const existing = JSON.parse(localStorage.getItem(TRACKING_KEY) || "{}");
    existing.ref = ref;
    localStorage.setItem(TRACKING_KEY, JSON.stringify(existing));
  }
}

export function getTrackingData(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(TRACKING_KEY) || "{}");
  } catch {
    return {};
  }
}

export function getSessionId(): string {
  return getOrCreateSessionId();
}

export async function trackPageView() {
  if (typeof window === "undefined") return;
  const sessionId = getSessionId();
  try {
    await api.post("/tracking/pageview", null, {
      params: { tz: Intl.DateTimeFormat().resolvedOptions().timeZone, lp: window.location.pathname },
      headers: { "X-Session-Id": sessionId },
    });
  } catch {
    // silent fail — tracking shouldn't break the app
  }
}

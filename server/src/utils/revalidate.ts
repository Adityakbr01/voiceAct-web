export function triggerBlogRevalidation(): void {
  const secret = process.env.REVIEW_TOKEN || process.env.REVALIDATE_SECRET;
  const baseUrl = process.env.REVALIDATE_URL || process.env.FRONTEND_URL || "https://voiceact.tech";

  if (!secret) {
    console.warn(
      "[Revalidation] Skipped: Neither REVIEW_TOKEN nor REVALIDATE_SECRET is configured.",
    );
    return;
  }

  let targetUrl = baseUrl;
  if (!targetUrl.includes("/api/revalidate")) {
    targetUrl = `${targetUrl.replace(/\/$/, "")}/api/revalidate`;
  }

  const url = `${targetUrl}${targetUrl.includes("?") ? "&" : "?"}secret=${encodeURIComponent(secret)}`;

  // Non-blocking background execution
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        console.error(`[Revalidation] Request failed with status code ${res.status}`);
      }
    })
    .catch((err) => {
      console.error("[Revalidation] Network error during revalidation:", err?.message || err);
    });
}

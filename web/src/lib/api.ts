import axios from "axios";

const configured = process.env.NEXT_PUBLIC_API_URL;

// In the browser, use the same origin as the page: in dev Next.js rewrites
// /api/* to the local Express server, so this works from localhost, the LAN IP,
// and the Cloudflare tunnel URL. On the phone "localhost" would be the phone,
// which is why we never hardcode it.
function getApiBase(): string {
  if (process.env.API_URL) return process.env.API_URL.replace(/\/$/, "");
  if (configured && !/^https?:\/\/(localhost|127\.0\.0\.1)/i.test(configured)) {
    return configured.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") return "/api";
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/api`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api`;
  }
  return "http://localhost:5000/api";
}

const api = axios.create({
  baseURL: getApiBase(),
  headers: { "Content-Type": "application/json" },
  // Send the httpOnly auth cookie on every request
  withCredentials: true,
});

export default api;

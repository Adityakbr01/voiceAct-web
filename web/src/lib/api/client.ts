import axios from "axios";

export function getApiBase(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  }
  if (process.env.API_URL) return process.env.API_URL.replace(/\/$/, "");
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  if (process.env.NEXT_PUBLIC_API_BASE) return process.env.NEXT_PUBLIC_API_BASE.replace(/\/$/, "");
  if (process.env.NEXT_PUBLIC_SITE_URL)
    return `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/api`;
  return process.env.NODE_ENV === "production"
    ? "http://server:5000/api"
    : "http://localhost:5000/api";
}

const api = axios.create({
  baseURL: getApiBase(),
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor — add browser UA on server-side calls
api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    config.headers["User-Agent"] = "Mozilla/5.0 (compatible; VoiceActBot/1.0)";
  }
  return config;
});

// Response interceptor — unified error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to /admin/login
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
    }
    console.error("[API Error]", error.response?.status, error.message);
    return Promise.reject(error);
  },
);

export default api;

import axios from "axios";

const configured = process.env.NEXT_PUBLIC_API_URL;

function getApiBase(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  }
  if (process.env.API_URL) return process.env.API_URL.replace(/\/$/, "");
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  if (process.env.NEXT_PUBLIC_SITE_URL)
    return `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/api`;
  return process.env.NODE_ENV === "production"
    ? "http://server:5000/api"
    : "http://localhost:5000/api";
}

const api = axios.create({
  baseURL: getApiBase(),
  headers: { "Content-Type": "application/json" },
  // Send the httpOnly auth cookie on every request
  withCredentials: true,
});

export default api;

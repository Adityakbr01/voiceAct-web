/**
 * Auth API helpers.
 *
 * The server issues an httpOnly cookie on login — we never touch localStorage.
 * Every request goes through the axios instance which has withCredentials:true,
 * so the cookie is sent automatically.
 */
import api from "../api";
import type { AdminUser, ApiSuccess } from "../types/cms";

export async function login(email: string, password: string) {
  const { data } = await api.post<ApiSuccess<{ admin: AdminUser }>>("/auth/login", {
    email,
    password,
  });
  return data.data;
}

export async function fetchMe() {
  const { data } = await api.get<ApiSuccess<AdminUser>>("/auth/me");
  return data.data;
}

export async function logout() {
  // Ask the server to clear the httpOnly cookie
  await api.post("/auth/logout").catch(() => {});
}

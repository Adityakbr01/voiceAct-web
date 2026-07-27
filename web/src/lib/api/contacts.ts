import api from "../api";
import { getSessionId, getTrackingData } from "../tracking";
import type { ApiSuccess, ContactInquiry, ContactStatus } from "../types/cms";

export function trackingHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "X-Session-Id": getSessionId() };
  const td = getTrackingData();
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(td)) {
    if (v) params.set(k, v);
  }
  if (params.toString()) headers["X-Tracking-Params"] = params.toString();
  return headers;
}

export async function submitContact(payload: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}) {
  const td = getTrackingData();
  const { data } = await api.post<ApiSuccess<ContactInquiry>>("/contact", payload, {
    headers: trackingHeaders(),
    params: {
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      lp: typeof window !== "undefined" ? window.location.pathname : "/",
      ...td,
    },
  });
  return data.data;
}

export async function listContacts(params?: {
  status?: ContactStatus;
  page?: number;
  limit?: number;
}) {
  const { data } = await api.get<ApiSuccess<ContactInquiry[]>>("/contact", { params });
  return { items: data.data, meta: data.meta };
}

export async function getContactById(id: string) {
  const { data } = await api.get<ApiSuccess<ContactInquiry>>(`/contact/${id}`);
  return data.data;
}

export async function updateContactStatus(id: string, status: ContactStatus) {
  const { data } = await api.patch<ApiSuccess<ContactInquiry>>(`/contact/${id}`, { status });
  return data.data;
}

export async function exportContacts(status?: ContactStatus) {
  const params = status ? { status } : undefined;
  const { data } = await api.get("/contact/export", { params, responseType: "blob" });
  return data;
}

import api from "../api";
import type { ApiSuccess, BlogRecord, ProjectRecord, ServiceRecord } from "../types/cms";

// ========== SERVICES ==========

export async function listServices() {
  const { data } = await api.get<ApiSuccess<ServiceRecord[]>>("/services");
  return data.data;
}

export async function listAdminServices() {
  const { data } = await api.get<ApiSuccess<ServiceRecord[]>>("/services/admin/all");
  return data.data;
}

export async function getServiceBySlug(slug: string) {
  const { data } = await api.get<ApiSuccess<ServiceRecord>>(`/services/${slug}`);
  return data.data;
}

export async function createService(
  payload: Partial<ServiceRecord> & { title: string; slug: string; description: string },
) {
  const { data } = await api.post<ApiSuccess<ServiceRecord>>("/services", payload);
  return data.data;
}

export async function updateService(id: string, payload: Partial<ServiceRecord>) {
  const { data } = await api.put<ApiSuccess<ServiceRecord>>(`/services/${id}`, payload);
  return data.data;
}

export async function reorderServices(items: { id: string; order: number }[]) {
  const { data } = await api.patch<ApiSuccess<null>>("/services/reorder", { items });
  return data.data;
}

export async function deleteService(id: string) {
  await api.delete(`/services/${id}`);
}

// ========== PROJECTS ==========

export async function listProjects() {
  const { data } = await api.get<ApiSuccess<ProjectRecord[]>>("/projects");
  return data.data;
}

export async function getProjectBySlug(slug: string) {
  const { data } = await api.get<ApiSuccess<ProjectRecord>>(`/projects/${slug}`);
  return data.data;
}

export async function createProject(
  payload: Partial<ProjectRecord> & { title: string; slug: string; description: string },
) {
  const { data } = await api.post<ApiSuccess<ProjectRecord>>("/projects", payload);
  return data.data;
}

export async function updateProject(id: string, payload: Partial<ProjectRecord>) {
  const { data } = await api.put<ApiSuccess<ProjectRecord>>(`/projects/${id}`, payload);
  return data.data;
}

export async function deleteProject(id: string) {
  await api.delete(`/projects/${id}`);
}

function getApiBaseUrl(): string {
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

// ========== BLOGS ==========

export async function listBlogs(options?: { page?: number; limit?: number; category?: string }) {
  const baseUrl = getApiBaseUrl();
  const queryParams = new URLSearchParams();
  if (options?.page) queryParams.append("page", String(options.page));
  if (options?.limit) queryParams.append("limit", String(options.limit));
  if (options?.category && options.category !== "All")
    queryParams.append("category", options.category);

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  console.log(`[CMS DEBUG] listBlogs() fetching from: ${baseUrl}/blogs${queryString}`);
  try {
    const res = await fetch(`${baseUrl}/blogs${queryString}`, {
      cache: "no-store",
    });
    console.log(`[CMS DEBUG] listBlogs() HTTP status: ${res.status}`);
    if (!res.ok) {
      console.warn(
        `[CMS DEBUG] Backend API at ${baseUrl}/blogs${queryString} returned error status ${res.status}`,
      );
      return { data: [], pagination: undefined };
    }
    const data: ApiSuccess<BlogRecord[]> = await res.json();
    const count = data?.data?.length || 0;
    console.log(`[CMS DEBUG] listBlogs() successfully fetched ${count} blogs from MongoDB API`);
    return {
      data: data.data || [],
      pagination: data.pagination || (data as any).meta?.pagination,
    };
  } catch (error: any) {
    console.error(
      `[CMS DEBUG ERROR] listBlogs() failed connecting to ${baseUrl}/blogs${queryString}:`,
      error?.message || error,
    );
    return { data: [], pagination: undefined };
  }
}

export async function listAdminBlogs() {
  const { data } = await api.get<ApiSuccess<BlogRecord[]>>("/blogs/admin/all");
  return data.data;
}

export async function getBlogBySlug(slug: string) {
  const baseUrl = getApiBaseUrl();
  console.log(`[CMS DEBUG] getBlogBySlug("${slug}") fetching from: ${baseUrl}/blogs/${slug}`);
  try {
    const res = await fetch(`${baseUrl}/blogs/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    console.log(`[CMS DEBUG] getBlogBySlug("${slug}") HTTP status: ${res.status}`);
    if (!res.ok) return null;
    const data: ApiSuccess<BlogRecord> = await res.json();
    console.log(`[CMS DEBUG] getBlogBySlug("${slug}") result found: ${!!data?.data}`);
    return data.data;
  } catch (error: any) {
    console.error(`[CMS DEBUG ERROR] getBlogBySlug("${slug}") failed:`, error?.message || error);
    return null;
  }
}

export async function createBlog(
  payload: Partial<BlogRecord> & { title: string; slug: string; excerpt: string; content: string },
) {
  const { data } = await api.post<ApiSuccess<BlogRecord>>("/blogs", payload);
  return data.data;
}

export async function updateBlog(id: string, payload: Partial<BlogRecord>) {
  const { data } = await api.put<ApiSuccess<BlogRecord>>(`/blogs/${id}`, payload);
  return data.data;
}

export async function deleteBlog(id: string) {
  await api.delete(`/blogs/${id}`);
}

export async function uploadImage(file: File) {
  const reader = new FileReader();
  const base64Data = await new Promise<string>((resolve, reject) => {
    reader.onload = () => {
      const res = reader.result as string;
      const base64 = res.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const { data } = await api.post<ApiSuccess<{ url: string; filename: string }>>("/upload/image", {
    filename: file.name,
    mimeType: file.type,
    data: base64Data,
  });

  return data.data;
}

import api from "../api";
import type { ApiSuccess, ProjectRecord, ServiceRecord } from "../types/cms";

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
  payload: Partial<ServiceRecord> & { title: string; slug: string; description: string }
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
  payload: Partial<ProjectRecord> & { title: string; slug: string; description: string }
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

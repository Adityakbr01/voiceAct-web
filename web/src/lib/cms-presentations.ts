import {
  services as staticServices,
  work as staticWork,
  type Service,
  type WorkItem,
} from "@/modules/services-data";
import type { ProjectRecord, ServiceRecord } from "@/lib/types/cms";

export function mergeServicesFromApi(apiServices: ServiceRecord[]): Service[] {
  if (!apiServices.length) return staticServices;

  const active = apiServices.filter((s) => s.active).sort((a, b) => a.order - b.order);

  return active.map((s, i) => {
    const bySlug = staticServices.find((p) =>
      p.title.toLowerCase().includes(s.slug.replace(/-/g, " ").slice(0, 8)),
    );
    const preset = bySlug ?? staticServices[i % staticServices.length];
    return {
      ...preset,
      title: s.title,
      description: s.description,
    };
  });
}

export function mergeProjectsToWork(projects: ProjectRecord[]): WorkItem[] {
  if (!projects.length) return staticWork;

  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return sorted.map((p, i) => {
    const preset = staticWork[i % staticWork.length];
    return {
      ...preset,
      title: p.title,
      client: p.client ?? preset.client,
      outcome: p.description,
    };
  });
}

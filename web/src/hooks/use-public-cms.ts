"use client";

import { useQuery } from "@tanstack/react-query";
import { listProjects, listServices } from "@/lib/api/cms";
import { queryKeys } from "@/lib/api/query-keys";
import { mergeProjectsToWork, mergeServicesFromApi } from "@/lib/cms-presentations";
import { services as staticServices, work as staticWork } from "@/modules/services-data";
import type { Service, WorkItem } from "@/modules/services-data";

export function usePublicServices() {
  const query = useQuery({
    queryKey: queryKeys.public.services,
    queryFn: listServices,
    staleTime: 60_000,
  });

  const data: Service[] = query.data ? mergeServicesFromApi(query.data) : staticServices;

  return { ...query, data };
}

export function usePublicProjects() {
  const query = useQuery({
    queryKey: queryKeys.public.projects,
    queryFn: listProjects,
    staleTime: 60_000,
  });

  const data: WorkItem[] = query.data ? mergeProjectsToWork(query.data) : staticWork;

  return { ...query, data };
}

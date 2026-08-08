"use client";

import { useQuery } from "@tanstack/react-query";
import { listBlogs, listProjects, listServices } from "@/lib/api/cms";
import { queryKeys } from "@/lib/api/query-keys";
import {
  mergeBlogsFromApi,
  mergeProjectsToWork,
  mergeServicesFromApi,
} from "@/lib/cms-presentations";
import {
  services as staticServices,
  work as staticWork,
  type Service,
  type WorkItem,
} from "@/modules/services-data";
import { blogPosts, type BlogPost } from "@/modules/blog-data";

export function usePublicServices({ enabled = true }: { enabled?: boolean } = {}) {
  const query = useQuery({
    queryKey: queryKeys.public.services,
    queryFn: listServices,
    staleTime: 60_000,
    enabled,
  });

  const data: Service[] = query.data ? mergeServicesFromApi(query.data) : staticServices;

  return { ...query, data };
}

export function usePublicProjects({ enabled = true }: { enabled?: boolean } = {}) {
  const query = useQuery({
    queryKey: queryKeys.public.projects,
    queryFn: listProjects,
    staleTime: 60_000,
    enabled,
  });

  const data: WorkItem[] = query.data ? mergeProjectsToWork(query.data) : staticWork;

  return { ...query, data };
}

export function usePublicBlogs({ enabled = true }: { enabled?: boolean } = {}) {
  const query = useQuery({
    queryKey: queryKeys.public.blogs,
    queryFn: async () => {
      const res = await listBlogs();
      return res.data;
    },
    staleTime: 60_000,
    enabled,
  });

  const data: BlogPost[] = query.data ? mergeBlogsFromApi(query.data) : blogPosts;

  return { ...query, data };
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { listBlogs, listProjects, listServices } from "@/lib/api/cms";
import { queryKeys } from "@/lib/api/query-keys";
import { mergeProjectsToWork, mergeServicesFromApi } from "@/lib/cms-presentations";
import { services as staticServices, work as staticWork } from "@/modules/services-data";
import { blogPosts, type BlogPost } from "@/modules/blog-data";
import type { BlogRecord } from "@/lib/types/cms";
import type { Service, WorkItem } from "@/modules/services-data";

export function mergeBlogsFromApi(apiBlogs: BlogRecord[]): BlogPost[] {
  if (!apiBlogs || apiBlogs.length === 0) return blogPosts;
  const mappedApi: BlogPost[] = apiBlogs.map((b) => ({
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    content: b.content,
    category: (b.category as BlogPost["category"]) || "Engineering",
    readTime: b.readTime || "5 min read",
    publishedAt: b.publishedAt || "Recently",
    author: {
      name: b.author?.name || "VoiceAct Team",
      role: b.author?.role || "Engineering Team",
      avatar: b.author?.avatar || "https://github.com/Adityakbr01.png",
    },
    coverImage:
      b.coverImage ||
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    featured: b.featured ?? false,
    tags: b.tags || [b.category || "Tech"],
  }));

  const apiSlugs = new Set(mappedApi.map((p) => p.slug));
  const remainingStatic = blogPosts.filter((p) => !apiSlugs.has(p.slug));
  return [...mappedApi, ...remainingStatic];
}

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
    queryFn: listBlogs,
    staleTime: 60_000,
    enabled,
  });

  const data: BlogPost[] = query.data ? mergeBlogsFromApi(query.data) : blogPosts;

  return { ...query, data };
}

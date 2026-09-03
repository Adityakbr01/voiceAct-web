import {
  services as staticServices,
  work as staticWork,
  type Service,
  type WorkItem,
} from "@/modules/services-data";
import { blogPosts, type BlogPost } from "@/modules/blog-data";
import type { BlogRecord, ProjectRecord, ServiceRecord } from "@/lib/types/cms";

export function mergeServicesFromApi(apiServices: ServiceRecord[]): Service[] {
  if (!apiServices || !apiServices.length) return staticServices;

  const active = apiServices.filter((s) => s.active).sort((a, b) => a.order - b.order);

  return active.map((s, i) => {
    const bySlug = staticServices.find((p) =>
      p.title.toLowerCase().includes(s.slug.replace(/-/g, " ").slice(0, 8)),
    );
    const preset = bySlug ?? staticServices[i % staticServices.length] ?? staticServices[0];
    return {
      ...preset,
      title: s.title,
      description: s.description,
      bullets: preset.bullets ?? [],
    };
  });
}

export function mergeProjectsToWork(projects: ProjectRecord[]): WorkItem[] {
  if (!projects || !projects.length) return staticWork;

  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return sorted.map((p, i) => {
    const preset = staticWork.length ? staticWork[i % staticWork.length] : undefined;
    const servicesText = p.services?.length
      ? p.services.map((s) => s.replace(/-/g, " ")).join(" · ")
      : "Custom Software";

    return {
      title: p.title,
      client: p.client || preset?.client || "Client Project",
      industry: preset?.industry || servicesText,
      outcome: p.description,
      metrics: preset?.metrics ?? [],
      services: p.services ?? [],
      url: p.url,
    };
  });
}

export function mergeBlogsFromApi(apiBlogs: BlogRecord[]): BlogPost[] {
  if (!apiBlogs || apiBlogs.length === 0) return blogPosts;
  return apiBlogs.map((b) => ({
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
}

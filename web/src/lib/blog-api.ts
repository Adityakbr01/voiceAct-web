import type { BlogPost } from "@/types/blog";

export type { BlogPost };

const getApiBase = (): string => {
  if (process.env.API_URL) return process.env.API_URL.replace(/\/$/, "");
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  if (process.env.NEXT_PUBLIC_API_BASE) return process.env.NEXT_PUBLIC_API_BASE.replace(/\/$/, "");
  if (process.env.NEXT_PUBLIC_SITE_URL)
    return `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/api`;
  if (process.env.NODE_ENV === "production") return "https://voiceact.tech/api";
  return "http://localhost:5000/api";
};

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const apiBase = getApiBase();
  try {
    const res = await fetch(`${apiBase}/blogs`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; VoiceActBot/1.0)",
        Accept: "application/json",
      },
      next: { revalidate: 300, tags: ["blog-posts"] },
    });

    if (!res.ok) {
      console.warn(`[blog-api] Failed to fetch blog posts: HTTP ${res.status}`);
      return [];
    }

    const data = await res.json();
    if (data && Array.isArray(data.data)) {
      return data.data;
    }
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (err) {
    console.error("Failed to fetch blog posts for sitemap:", err);
    return [];
  }
}

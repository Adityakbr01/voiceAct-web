import type { MetadataRoute } from "next";
import { APP } from "@/config/constants";
import { listProjects } from "@/lib/api/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || APP.url || "https://voiceact.tech").replace(
    /\/$/,
    "",
  );

  // Base static routes with standard priorities and update frequencies
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamically include published portfolio project detail pages (/work/[slug])
  try {
    const projects = await listProjects();
    if (Array.isArray(projects)) {
      for (const project of projects) {
        if (project.slug) {
          routes.push({
            url: `${baseUrl}/work/${project.slug}`,
            lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch dynamic project routes for sitemap:", error);
  }

  return routes;
}

import type { MetadataRoute } from "next";
import { APP } from "@/config/constants";
import { listProjects, listServices } from "@/lib/api/cms";
import { blogPosts } from "@/modules/blog-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || APP.url || "https://voiceact.tech").replace(
    /\/$/,
    "",
  );

  // Base static routes
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
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
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

  // Static fallback service routes
  const defaultServiceSlugs = [
    "web-development",
    "mobile-development",
    "saas-development",
    "ui-ux-design",
    "ai-solutions",
    "cloud-solutions",
  ];

  // Dynamic portfolio project detail pages (/work/[slug])
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

  // Service detail pages (/services/[slug])
  try {
    const services = await listServices();
    if (Array.isArray(services) && services.length > 0) {
      for (const service of services) {
        if (service.slug) {
          routes.push({
            url: `${baseUrl}/services/${service.slug}`,
            lastModified: service.updatedAt ? new Date(service.updatedAt) : new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      }
    } else {
      for (const slug of defaultServiceSlugs) {
        routes.push({
          url: `${baseUrl}/services/${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch {
    for (const slug of defaultServiceSlugs) {
      routes.push({
        url: `${baseUrl}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  // Blog post detail pages (/blog/[slug])
  for (const post of blogPosts) {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return routes;
}

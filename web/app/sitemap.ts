import type { MetadataRoute } from "next";
import { APP } from "@/config/constants";
import { listBlogs, listProjects, listServices } from "@/lib/api/cms";
import { blogPosts } from "@/modules/blog-data";

export const revalidate = 300;

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
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/audit`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hire/react-developers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hire/nextjs-developers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hire/react-native-developers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hire/ai-engineers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/crm-vs-erp`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare/nextjs-vs-react`,
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
    "crm-development",
    "cms-development",
    "saas-development",
    "ai-solutions",
    "ui-ux-design",
    "ecommerce-development",
    "api-development",
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
  const blogMap = new Map<string, { slug: string; updatedAt?: string; createdAt?: string }>();

  try {
    const res = await listBlogs();
    const apiBlogs = res.data;
    if (Array.isArray(apiBlogs) && apiBlogs.length > 0) {
      for (const blog of apiBlogs) {
        if (blog.slug) {
          blogMap.set(blog.slug, {
            slug: blog.slug,
            updatedAt: blog.updatedAt,
            createdAt: blog.createdAt,
          });
        }
      }
    } else {
      for (const post of blogPosts) {
        if (post.slug) {
          blogMap.set(post.slug, { slug: post.slug });
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch dynamic blog routes for sitemap:", error);
    for (const post of blogPosts) {
      if (post.slug) {
        blogMap.set(post.slug, { slug: post.slug });
      }
    }
  }

  for (const post of blogMap.values()) {
    const lastModDate = post.updatedAt
      ? new Date(post.updatedAt)
      : post.createdAt
        ? new Date(post.createdAt)
        : new Date();
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Programmatic Location Pages (/location/[city]/[service])
  const cities = ["bangalore", "bengaluru", "hyderabad", "pune", "mumbai", "delhi"];
  const locationServices = [
    "web-development",
    "mobile-development",
    "crm-development",
    "saas-development",
    "ai-solutions",
    "ui-ux-design",
  ];

  for (const city of cities) {
    for (const service of locationServices) {
      routes.push({
        url: `${baseUrl}/location/${city}/${service}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return routes;
}

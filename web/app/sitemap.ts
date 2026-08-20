import type { MetadataRoute } from "next";
import { APP } from "@/config/constants";
import { getAllBlogPosts } from "@/lib/blog-api";
import { listBlogs, listProjects, listServices } from "@/lib/api/cms";
import { blogPosts } from "@/modules/blog-data";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || APP.url || "https://voiceact.tech").replace(
    /\/$/,
    "",
  );
  const now = new Date();

  // Base static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hire`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/audit`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/open-source`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hire/react-developers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hire/nextjs-developers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hire/react-native-developers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hire/ai-engineers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/crm-vs-erp`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare/nextjs-vs-react`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare/custom-crm-vs-off-the-shelf`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // Location landing pages — important for local SEO
    ...(["bangalore", "hyderabad", "pune", "mumbai", "delhi"] as const).map((city) => ({
      url: `${baseUrl}/location/${city}/web-development`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  // Static fallback service slugs — must match actual /services/[slug] pages
  const defaultServiceSlugs = [
    "web-development",
    "mobile-development",
    "crm-development",
    "cms-development",
    "saas-development",
    "ai-solutions",
    "ui-ux-design",
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
            lastModified: project.updatedAt ? new Date(project.updatedAt) : now,
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
            lastModified: service.updatedAt ? new Date(service.updatedAt) : now,
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      }
    } else {
      for (const slug of defaultServiceSlugs) {
        routes.push({
          url: `${baseUrl}/services/${slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch {
    for (const slug of defaultServiceSlugs) {
      routes.push({
        url: `${baseUrl}/services/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  // Dynamic blog post detail pages (/blog/[slug])
  const blogMap = new Map<string, { slug: string; updatedAt?: string; createdAt?: string }>();

  try {
    const posts = await getAllBlogPosts();
    if (Array.isArray(posts) && posts.length > 0) {
      for (const post of posts) {
        if (post.slug && post.active !== false) {
          blogMap.set(post.slug, {
            slug: post.slug,
            updatedAt: post.updatedAt,
            createdAt: post.createdAt,
          });
        }
      }
    } else {
      const res = await listBlogs();
      if (res.data && res.data.length > 0) {
        for (const blog of res.data) {
          if (blog.slug && blog.active !== false) {
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
        : now;
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return routes;
}


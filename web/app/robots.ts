import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://voiceact.tech";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/sentry-example-page", "/test/"],
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"],
        allow: ["/", "/services/", "/work/", "/blog/", "/about", "/hire/", "/calculator", "/audit", "/compare/"],
        disallow: ["/admin/", "/api/", "/sentry-example-page", "/test/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}


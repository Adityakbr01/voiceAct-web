import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://voiceact.tech";
  return {
    rules: [
      // General crawlers — allow everything except admin/internal paths
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/sentry-example-page", "/test/"],
      },
      // AI search bots — allow all public content for AI citation indexing
      {
        userAgent: "GPTBot",
        allow: [
          "/",
          "/services/",
          "/work/",
          "/blog/",
          "/about",
          "/hire/",
          "/calculator",
          "/audit",
          "/compare/",
          "/location/",
        ],
        disallow: ["/admin/", "/api/", "/sentry-example-page", "/test/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: [
          "/",
          "/services/",
          "/work/",
          "/blog/",
          "/about",
          "/hire/",
          "/calculator",
          "/audit",
          "/compare/",
          "/location/",
        ],
        disallow: ["/admin/", "/api/", "/sentry-example-page", "/test/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: [
          "/",
          "/services/",
          "/work/",
          "/blog/",
          "/about",
          "/hire/",
          "/calculator",
          "/audit",
          "/compare/",
          "/location/",
        ],
        disallow: ["/admin/", "/api/", "/sentry-example-page", "/test/"],
      },
      {
        userAgent: "Google-Extended",
        allow: [
          "/",
          "/services/",
          "/work/",
          "/blog/",
          "/about",
          "/hire/",
          "/calculator",
          "/audit",
          "/compare/",
          "/location/",
        ],
        disallow: ["/admin/", "/api/", "/sentry-example-page", "/test/"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: [
          "/",
          "/services/",
          "/work/",
          "/blog/",
          "/about",
          "/hire/",
          "/calculator",
          "/audit",
          "/compare/",
          "/location/",
        ],
        disallow: ["/admin/", "/api/", "/sentry-example-page", "/test/"],
      },
      // OAI SearchBot (ChatGPT search)
      {
        userAgent: "OAI-SearchBot",
        allow: ["/", "/services/", "/blog/", "/about", "/hire/", "/compare/", "/location/"],
        disallow: ["/admin/", "/api/", "/sentry-example-page", "/test/"],
      },
      // Gemini / Google AI bots
      {
        userAgent: "Googlebot-Extended",
        allow: ["/", "/services/", "/blog/", "/about", "/hire/", "/compare/", "/location/"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

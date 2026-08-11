import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import os from "os";

// Dynamically populate allowed dev origins from active IPv4 interfaces
function getAllowedDevOrigins(): string[] {
  const origins = new Set<string>([
    "localhost",
    "localhost:3000",
    "127.0.0.1",
    "127.0.0.1:3000",
    "*.trycloudflare.com",
    "*.local",
  ]);

  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const net of interfaces[name] || []) {
        if (net.family === "IPv4" && !net.internal) {
          origins.add(net.address);
          origins.add(`${net.address}:3000`);
          const subnet = net.address.substring(0, net.address.lastIndexOf("."));
          origins.add(`${subnet}.*`);
          origins.add(`${subnet}.*:3000`);
        }
      }
    }
  } catch {
    // Fallback if network interface resolution fails
  }

  return Array.from(origins);
}

const nextConfig: NextConfig = {
  // Dev-only: dynamically allow HMR/WebSocket from LAN & Hotspot IPs
  allowedDevOrigins: getAllowedDevOrigins(),

  // Docker standalone output
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Allow external images from project URLs with AVIF/WebP compression
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Enable package import tree-shaking for icons and motion libraries
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@tabler/icons-react",
      "@radix-ui/react-icons",
      "recharts",
      "date-fns",
    ],
  },

  // Tree-shake icon libraries by transforming barrel imports to individual paths
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{ kebabCase member }}",
    },
  },

  // Security Headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://us.i.posthog.com https://us-assets.i.posthog.com https://browser.sentry-cdn.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://us.i.posthog.com https://us-assets.i.posthog.com https://*.sentry.io https://*.ingest.sentry.io",
              "frame-src 'self' https://www.google.com https://www.youtube.com",
              "media-src 'self' blob: data:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "voice-act-solution",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: false,
  hideSourceMaps: true,
  disableLogger: true,
  tunnelRoute: "/monitoring",

  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
});

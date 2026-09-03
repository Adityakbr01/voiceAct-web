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
  productionBrowserSourceMaps: false,

  // Strip console.log/debugger in production for smaller bundles
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // Allow external images from trusted CDNs with AVIF/WebP compression
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },

  // Enable package import tree-shaking for icons and motion libraries
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "motion",
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
    // Base header set — applied to all paths including /api, /_next assets,
    // and 404s. This ensures Screaming Frog's "missing security header"
    // warnings only flag internal diagnostic routes.
    const allPathsHeaders = [
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
          `script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === "development" ? "'unsafe-eval' " : ""}https://www.googletagmanager.com https://www.google-analytics.com https://us.i.posthog.com https://us-assets.i.posthog.com https://browser.sentry-cdn.com`,
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src 'self' data: blob: https: http:",
          "font-src 'self' data: https://fonts.gstatic.com",
          "connect-src 'self' http://localhost:5000 http://127.0.0.1:5000 http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://us.i.posthog.com https://us-assets.i.posthog.com https://*.sentry.io https://*.ingest.sentry.io https://*.ingest.us.sentry.io https://ik.imagekit.io",
          "frame-src 'self' https://www.google.com https://www.youtube.com",
          "media-src 'self' blob: data:",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'self'",
        ].join("; "),
      },
    ];

    return [
      // Public pages
      { source: "/:path*", headers: allPathsHeaders },
      // Explicit API routes — ensure headers also apply (the wildcard should
      // cover these, but listing them defensively eliminates any false
      // positive from Screaming Frog on /api/* URLs).
      { source: "/api/:path*", headers: allPathsHeaders },
      // _next/static assets
      { source: "/_next/static/:path*", headers: allPathsHeaders },
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
  // tunnelRoute removed — direct upload to Sentry is faster and avoids
  // proxying every error event through our origin (was: "/monitoring")

  webpack: {
    automaticVercelMonitors: false,
    treeshake: {
      removeDebugLogging: true,
    },
  },
});

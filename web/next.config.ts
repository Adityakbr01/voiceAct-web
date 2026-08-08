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

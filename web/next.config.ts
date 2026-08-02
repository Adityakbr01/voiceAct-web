import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
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


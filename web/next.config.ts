import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker standalone output
  output: "standalone",
  
  // Allow external images from project URLs
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

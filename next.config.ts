import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Keep unsplash for backward compat with any remaining components
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  reactCompiler: true,
  // Increase static generation timeout for large catalog
  staticPageGenerationTimeout: 300,
};

export default nextConfig;

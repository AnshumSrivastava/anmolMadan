import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qtwduupxhsxrsniicswk.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  allowedDevOrigins: ["192.168.29.73", "localhost:3000"],
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  output: "standalone",
};

export default nextConfig;
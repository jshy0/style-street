import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "alffj7ad6d5uqyzk.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://172.23.58.104:3003",
  },
  async rewrites() {
    return [
      { 
        source: "/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;

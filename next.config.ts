import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/support",
        destination: "/donate",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

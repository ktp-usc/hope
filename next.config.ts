import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Rewrites /donate to /support so requests to /donate serve the support page
   * without creating an HTTP redirect loop with cached redirects.
   */
  async rewrites() {
    return [
      {
        source: "/donate",
        destination: "/support",
      },
    ];
  },
};

export default nextConfig;

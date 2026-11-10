import type { NextConfig } from "next";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: projectId && dataset ? `/images/${projectId}/${dataset}/**` : "/**",
      },
    ],
  },
  /**
   * Rewrites /donate to /support so requests to /donate serve the support page
   * without creating an HTTP redirect loop with cached redirects.
   * Rewrites /partners to /partners-and-collaborations to support shorthand route.
   */
  async rewrites() {
    return [
      {
        source: "/donate",
        destination: "/support",
      },
      {
        source: "/partners",
        destination: "/partners-and-collaborations",
      },
    ];
  },
};

export default nextConfig;

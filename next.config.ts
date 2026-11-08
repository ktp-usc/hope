import type { NextConfig } from "next";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const nextConfig: NextConfig = {
  images: {
    // Allow only the configured Sanity image namespace, without guessed identifiers.
    remotePatterns: projectId && dataset ? [{
      protocol: "https",
      hostname: "cdn.sanity.io",
      port: "",
      pathname: `/images/${projectId}/${dataset}/**`,
    }] : [],
  },
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

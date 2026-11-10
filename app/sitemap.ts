import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getProjectStories } from "@/sanity/lib/queries";

const routes = [
  "", "/about", "/history", "/our-work", "/partners-and-collaborations", "/alumni",
  "/get-help", "/get-involved", "/support", "/contact",
];

// Story pages come from Sanity (with the three foundational stories as fallback), so new stories are listed automatically.
export const revalidate = 3600;

/** Static pages plus every project story page. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stories = await getProjectStories();
  const paths = new Set([...routes, ...stories.map((story) => `/stories/${story.slug}`)]);
  return [...paths].map((path) => ({ url: `${SITE_URL}${path}` }));
}

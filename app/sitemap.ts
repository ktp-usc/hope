import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const routes = [
  "", "/about", "/history", "/our-work", "/partners-and-collaborations", "/alumni",
  "/get-help", "/get-involved", "/support",
  "/stories/hands-on-beginnings", "/stories/ppe-response", "/stories/elis-bike-arm",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${SITE_URL}${route}` }));
}

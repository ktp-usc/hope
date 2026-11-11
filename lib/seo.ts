import type { Metadata } from "next";

export const SITE_URL = "https://handsonhope.ngo";

export const SITE_NAME = "HOPE Inc.";
export const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: "H.O.P.E. Hands on Prosthetic Engineering logo" };

export const DEFAULT_TITLE = "HOPE Inc. | Hands On Prosthetic Engineering";
export const DEFAULT_DESCRIPTION = "Turning practical needs into practical solutions.";

/** Keeps a description within `max` characters (search results cut off near 160), ending on a whole word with an ellipsis. */
export function truncateDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-–—]+$/, "")}…`;
}

// Next replaces (not merges) a page's openGraph object, so each page needs the full set.
export function pageMetadata(title: string, rawDescription: string, path: string): Metadata {
  const description = truncateDescription(rawDescription);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url: path, siteName: SITE_NAME, type: "website", locale: "en_US", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description, images: [OG_IMAGE.url] },
  };
}

import type { Metadata } from "next";

export const SITE_URL = "https://handsonhope.ngo";

export const SITE_NAME = "HOPE Inc.";
export const OG_IMAGE = { url: "/hope-logo.png", width: 1080, height: 840, alt: "H.O.P.E. Hands on Prosthetic Engineering logo" };

export const DEFAULT_TITLE = "HOPE Inc. | Hands On Prosthetic Engineering";
export const DEFAULT_DESCRIPTION = "Turning practical needs into practical solutions.";

// Next replaces (not merges) a page's openGraph object, so each page needs the full set.
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url: path, siteName: SITE_NAME, type: "website", locale: "en_US", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description, images: [OG_IMAGE.url] },
  };
}

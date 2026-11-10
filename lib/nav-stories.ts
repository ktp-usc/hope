export interface NavStory {
  label: string;
  href: string;
}

// The three foundational stories always appear, with short nav names, so the menu
// is complete when Sanity is empty or unreachable and stays stable if CMS titles are long.
export const fallbackNavStories: readonly NavStory[] = [
  { label: 'Eli’s Bike Arm', href: '/stories/elis-bike-arm' },
  { label: 'COVID-19 PPE Response', href: '/stories/ppe-response' },
  { label: 'Early 3D-Printed Hands', href: '/stories/hands-on-beginnings' },
];

// Sanity slugs are lowercase words joined by hyphens; anything else is not linked.
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** The dropdown shows at most this many stories; the rest are reached through "All stories". */
export const MAX_NAV_STORIES = 5;

/**
 * Newest CMS stories first (`records` must already be newest-first, title becomes the label),
 * then the foundational stories, capped at MAX_NAV_STORIES.
 */
export function mergeNavStories(records: unknown): NavStory[] {
  const fallbackHrefs = new Set(fallbackNavStories.map((story) => story.href));
  const result: NavStory[] = [];
  if (Array.isArray(records)) {
    for (const record of records) {
      if (!record || typeof record !== 'object') continue;
      const { title, slug } = record as { title?: unknown; slug?: unknown };
      if (typeof title !== 'string' || !title.trim() || typeof slug !== 'string' || !SLUG.test(slug)) continue;
      const href = `/stories/${slug}`;
      if (fallbackHrefs.has(href) || result.some((story) => story.href === href)) continue;
      result.push({ label: title.trim(), href });
    }
  }
  return [...result, ...fallbackNavStories].slice(0, MAX_NAV_STORIES);
}

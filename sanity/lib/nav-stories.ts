import 'server-only';
import { fallbackNavStories, mergeNavStories, type NavStory } from '@/lib/nav-stories';

// Newest first. The schema has no publish date, so creation time stands in for "most recent".
const navStoriesQuery = `*[_type == "projectStory" && defined(slug.current)] | order(_createdAt desc){
  title,
  "slug": slug.current
}`;

/** Stories for the navbar's Stories dropdown: newest Sanity stories, then the foundational three, at most 5. */
export async function getNavStories(): Promise<NavStory[]> {
  try {
    // Imported inside the guard so the site still renders when CMS configuration is absent.
    const { client } = await import('./client');
    const records = await client.fetch<unknown>(navStoriesQuery, {}, {
      perspective: 'published',
      next: { revalidate: 60, tags: ['projectStory'] },
      signal: AbortSignal.timeout(5000),
    });
    return mergeNavStories(records);
  } catch (error) {
    console.error('Failed to fetch nav stories from Sanity, using fallback stories:', error);
    return [...fallbackNavStories];
  }
}

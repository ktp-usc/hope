import 'server-only';
import { resolveAlumniDirectory } from '@/lib/alumni';
import { alumniMembersQuery } from './queries';

export async function getAlumniDirectory() {
  return resolveAlumniDirectory(async () => {
    // Match KAN-11: configuration and fetch failures are caught by the fallback.
    const [{ client }, { urlFor }] = await Promise.all([import('./client'), import('./image')]);
    const records = await client.fetch<unknown>(alumniMembersQuery, {}, {
      perspective: 'published',
      next: { revalidate: 60, tags: ['alumni-members'] },
      signal: AbortSignal.timeout(5000),
    });
    if (!Array.isArray(records)) return records;
    return records.map((record) => {
      if (!record || typeof record !== 'object') return record;
      let headshotUrl: string | undefined;
      if (record.headshot?.assetUrl) {
        try {
          headshotUrl = urlFor(record.headshot).width(640).height(800).fit('crop').auto('format').url();
        } catch { /* Incomplete images retain the local photo or placeholder. */ }
      }
      return { ...record, headshotUrl, headshotAlt: record.headshot?.alt };
    });
  });
}

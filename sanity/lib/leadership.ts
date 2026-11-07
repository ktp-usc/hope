import 'server-only';
import { resolveLeadership } from '@/lib/leadership';
import { leadersQuery } from './queries';
import type { SanityImageSource } from '@sanity/image-url';

interface LeaderRecord {
  headshot?: SanityImageSource & { assetUrl?: string };
}

export async function getLeadership() {
  return resolveLeadership(async () => {
    // Import env-dependent helpers inside the guarded load so About keeps working
    // when CMS configuration is absent or a request fails.
    const [{ client }, { urlFor }] = await Promise.all([import('./client'), import('./image')]);
    const records = await client.fetch<LeaderRecord[]>(leadersQuery, {}, {
      perspective: 'published',
      next: { revalidate: 60, tags: ['leaders'] },
      signal: AbortSignal.timeout(5000),
    });
    return records.map((record) => {
      let headshotUrl: string | undefined;
      if (record.headshot?.assetUrl) {
        try {
          headshotUrl = urlFor(record.headshot).width(640).height(640).fit('crop').auto('format').url();
        } catch {
          // An incomplete image reference uses the existing placeholder.
        }
      }
      return { ...record, headshotUrl };
    });
  });
}

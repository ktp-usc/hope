import { createClient } from 'next-sanity';
import { fallbackLeaders } from '../lib/leadership.ts';

const apply = process.argv.includes('--apply');
const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset,
  NEXT_PUBLIC_SANITY_API_VERSION: apiVersion = '2026-11-05', SANITY_API_WRITE_TOKEN: token } = process.env;

if (!projectId || !dataset) throw new Error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.');
if (apply && !token) throw new Error('--apply requires a server-only SANITY_API_WRITE_TOKEN. Never use a NEXT_PUBLIC_ token.');

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'raw', token });
const existing = await client.fetch('*[_type == "leader"]{_id, name}');
const normalize = (value) => value.trim().toLocaleLowerCase('en-US');
const existingNames = new Set(existing.filter((record) => typeof record.name === 'string').map((record) => normalize(record.name)));
let created = 0;
for (const { _id, name, title, affiliation, bio, order } of fallbackLeaders) {
  const profile = { name, title, affiliation, bio, order };
  const draftId = `drafts.${_id}`;
  if (existingNames.has(normalize(profile.name)) || existing.some((record) => record._id === _id || record._id === draftId)) {
    console.log(`Skip existing profile: ${profile.name}`);
    continue;
  }
  if (apply) {
    // Create drafts only, never replace or publish records. Deterministic IDs make
    // repeated runs safe. Review/publish each proposed profile in Studio.
    await client.createIfNotExists({ _id: draftId, _type: 'leader', ...profile });
    created++;
  }
  console.log(`${apply ? 'Prepared draft' : 'Would prepare draft'}: ${profile.name}`);
}
console.log(apply ? `${created} draft profiles prepared. Nothing published.` : 'Dry run only. No content changed.');

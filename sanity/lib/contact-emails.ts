import 'server-only';
import { resolveContactEmails } from '@/lib/contact-email';

export const contactEmailsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0].contactEmails[]{purpose, recipient, subject, body}`;

/** Read only published settings. Every route works before any CMS configuration is created. */
export async function getContactEmails() {
  try {
    const { client } = await import('./client');
    const data = await client.fetch<unknown>(contactEmailsQuery, {}, {
      perspective: 'published', next: { revalidate: 60, tags: ['contact-emails'] },
      signal: AbortSignal.timeout(5000),
    });
    return resolveContactEmails(data);
  } catch { return resolveContactEmails(null); }
}

# KAN-11 leadership setup

`sanity/schemas/leader.ts` defines the document. `sanity/schemas/index.ts` is
connected to the existing Studio registry in `sanity/schemaTypes/index.ts`.
The existing automatic Studio structure exposes the new document type.

Set the team's public project ID and dataset in an ignored `.env.local` using
the existing `.env.example` as a template. No read token is needed for a public
dataset. Invite acceptance gives Studio access; it does not create local env
configuration or grant the website a write token.

The About server page reads published profiles using the existing Sanity client
and `sanity/lib/queries.ts`, with a 60-second Next.js revalidation interval.
Changes appear after publishing and revalidation; this ticket does not enable
draft preview or alter the global layout to add live-preview tooling.
The entire original list is used when no valid records are returned, configuration
is missing, or the query fails. A partial published list displays only those CMS
records. Set an affiliation for each profile to keep student leaders in their
own section; executive leadership is distinct from board membership.

## Proposed initial profiles (not published automatically)

The repository has no pre-existing seeding process. `scripts/seed-leaders.mjs`
uses the five approved role summaries in `lib/leadership.ts`. Matthew **Yvon**
is the user-confirmed spelling; the ticket's “Yoon” is not used. No headshots
are seeded. An absent/incomplete image uses the existing card with “Photo Pending.”

With Node 24 and the local env file, preview without writing:

```powershell
node --env-file=.env.local scripts/seed-leaders.mjs
```

Only after explicit authorization to change CMS content, provide a server-only
`SANITY_API_WRITE_TOKEN` securely in the local environment and run:

```powershell
node --env-file=.env.local scripts/seed-leaders.mjs --apply
```

The script checks both published and draft profiles by name/ID, skips existing
people, and uses deterministic IDs with `createIfNotExists`. It creates drafts,
never overwrites a document, and never publishes. Avoid concurrent manual edits
while seeding; review and publish the proposed drafts in `/studio` afterward.
Do not commit tokens or the local env file. Run again safely to skip existing
profiles.

The initial five profiles were created as drafts after explicit authorization and
verified against the approved content. They remain unpublished. Review them at
`http://localhost:3000/studio/structure/leader` with `npm.cmd run dev` running.

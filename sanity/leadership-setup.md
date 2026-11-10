# KAN-11 leadership setup

The leader schema in sanity/schemas/leader.ts is registered directly in the
active sanity/schemaTypes/index.ts registry alongside main's existing schemas.
The Studio's automatic document list exposes Leadership & Board Bio.

Keep the team's existing project a1pyoa63 and production dataset. Configuration
uses NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and optionally
NEXT_PUBLIC_SANITY_API_VERSION in the ignored .env.local. Public website reads
use the existing client without a write token.

## Existing approved profiles

The five leadership profiles already exist in Sanity. Do not recreate, overwrite,
or publish them as part of this ticket. Matthew Yvon is the approved spelling.
The static role summaries in lib/leadership.ts preserve the existing About page
content; no biographies or photographs have been invented.

The About page reads only published leader documents, excluding drafts and
release versions, with a five-second timeout and 60-second revalidation.
If no valid profiles are available, configuration is absent, or a request fails,
the complete approved fallback list is used. A partial published list displays
only those published profiles; it is not silently combined with fallback data.

Profiles sort by Display Order, then name and ID. Board and nonprofit executive
profiles stay in the nonprofit grid. Student Organization profiles remain in
the separate Student Organization Leadership section. Approved Headshot supports
Sanity hotspot/crop controls. Missing or incomplete photos show Photo Pending.

## Local review without changing records

Use the existing development server on port 3000, or start npm.cmd run dev --
--port 3000 if that port is free. This origin already allows credentialed Sanity
access. Sign in at http://localhost:3000/studio with your invited account and
select Leadership & Board Bio. Inspect the five existing records without editing.
Main's SiteChrome hides the website header/footer on /studio and nested routes.
The normal website retains its navigation. No dashboard change is required.

Open http://localhost:3000/about to review published content or the approved
fallbacks. Draft-only profiles will not appear publicly until the team separately
authorizes publication. Uploading a photo or editing a draft changes CMS content;
these actions require separate authorization and were not performed here.

## Retained seed utility: do not run for this setup

scripts/seed-leaders.mjs is retained for historical/recovery use only. It is not
part of website startup or build. No seeding is needed: the five profiles exist.
Its default is read-only dry-run; --apply requires explicit authorization and a
server-only SANITY_API_WRITE_TOKEN. It checks existing names and IDs and uses
createIfNotExists for deterministic draft IDs, never replace or publish calls.
Never commit tokens or .env.local. Do not execute it during this review.

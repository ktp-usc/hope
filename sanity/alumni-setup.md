# KAN-27 Alumni & Legacy Directory

The `alumniMember` schema in `sanity/schemas/alumniMember.ts` is registered through
the existing schema registry. With `npm.cmd run dev` running, sign in at
`http://localhost:3000/studio` and select **Alumni & Legacy Directory**.
Use the existing project and `production` dataset; no new project or token is needed.

The page fetches published records using the existing client, a five-second
timeout and 60-second revalidation, matching KAN-11. No write token is used by
the public page. Draft and release-version records are excluded. Empty/invalid
results, missing configuration and failed requests keep the original static
directory: Andrew Super and the empty verified-presidents timeline. The alumni
reconnect form is unchanged and never feeds submissions directly into the CMS.

## Editor fields

- **Name:** required approved display name. CMS contributors sort A–Z by this
  complete name; no guessed surname fields are introduced. The original static
  fallback keeps its existing surname sorting.
- **Years Active:** optional, verified information only. Leave unknown dates empty.
- **Former President:** check only when verified. **President Term** appears and
  is required only when checked. Use `YYYY`, `YYYY–YYYY`, or `YYYY–Present`.
  Presidents sort by the numeric start and end of this explicit term, not by
  general membership years. An incomplete term from an API-written record is
  omitted from the timeline; the person can still appear in the directory.
- **Former Executive / Senior Leader (★):** controls the existing star badge.
  Current leadership does not automatically imply former senior leadership.
- **Role or Contribution:** use approved information only.
- **LinkedIn URL:** optional HTTPS LinkedIn URL; opens in a new tab with
  `noopener noreferrer`. Invalid values from outside Studio are not rendered.

- **Approved Headshot:** upload or select an approved photograph; use the hotspot
  control to keep the subject in view. Optional **Alternative Text** describes
  the photograph; if omitted, the website uses "Portrait of [name]".

CMS headshots appear in the directory and former-presidents timeline. If absent
or incomplete, the approved local Andrew Super photo is preserved for his
matching name. Other directory entries show a neutral person placeholder.
The public website labels years active and roles/contributions explicitly.

Studio uses main's existing SiteChrome isolation: the website header/footer are
hidden on /studio and its nested routes, while normal pages retain both.

## Approved content and publication

No seeding is necessary to enable the integration, and no CMS content is created
by this implementation. The sole approved static contributor is Andrew Super,
with role **Vice Chair, HOPE Inc. Board**, no verified years, no verified former
presidential term, and no former-executive badge. Do not copy the current
leadership list into alumni or invent former-president records.

If a seed is requested later, it must be separately authorized and draft-only,
skip existing names/IDs, and use `createIfNotExists`, following KAN-11. For now,
create/review records manually in Studio only when authorized by the team.
Published CMS records replace the fallback list; review the intended complete
set before publishing. Changes appear after Next.js revalidation.

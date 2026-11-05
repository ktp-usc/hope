# Agent skill: Sanity CMS (HOPE)

Use this when editing Sanity schemas, GROQ queries, Studio structure, or wiring CMS data into Next.js App Router pages. For human onboarding and Studio/Vision walkthroughs, see [developing-with-sanity.md](./developing-with-sanity.md).

## Map of the repo

| Concern | Location |
|--------|----------|
| Schema (source of truth for fields) | `sanity/schemaTypes/` |
| Section object types | `sanity/schemaTypes/pageSections.ts` |
| Schema registration | `sanity/schemaTypes/index.ts` |
| Studio desk structure | `sanity/structure.ts` |
| GROQ queries + result types | `sanity/queries/*.ts` |
| Live fetch | `sanity/lib/live.ts` → `sanityFetch` |
| Image URLs | `sanity/lib/image.ts` → `urlFor` |
| Env / project ids | `sanity/env.ts`, `.env.example` |
| Locale string helper | `lib/resolved-localized.ts` → `resolveLocalized` |
| Site routes | `app/(site)/…` |

Studio: `/studio` after `npm run dev`. Test GROQ in Studio → Vision before hardcoding queries.

## Core model

No schema types are currently established in the repository (`schema.types` in `sanity/schemaTypes/index.ts` is empty).

When creating the initial schema types:
- Define the needed document and object types under `sanity/schemaTypes/`.
- Register all created schema types in the schema type registry (`sanity/schemaTypes/index.ts`) by adding them to `schema.types`.
- Document new schemas and their established field structures here as they are added to the repository.

## Localization

Most copy uses `localizedString` / `localizedText` (`{ en, es }`), not plain strings.

- Fetch the whole object in GROQ (`headline`, `body`, …).
- In UI, resolve with `resolveLocalized(value, language, fallback)`.
- Do not assume a field is a string; types often use `LocalizedValue`.
- Schema previews usually select `.en`.

## Query conventions

1. Put queries in `sanity/queries/<name>.ts` with `defineQuery` from `next-sanity`.
2. Export TypeScript types for the shape the page/client consumes next to the query.
3. Always project `_key` and `_type` on section arrays.
4. Branch section fields with GROQ conditionals:

```groq
sections[]{
  _key,
  _type,
  _type == "sectionHero" => { headline, subheadline, ctaLabel, ctaHref }
}
```

5. Expand references with `->`. Prefer projecting needed fields, not bare refs.
6. Images: either `"imageUrl": image.asset->url` in GROQ, or fetch the image object and build a URL with `urlFor(source).width(…).url()` in the server page.
7. Filter pages by slug: `*[_type == "page" && slug.current == "support"][0]{…}` or params (`$slug`) for generic routes (`sanity/queries/genericPage.ts` + `app/(site)/[slug]/page.tsx`).

Mirror patterns in existing query files (`supportPage.ts`, `homePage.ts`, `genericPage.ts`) rather than inventing a new style.

## Wiring content into the app

**Rule:** the file that calls `sanityFetch` must be a Server Component (no `"use client"`).

Standard page split:

1. `app/(site)/<route>/page.tsx` — `async`, `await sanityFetch({ query })`, pass data as props.
2. `app/(site)/<route>/<name>-client.tsx` — `"use client"` for interactivity; render CMS props with `resolveLocalized`.

Also:

- Prefer `export const dynamic = "force-dynamic"` on CMS pages when matching existing routes.
- Catch fetch failures and fall back to static/`site-copy` when that page already does.
- Render `<SanityLive />` (from `sanity/lib/live.ts`) when a page uses `sanityFetch`, rather than assuming it is already present in the site layout.
- Shared chrome (nav/footer) uses `navbarSettingsQuery` / `siteSettingsQuery` from the site layout.

## Schema / Studio changes

When adding or changing content shape:

1. Edit or add types under `sanity/schemaTypes/` (sections → `pageSections.ts`, then export via `pageSectionTypes`).
2. Register new top-level document/object types in `schemaTypes/index.ts`.
3. If the type should appear in page sections, add it to `page.sections.of` in `page.ts`.
4. Update Studio `structure.ts` only for new primary document lists/singletons.
5. Update every affected GROQ query and the page/client that consumes it.
6. Keep preview `select`/`prepare` using English fields where localized.

Do not invent field names in queries that are not in the schema.

## Images and rich text

- Sanity images are assets/metadata, not raw URL strings. Use GROQ `asset->url` or `urlFor`.
- Plain `localizedText` / `string` fields render as text via `resolveLocalized` or JSX.
- True Portable Text block arrays need `@portabletext/react` (`<PortableText value={…} />`). Most current section bodies are localized plain text, not Portable Text — check the schema field type before adding Portable Text.

## Agent checklist (new CMS-backed page)

- [ ] Page document exists in Studio with the correct **published** slug
- [ ] Section types exist in schema and are allowed on `page.sections`
- [ ] Query file uses `defineQuery`, projects `_key`/`_type`, expands refs/images
- [ ] Types exported for the client props
- [ ] Server `page.tsx` fetches; client component renders
- [ ] Localized fields go through `resolveLocalized`
- [ ] Vision returns the expected JSON before finishing

## Troubleshooting

| Symptom | Check |
|--------|--------|
| Empty Vision/query result | Published? Exact `slug.current`? Correct dataset in `.env.local`? |
| Missing fields | Exact names in `sanity/schemaTypes/` |
| `[object Object]` in UI | Localized object rendered as string — use `resolveLocalized` |
| `sanityFetch` in client file | Move fetch to server `page.tsx` |
| Studio blank / env errors | `.env.local` vs `.env.example`; restart `npm run dev` |

## External docs

- [GROQ](https://www.sanity.io/docs/groq)
- [Vision](https://www.sanity.io/docs/the-vision-plugin)
- [next-sanity live content](https://github.com/sanity-io/next-sanity#live-content-api)
- [Image URLs](https://www.sanity.io/docs/image-url)

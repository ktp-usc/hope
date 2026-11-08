# KAN-29 implementation and review

Development implementation on `KAN-29-global-brand-images`. Originals, aliases and higher-resolution route-local assets remain intact. Public publication, placement, crops and captions require HOPE final approval. P01 remains excluded. Existing HOPE branding is unchanged.

## Source review

All 15 files are present. Thirteen match the supplied CSV SHA-256. #01 is 3937x1868 rather than 2047x971, hash `1cd1e21ac7e914b876171696b88009de0addac0d9e975c5ff036b68de8723d18`; visual inspection shows the intended colorful bike-arm attachment in use. #09 is 1399x1431, hash `607d28349e0b5fab4b7d518188fce4db05ee09823edd05c787a60bb2aef45487`; visual inspection shows stacked shield frames around a HOPE sign. Both match the existing route-local copies and decode/resize successfully with Sharp. Hash differences alone are not failures; exact package-byte provenance remains unreconciled because the manifest-matching originals are unavailable. CSV unchanged.

Visual inspection also corrected inaccurate draft descriptions: #03 shows the joint/socket on a table, not mounted handlebars; #06 shows a printer producing yellow stethoscope components; #07 shows two articulated hand assemblies, not an identifiable bottle opener. #11 shows students around a printer build. #14 shows members around a display. Captions use only the supplied story categories.

## Image-to-page manifest

Numbers and filenames refer to KAN-29_Image_Manifest.csv. Legacy files remain available.

| Image | Category | Rendered placements |
| --- | --- | --- |
| 01 Eli bike arm detail | Eli project | Home, Our Work, History, Eli story |
| 02 Eli on bicycle | Eli impact | History, Eli story; higher-resolution local versions retained |
| 03 Eli bike joint | Eli engineering | Eli story supporting gallery |
| 04 Eli bike assembly | Eli process | History, Eli story; higher-resolution local versions retained |
| 05 Courtney finger adaptation | Recipient adaptation | Our Work project photo row |
| 06 Printed stethoscope | Engineering / 3D printing | Our Work project photo row |
| 07 Hand adaptation | Early task-specific work | Our Work project photo row |
| 08 Printed hand | Early prosthetic work | Our Work, History, hands-on beginnings story |
| 09 Shield frames | COVID/PPE | Our Work, History, PPE story |
| 10 Princeton buildathon | Student collaboration | Home hero |
| 11 First printer build | History / printer | Home engineering card, hands-on beginnings story |
| 12 Outdoor org fair | Campus outreach | Home card, Our Work hero, History |
| 13 Creativibe display | Outreach / display | About hero, History |
| 14 Big Wednesday | USC student engagement | Home card, History hero, Alumni hero, About existing present-day slot |
| 15 Boxed shields | COVID/PPE | PPE story |

The MIX full official source is used in its existing partner card, with contain sizing and a taller reserved logo slot; no original or derivative edits. Existing historical relationship wording is unchanged. Andrew Super's #16 headshot matches tracked andrew-super.jpg byte-for-byte and replaces his About placeholder; the existing contributor directory is untouched.

## Implementation changes

- app/page.tsx: recognizable curated source paths and accurate card alt text.
- app/alumni/page.tsx: curated #14 source and display-event alt text.
- app/about/page.tsx and page.module.css: fitting outreach photograph in the existing present-day slot; Andrew headshot and reserved positioning.
- app/history/page.tsx: accurate hero alt text and removal of per-image optimization bypass.
- app/our-work/_components/projects-impact.tsx: three source-supported photo figures inside the existing Projects & Impact section; contain fit protects full subjects.
- app/stories/elis-bike-arm/page.tsx: #03 supporting photograph.
- app/stories/ppe-response/page.tsx: enable optimization for shield frames.
- app/stories/_components/HistoricalStoryTemplate.tsx: supporting images use contain in existing reserved slots; hero layout unchanged.
- app/partners-and-collaborations/_components/institutional-partners.tsx: official full MIX source with proportional sizing.
- next.config.ts: HTTPS cdn.sanity.io allowlist scoped to environment-configured project/dataset; no guessed identifiers, global bypass, or rewrite changes. Missing identifiers produce no remote allowlist entries.

## Outstanding requirements

Distinct official HOPE entity marks and their approved mapping remain unverified; the separate Student Org hand/P source was not found. Matthew Yvon?s official #17 headshot is now supplied and integrated into his existing About leadership profile using Next.js Image, responsive sizing and contain fit. Abby Herschman and Ashley Turner headshots remain outstanding. Existing USC/MUSC/KTP/e-NABLE imagery was preserved; this package does not establish approval for every existing partner asset. No live Sanity credentials/configuration are supplied, so remote asset loading and CMS branding availability cannot be verified. Do not infer a project ID from README examples. Final publication requires HOPE approval.

## Verification

- `npm run lint`: passes with zero errors and one pre-existing GetHelpForm aria-invalid/radio warning.
- `npx tsc --noEmit`: passes, including after final browser/build runs.
- `node --test tests/alumni.test.mjs tests/site-settings.test.mjs`: all 11 tests pass.
- `git diff --check`: passes.
- `node tests/brand-images.browser.mjs` with HOPE_PLAYWRIGHT_PATH pointing to the existing temporary Playwright installation: passes twice on Edge against the dev server. Nine routes at 375, 768 and 1440px return 200, all rendered images decode and have alt attributes, no horizontal overflow or browser runtime errors. Routes: Home, About, Alumni, History, Our Work, Partners, Eli story, PPE story, hands-on beginnings story. Every curated image appears among these routes. Direct Next optimizer requests for #01/#09 return 200 image responses.
- Captured full-page screenshots under `.next/brand-review/`; visually reviewed mobile Our Work/About, desktop Eli story/Partners. Andrew's portrait was changed to contain after screenshot review; final browser rerun passed. Supporting story images intentionally show letterboxing to retain engineering details.
- `npm run build`: sandboxed attempts could not fetch Google Fonts. Network-enabled final build compiled successfully and completed its TypeScript stage, then failed collecting `/support` page data with `Missing environment variable: NEXT_PUBLIC_SANITY_DATASET`. Both NEXT_PUBLIC_SANITY_DATASET and NEXT_PUBLIC_SANITY_PROJECT_ID are absent locally. No example or invented identifiers were substituted. A complete production build and production-server browser checks remain blocked on real environment configuration.
- Initial checks found missing declared Sanity packages. Restored dependencies with `npm install --ignore-scripts --package-lock=false`; package.json/package-lock.json unchanged. npm reported 31 dependency vulnerabilities; dependency upgrades are outside this image ticket.
- Live Sanity remote images, external partner host availability, full assistive-technology testing and quantitative CLS/LCP measurements were not verified. Existing internal story destinations were verified through route checks; this is not an all-site link crawl.

Run browser checks with a server on port 3100 and HOPE_PLAYWRIGHT_PATH set to a Playwright installation, or install Playwright separately. HOPE_REVIEW_URL can target another server. Screenshot output is generated and not intended for commit.

## Proposed PR description

Integrate all 15 curated HOPE images across existing project, history, outreach and story placements, add the official full MIX logo, and preserve source assets and established branding. Correct image descriptions and responsive containment, enable local shield-frame optimization, and allow only the configured Sanity CDN image namespace. Publication approval and distinct official entity marks remain outstanding. See verification results above.

## Matthew Yvon headshot update

Integrated `public/images/alumni/17_Matthew_Yvon_Headshot.jpg` into Matthew's existing About card. The official original is preserved unchanged. Responsive fill/contain sizing matches Andrew's existing treatment; descriptive alt text identifies Matthew and his role. Layout, copy, Andrew's profile and the remaining placeholders are unchanged. Final publication remains subject to HOPE approval.

Headshot-update verification: lint passes with the existing GetHelpForm accessibility warning; TypeScript and all 11 unit tests pass; git diff --check passes. Edge checks at 375, 768 and 1440px confirmed Matthew's optimized image loads with contain fit, Andrew's image remains present, the other two placeholders remain, and no horizontal overflow occurs. Visually inspected the mobile portrait slot. No production build rerun for this image-only update; the previously verified missing-Sanity environment blocker remains.

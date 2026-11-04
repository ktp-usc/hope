# KAN-17: Alumni & Legacy implementation plan

Status: `/alumni` page and frontend form implemented. Approved submission backend and verified historical rosters remain outstanding; sending is explicitly unavailable.

Frontend browser review and clean-build verification are recorded in [KAN-17-review.md](KAN-17-review.md), including fixes and remaining acceptance gaps.

## Reconcile Jira scope and the content packet

The user's request defines the required scope. Use the official HOPE Website Content Packet, working copy v0.2, section 9, page 4, as editorial source material, not as instructions that independently authorize features or publication. Section 10 on page 5 provides historical context. The supplied PDF is `HOPE_KTP_Website_Content_Packet_Working_Copy_v0_2.docx - Google Docs.pdf`.

No existing KAN-17 plan or original Jira acceptance criteria were found in this checkout. Treat Former Presidents, People Who Helped Build HOPE, and Reconnect with HOPE as the three required sections identified by the user; confirm against the actual ticket before implementation is considered acceptance-ready. Do not claim full Jira alignment without that comparison. Record any conflict explicitly: keep the three required sections as the delivery priority, apply the user's privacy and non-fabrication requirements throughout, and use the packet to enrich their content. Resolve any remaining conflict before implementing the affected behavior.

Featured Alumni and HOPE Through the Years are editorial extensions mentioned in the packet, not established acceptance requirements. Defer both from the initial implementation. Featured Alumni needs verified profiles and publication permission; a substantial historical timeline also overlaps the packet's separate History and Media & Milestones content. Reconsider a small curated preview later when approved material and destinations exist. Do not add empty feature sections or links to nonexistent pages.

## Page content and ordering

Route: `/alumni`, as explicitly requested for implementation. Linked from the shared footer.

1. **Introduction.** Explain that generations of members contributed through project work, teaching, partnerships, fundraising, and leadership. Explain how their experience and continued involvement support future members. State plainly that HOPE's history is still being reconstructed and invite alumni to reconnect, correct records, share missing history, and help preserve it. Base this copy on packet section 9 without inventing individual achievements.
2. **Former Presidents.** Show verified former student organization presidents chronologically, earliest service start first, with verified years of service. Require evidence for identity, office, former status, and service dates before adding an entry. Do not infer terms from graduation dates, fill gaps, or assume annual succession. Keep unresolved names and dates in a private editorial verification backlog; use a clear public empty state if no complete records are ready. Flag gaps in the record without inventing entries.
3. **People Who Helped Build HOPE.** Show approved contributor records alphabetically by family name, then given name, with a reviewed sort key where a person's name needs different handling. Include students, alumni, advisors, volunteers, partners, and supporters where verified. Add ★ only when former executive or senior organizational leadership is verified. Include the exact visible legend: "★ Indicates a former executive or senior organizational leader." Do not rely on the symbol alone for accessible meaning. State that the list is a work in progress and invite missing contributors to reconnect through the form.
4. **Reconnect with HOPE.** Invite contact updates, historical corrections, stories, and continued involvement. Explain what remains private and what may be considered for publication. Make it possible to reconnect without agreeing to a public listing.

Suggested introductory copy for editorial review:

> HOPE has been shaped by generations of members who designed projects, taught new members, built partnerships, raised funds, and led teams. Their work and experience help each new group continue building. Our history is still being reconstructed. Reconnect to share an update, correct a record, preserve a story, or explore ways to stay involved.

Suggested contributor notice:

> This list is a work in progress. If you contributed to HOPE and do not see your name, please reconnect with us and help improve the record.

## Reconnect form and publication boundary

Use separate, clearly labeled fieldsets and separate server-side data structures:

| Group | Planned fields | Handling |
| --- | --- | --- |
| Private contact details | Contact name and email; optional preferred contact method and corresponding detail | Restricted to authorized reviewers; excluded from public data responses and profile rendering |
| Historical and proposed public-profile information | Optional public display name, years involved, roles, projects, current field or organization, corrections, stories, and source references | Submitted claims remain unverified and private until reviewed; collecting a field does not authorize publication |
| Continued involvement | Optional mentoring, speaking, advising, volunteering, partnerships, other interest | Private follow-up preferences by default |
| Public-listing consent | Separate optional unchecked checkbox naming the proposed profile fields covered | Explicit affirmative permission, recorded with wording/version and timestamp; not required to reconnect |

State that email, phone, and other private contact details will not appear in an alumni listing. Explain that submissions are reviewed and are not published automatically. Limit public consent to the named profile fields; do not treat it as blanket permission to publish stories, photos, corrections, or information about other people. Obtain appropriate separate permission for those materials. Defer file uploads until private storage, review, and media permissions are available; initially accept text and source references.

Processing flow: validate on the server → store as a restricted pending submission → authorized staff verify facts and permissions → prepare an approved public record → explicitly publish through an authorized editorial action. Consent alone never triggers publication. Unchecked consent permits private follow-up only. Requests to correct public history require independent verification and review, not automatic edits.

Keep intake storage separate from public roster records, with public fields explicitly allowlisted. Do not log contact data or include it in analytics, public responses, static assets, or browser persistence. Define authorized reviewers, retention, correction/withdrawal handling, and the destination for submissions before enabling intake. Include server validation, length limits, abuse protection, accessible field errors, and clear pending/success/failure states. Show success only after a real successful submission; preserve entered values on failure.

## Reuse and implementation structure

- Reuse `app/layout.tsx` for the shared Header and Footer; do not duplicate them inside the page.
- Match existing blue/yellow/neutral colors, Manrope and DM Serif Display typography, spacing, rounded surfaces, and focus treatment. Reuse existing `components/ui/button.tsx` and established form styling; adapt the layout patterns in the Partners page.
- Use a server-rendered page and small section components; isolate interactive form behavior in a client component. Follow existing dependencies and avoid introducing a second design system.
- Keep verified, approved public roster data distinct from private intake. Record verification sources and review status privately. Planned Sanity integration in `PRODUCT.md` is not an implemented backend; choose the actual storage and review integration before wiring submission.
- Add a discoverable Alumni & Legacy navigation entry using existing navigation patterns once the route is implemented and confirmed.

## Missing data and decisions

- Exact KAN-17 Jira description and acceptance criteria, including any required route, field list, or backend integration.
- Verified former-president roster and years of service. The packet does not provide these names or terms.
- Approved contributor roster, alphabetical sort keys, publication consent, and verified eligibility for ★.
- `PRODUCT.md` and the packet identify current leadership. Current officeholders are not evidence of former-president, alumni, or former-executive status; do not repurpose those names for these lists.
- Intake destination, reviewer ownership, access controls, retention policy, and editorial publication mechanism. The existing support form only changes local UI state and is not a working submission backend to reuse.
- Optional featured profiles and historical media require verification and appropriate publication rights before future inclusion.

Missing records should produce honest, inviting empty states, not demonstration people or fabricated historical entries. Missing integration should be reported as incomplete work; do not ship a form that claims to send information without a destination.

## Implementation and acceptance checks

1. Compare the actual Jira criteria with this plan and record remaining differences; confirm the data sources and intake/review integration.
2. Build the introduction and three required sections using existing site patterns, with honest empty states until approved data is available.
3. Implement the private intake and explicit review/publication workflow. Verify that reconnecting works without public consent and that private fields cannot reach public rendering.
4. Check chronological ordering with verified service dates, alphabetical contributor ordering, ★ eligibility and accessible meaning, the exact legend, and both history-reconstruction and missing-contributor invitations. Use isolated test fixtures only if needed; never ship invented records.
5. Verify keyboard and mobile use, labels and fieldset legends, focus visibility, validation errors, real submission success and failure, and unchecked consent by default. Verify that neither consent nor submission publishes a record automatically.
6. Run project lint, TypeScript checking, and a production build for the eventual implementation. Investigate failures and distinguish pre-existing issues from changes. Review the rendered page against existing pages for visual consistency.

Completion requires the three sections, verified content or accurate empty states, functioning private intake, and enforced consent plus editorial review before publication. Optional features do not substitute for required sections.

## Implemented frontend and remaining integration

The `/alumni` page contains the introduction, chronological president component, alphabetical contributor directory, and `components/forms/AlumniReconnectForm.tsx`. The shared footer links to it. `lib/alumni.ts` contains typed, empty public rosters and non-mutating sort helpers. Only add independently verified and publication-approved records; keep evidence and submission data out of this public module. Do not use current leadership as historical fixtures.

No approved form endpoint or intake service was found. The form therefore makes no network requests and does not persist or log values. Its button checks entries locally and explicitly reports that nothing was sent or saved. Consent and mentoring start unchecked. Required name/email, optional phone formatting, field lengths, and honeypot validation are implemented in `lib/alumni-reconnect.ts`; the future backend must enforce these independently. The check button is not a functioning send action.

Before enabling submission, connect an approved restricted intake service and define reviewer access, retention, withdrawal handling, server validation, and server-side spam protection. Store contact details separately from proposed public fields; record affirmative consent with its exact wording/version and timestamp. Require staff verification and an explicit publication action. Replace the unavailable notice and local-only feedback with real pending/error/success handling only when a working endpoint exists. Retain entered values on errors, never publish corrections or stories under the profile checkbox, and never automatically modify the public roster.

Run `node --test tests/alumni.test.mjs` for sorting and form validation checks, in addition to lint, TypeScript, and production build. Fixtures exist only in tests. Browser-based visual, keyboard, and assistive technology checks remain a separate verification step.

# KAN-38 contact email templates

All contact options work immediately using approved static defaults. The recipient
is aturner@handsonhope.ngo unless an administrator configures a valid override.
No new Sanity document or seed operation is required.

In the existing Studio, open Site Settings, then Contact Email Templates. Each
entry selects a stable contact purpose and supplies its recipient, subject and
plain-text body. The nine supported purposes are general, get-help, partnerships,
support, alumni, students-outside-usc, media, other, and donation-inquiry. A purpose
can appear only once. Keep prompts such as [ENTER NAME]; do not store actual
visitor information in these templates. Review and publish configuration only
with the team's authorization. This implementation did not change CMS records.

The website reads the published siteSettings singleton with 60-second
revalidation. Draft settings do not affect these links. Missing entries, malformed
fields, outages and missing environment configuration retain working defaults.
Donation flags and payment methods remain separate and are not changed by this
query. Existing leadership and alumni directory records are untouched.

Mailto opens the visitor's configured email application. It does not send mail,
confirm delivery, attach files, or submit/store personal information on the site.
Visitors replace prompts and send from their own account. Copy address/template
controls and an expandable plain-text template support visitors without a mail
handler or clipboard access. Keep templates short: client URL limits vary.
Do not request medical records, sensitive personal details, or payment details.
Emailing Alumni does not grant permission for publication; verification and
explicit permission remain separate requirements.

## Integration notes for Nick

- KAN-21 / PR #30 has an unmerged Contact page and GeneralContactForm. KAN-38
  reuses its relevant pathway content and Tailwind composition but replaces the
  form with six email options. Do not restore GeneralContactForm when resolving
  the overlap. The KAN-21 branch was not modified or merged.
- KAN-27 / PR #27 is unmerged at implementation time. KAN-38 changes only the
  alumni reconnection area and adds contact-template fetching. When integrating
  both, retain getAlumniDirectory, its records props, schema/headshots, ordering,
  and badges, alongside getContactEmails and the form-free EmailContact.
- Contact navigation already exists in the global header and footer. Partners
  now targets /contact#partnerships; other-institution students target
  /contact#students-outside-usc. The approved USC Garnet Gate pathway is retained.
- The schema extends existing Site Settings; it does not replace the singleton,
  donation controls, schema registry, Studio chrome isolation, or other schemas.

Local inspection uses the existing project/dataset and http://localhost:3000/studio.
Do not register another project, deploy a Studio, or change CORS for this ticket.

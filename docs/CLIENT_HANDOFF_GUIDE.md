# Client CMS Handoff Guide — KAN-33

For Ashley, Matthew, and Trinity. Based on the repository reviewed November 10, 2026. Live production deployment, accounts, and access have **not** been verified. Items marked **To confirm** must be resolved before handoff.

## 1. Open Studio and publish

1. Open the confirmed website address and add `/studio`. The intended address is [handsonhope.ngo/studio](https://handsonhope.ngo/studio); whether that domain is connected and serving this version is **To confirm**. Ask the project administrator for the working deployment URL if needed (**To confirm**).
2. Sign in with your invited Sanity account. You need permission to read, create, edit, and publish content. If access is missing, contact the current Sanity project administrator (**To confirm**), coordinated through `aturner@handsonhope.ngo`.
3. In **Content**, choose the content type below and open an existing record, or use the new-document control. Studio saves edits automatically as drafts; wait for its saved/synced status and resolve validation errors.
4. Review the text and image in the editor. Studio list thumbnails are record previews, not previews of the website. This implementation has no website draft preview.
5. Select **Publish** when approved, then check the public page. Updates may take a little time; refresh before asking the developer for help.

## 2. Manage content

Use only approved text and images, with permission to publish people’s information. Do not enter private recipient, medical, or payment information.

### Leadership bios — `/about`

1. Open **Leadership & Board Bio**. Edit **Name**, **Title**, **Affiliation**, and **Bio**.
2. Choose **H.O.P.E. Inc. Board**, **H.O.P.E. Inc. Executive Leadership**, or **H.O.P.E. Student Organization** under **Affiliation**. This places the person in the appropriate nonprofit or student leadership section.
3. Upload or select an **Approved Headshot**. Adjust crop/hotspot to keep the face visible. Set **Display Order** to a whole number of zero or higher; lower numbers come first.
4. Publish and check `/about`. Prepare the complete leadership list: publishing only some profiles can hide the built-in profiles that have not been added.

### Partners — `/partners-and-collaborations`

1. Open **Partner**. Fill in **Name** and **Category**: **Primary network**, **Institutional**, **Incubator**, or **Community**.
2. Edit **Description**, upload/select **Logo**, and enter **Website URL**. Set **Order** (lower numbers first).
3. Publish and check the logo, copy, and external link. The first partner in **Primary network** becomes the featured affiliation; other records appear in the partner grid. Published partners replace the built-in partner list, so prepare the complete list.

### Project stories — `/our-work` and `/stories/<slug>`

1. Open **Project Story**. Enter **Title** and generate or enter **Slug**. Keep an existing slug unless a developer has planned redirects; changing it changes the story address.
2. Edit **Subtitle / Category**, **Summary / Introduction**, and **Project Status**. Set **Display Order** (lower numbers first).
3. Upload/select **Hero Image** and fill in **Alternative Text** and, where useful, **Caption**. Edit **Body** with text and images; body images also support **Alternative Text** and **Caption**.
4. Publish, then review both the project card and full story. The three built-in foundational stories remain available even if their Studio records are deleted. Ask the developer to remove them or clear retained story material.

### Alumni — `/alumni`

1. Open **Alumni & Legacy Directory**. Edit **Name**, **Years Active**, and **Role or Contribution** using verified information; leave unknown years blank.
2. Upload/select **Approved Headshot**, adjust crop/hotspot, and enter **Alternative Text**. Add an optional HTTPS **LinkedIn URL**.
3. Turn on **Former President** only for verified former presidents. Complete the revealed **President Term** with `YYYY`, `YYYY–YYYY`, or `YYYY–Present`. This controls inclusion and chronological order in the former-presidents timeline.
4. Turn on **Former Executive / Senior Leader (★)** only for verified former executive/senior service. It adds a visible ★ beside the person's directory name and an accessible explanation. It does not make them a former president or add them to current leadership; current leadership alone is not evidence for this flag.
5. Publish and check the directory and timeline. Prepare the complete directory: published entries replace the built-in list.

### What still needs a developer

1. Page layouts, navigation/footer, most page headings and general copy, history/media milestones, static images, support descriptions, SEO metadata, and fallback content are managed in code. There is no general **Pages** editor.
2. **Site Settings → Contact Email Templates** does let editors change **Contact Purpose**, **Recipient Email**, **Email Subject**, and **Prefilled Email Body** for supported contact links. Publish changes; these links open the visitor's email app and do not send or store submissions on the website.
3. Ask the developer for new fields, sections, or changes to these code-managed items.

## 3. Turn donations ON or OFF

1. Open **Content → Site Settings → Donations Toggle**. This is the `donationsEnabled` field. Turn it OFF while donation approval/compliance review is pending, according to the organization's decision. Turn it ON only after the responsible team approves accepting donations and checks the payment destinations.
2. Select **Publish**, then check `/support` and `/donate` (which serves the same support page).
3. **ON:** the page shows **Direct Giving / Make a Donation** with active payment-method cards. Each button opens its configured destination in a new tab. If no active methods with URLs exist, it shows “No current ways to donate.” and a donation-inquiry email link.
4. **OFF:** payment cards are replaced by **Support H.O.P.E.**, a message that direct donations are temporarily paused, and **Open support inquiry email**. Other support options remain; the section heading changes from “Other ways to support our work.” to “Ways to support our work.”
5. The toggle does not remove the page, navigation links, general support language, or code-managed donation metadata. It does not deactivate payment-provider accounts or externally shared donation links. It is a website display control, not a guarantee of legal compliance. The organization must separately resolve approval, solicitation, and provider requirements.

## 4. Ashley: can we add Stripe or Donorbox?

Yes, the current site can display a button linking to an approved Stripe hosted payment page or Donorbox hosted donation page. Set up the provider account and approved donation page first. Setup time depends on account readiness and the requested behavior.

1. In **Site Settings → Donation Methods**, add a **Donation Method** or edit an existing one.
2. Fill in **Method Title**, **Redirect URL** (use the approved HTTPS hosted page), and **Button Label**. Optionally set **Subtitle / Note**, **Badge Text**, and **Button & Accent Color Theme**. **Stripe Purple** is a visual theme only. **Custom Hex Color** requires a valid color when that theme is selected.
3. Set **Active** for each method; reorder or remove entries as needed. Publish **Site Settings**. The global **Donations Toggle** must also be ON to show payment cards.
4. Verify the destination belongs to H.O.P.E. and displays the correct organization and donation options. Do not put provider secrets in Sanity. An embedded form or payment processing on this site needs a developer. Recurring gifts and receipts available on the hosted provider page are configured with that provider.

## 5. Developer and production ownership

### Note for the developer

1. The donation component is `app/support/donate.tsx`, rather than `ActiveDonationWidget.tsx`. Donation fields are defined in `sanity/schemaTypes/siteSettings.ts`.
2. For future payment changes, confirm whether a hosted link is sufficient. An embedded checkout needs developer work. Verify the approved destination, both donation states, individual **Active** switches, and mobile/keyboard use before release. Keep payment credentials out of Sanity and this guide.

### Ownership inventory

Intended client owner/contact for every service: **aturner@handsonhope.ngo**. This is a transfer target, not evidence that access has been granted. Record confirmations without passwords, tokens, API keys, or secret values.

| Service | Purpose | Current owner | Intended owner/contact | Transfer/verification status |
| --- | --- | --- | --- | --- |
| GitHub | Source repository and deployment connection | To confirm | aturner@handsonhope.ngo | To confirm. Local origin: `https://github.com/ktp-usc/hope.git`; client admin access, organization ownership, billing, and Vercel connection: To confirm. |
| Vercel | Production hosting, builds, environment configuration, custom domain/TLS | To confirm | aturner@handsonhope.ngo | To confirm. Team/project, dashboard URL, production deployment URL, admin access, billing, and deployed revision: To confirm. |
| Sanity | Studio access, content, dataset/assets, project administration | To confirm | aturner@handsonhope.ngo | To confirm. Setup docs identify project `a1pyoa63` / dataset `production`; actual production configuration, project URL, owner/admin roles, editor invitations, and billing: To confirm. |
| Resend | Potential transactional email service; no active integration found | To confirm | aturner@handsonhope.ngo | To confirm. Whether an account is used elsewhere, account URL, access, sender-domain verification, billing, and keys in production: To confirm. Current site contact paths use mailto. |
| Domain registrar / DNS provider | Registration, renewal, and DNS for `handsonhope.ngo` | To confirm | aturner@handsonhope.ngo | To confirm. Registrar, DNS host, account URLs, registrant/admin access, billing/renewal, nameservers, and current records: To confirm. |

### Transfer and production verification checklist

1. Confirm the administrator and account/project URL for each service. Give `aturner@handsonhope.ngo` appropriate ownership/admin access, verify acceptance and account recovery, and confirm billing and renewal responsibility. Verify client access before removing an existing maintainer.
2. **GitHub:** verify repository admin access and the connection to Vercel. **Vercel:** verify project admin access, billing, and a successful production deployment.
3. Have the developer confirm that Vercel's production environment variables are complete and retained through the handoff, including Sanity connection settings and the approved donation state. Record names and purpose only; keep secret values in secure storage.
4. **Sanity:** verify project administration, billing, and editor invitations for Ashley, Matthew, and Trinity. Confirm an editor can sign in, publish an approved change, and see it on the website.
5. **Resend:** confirm whether it is used elsewhere; the current website opens visitors' email apps. If used, verify account admin access, billing, sender-domain verification, and delivery.
6. **Domain/DNS:** confirm the registrar and DNS provider, admin access, billing, and renewal. Save the existing DNS records. Add `handsonhope.ngo` and any agreed `www` alias in the correct Vercel project's domain settings. Enter **exactly the DNS record types, names, and values shown in that project's Vercel dashboard**. Dashboard access and required records: **To confirm**.
7. Preserve existing email records, including MX, SPF, DKIM, DMARC, and email-verification records. Have the DNS administrator resolve conflicts. After the changes take effect, verify Vercel domain approval, HTTPS, the website, `/studio`, and existing email send/receive.


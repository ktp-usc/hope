import type { Metadata } from "next";
import { getContactEmails } from "@/sanity/lib/contact-emails";
import Donate from "./donate";
import { getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Support HOPE | HOPE Inc.",
  description:
    "Give through the PayPal Giving Fund or Venmo, or support H.O.P.E. with equipment, materials, expertise, and mentorship.",
};

// Revalidate settings every 30 seconds for ISR caching
export const revalidate = 30;

/**
 * Server Component that retrieves global siteSettings from Sanity CMS
 * (governing the donationsEnabled switch, giving URLs, and announcement banner)
 * and renders the Support & Donate page.
 */
export default async function DonatePage() {
  const [settings, contactEmails] = await Promise.all([getSiteSettings(), getContactEmails()]);

  return <Donate settings={settings} contactEmails={contactEmails} />;
}

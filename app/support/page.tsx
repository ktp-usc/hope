import Donate from "./donate";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Support HOPE", "Give through the PayPal Giving Fund or Venmo, or support H.O.P.E. with equipment, materials, expertise, and mentorship.", "/support");

// Toggle donations with DONATIONS_ENABLED (fallback to NEXT_PUBLIC_DONATIONS_ENABLED); enabled only when set to "true".
// force-dynamic so the flag is read at request time (no rebuild needed to flip it).
export const dynamic = "force-dynamic";

// In the future, this Server Component can fetch live state from Sanity CMS:
// e.g., const settings = await sanityClient.fetch('*[_type == "siteSettings"][0]{ donationsEnabled }');
/**
 * Page component that determines donation availability from environment variables
 * and displays the support page with either direct donations or the inquiry form.
 */
export default function DonatePage() {
    const donationsEnabled =
        process.env.DONATIONS_ENABLED ?? process.env.NEXT_PUBLIC_DONATIONS_ENABLED;
    return <Donate enabled={donationsEnabled === "true"} />;
}

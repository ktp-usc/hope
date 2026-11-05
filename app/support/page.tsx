import type { Metadata } from "next";
import Donate from "./donate";

export const metadata: Metadata = {
    title: "Support HOPE | HOPE Inc.",
    description:
        "Give through the PayPal Giving Fund or Venmo, or support H.O.P.E. with equipment, materials, expertise, and mentorship.",
};

// Toggle donations with the server-only DONATIONS_ENABLED=true; anything else displays the generic support inquiry form.
// force-dynamic so the flag is read at request time (no rebuild needed to flip it).
export const dynamic = "force-dynamic";

// In the future, this Server Component can fetch live state from Sanity CMS:
// e.g., const settings = await sanityClient.fetch('*[_type == "siteSettings"][0]{ donationsEnabled }');
export default function DonatePage() {
    return <Donate enabled={process.env.DONATIONS_ENABLED === "true"} />;
}

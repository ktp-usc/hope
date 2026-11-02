import Donate from "./donate";

// Toggle donations with NEXT_PUBLIC_DONATIONS_ENABLED=true; anything else displays the generic support inquiry form.
// In the future, this Server Component can fetch live state from Sanity CMS:
// e.g., const settings = await sanityClient.fetch('*[_type == "siteSettings"][0]{ donationsEnabled }');
export default function DonatePage() {
    return <Donate enabled={process.env.NEXT_PUBLIC_DONATIONS_ENABLED === "true"} />;
}

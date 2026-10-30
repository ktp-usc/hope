import Donate from "./donate";

// Flip with NEXT_PUBLIC_DONATIONS_ENABLED=true; anything else shows the donation-disabled page.
export default function DonatePage() {
    return <Donate enabled={process.env.NEXT_PUBLIC_DONATIONS_ENABLED === "true"} />;
}

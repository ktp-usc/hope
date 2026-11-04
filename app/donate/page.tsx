import type { Metadata } from "next";
import Donate from "./donate";

export const metadata: Metadata = {
    title: "Support HOPE | HOPE Inc.",
    description:
        "Give through the PayPal Giving Fund or Venmo, or support H.O.P.E. with equipment, materials, expertise, and mentorship.",
};

// Flip with NEXT_PUBLIC_DONATIONS_ENABLED=true; anything else shows the donation-disabled page.
export default function DonatePage() {
    return <Donate enabled={process.env.NEXT_PUBLIC_DONATIONS_ENABLED === "true"} />;
}

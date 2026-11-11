import type { Metadata } from "next";
import PartnersHero from "./_components/partners-hero";
import FeaturedAffiliation from "./_components/featured-affiliation";
import InstitutionalPartners from "./_components/institutional-partners";

export const metadata: Metadata = {
    title: "Partners & Collaborations | H.O.P.E.",
    description:
        "Discover our institutional partners, academic collaborations, and global affiliation with e-NABLE supporting Hands on Prosthetic Engineering.",
};

export default function PartnersAndCollaborationsPage() {
    return (
        <main className="min-h-screen bg-white text-ink">
            <PartnersHero />
            <FeaturedAffiliation />
            <InstitutionalPartners />
        </main>
    );
}

import type { Metadata } from "next";
import PartnersHero from "./_components/partners-hero";
import FeaturedAffiliation from "./_components/featured-affiliation";
import InstitutionalPartners from "./_components/institutional-partners";
import PartnershipCTA from "./_components/partnership-cta";

export const metadata: Metadata = {
    title: "Partners & Collaborations | H.O.P.E.",
    description:
        "Discover our institutional partners, academic collaborations, and global affiliation with e-NABLE supporting Hands on Prosthetic Engineering.",
};

export default function PartnersAndCollaborationsPage() {
    return (
        <main className="min-h-screen bg-white text-[#1B2D4C]">
            <PartnersHero />
            <FeaturedAffiliation />
            <InstitutionalPartners />
        </main>
    );
}

import type { Metadata } from "next";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { partnersQuery, type Partner } from "@/sanity/queries/partners";
import PartnersHero from "./_components/partners-hero";
import FeaturedAffiliation from "./_components/featured-affiliation";
import InstitutionalPartners from "./_components/institutional-partners";
import { fallbackPartners } from "./_components/fallback-partners";
import PartnershipCTA from "./_components/partnership-cta";

export const metadata: Metadata = {
    title: "Partners & Collaborations | H.O.P.E.",
    description:
        "Discover our institutional partners, academic collaborations, and global affiliation with e-NABLE supporting Hands on Prosthetic Engineering.",
};

export const dynamic = "force-dynamic";

async function getPartners(): Promise<Partner[]> {
    try {
        const { data } = await sanityFetch({ query: partnersQuery });
        const partners = data as Partner[] | null;
        if (partners?.length) return partners;
    } catch (error) {
        console.error("Failed to fetch partners from Sanity", error);
    }
    return fallbackPartners;
}

export default async function PartnersAndCollaborationsPage() {
    const partners = await getPartners();
    const featured = partners.find((p) => p.category === "primary-network");
    const others = partners.filter((p) => p !== featured);

    return (
        <main className="min-h-screen bg-white text-[#1B2D4C]">
            <PartnersHero />
            {featured && <FeaturedAffiliation partner={featured} />}
            <InstitutionalPartners partners={others} />
            <PartnershipCTA />
            <SanityLive />
        </main>
    );
}

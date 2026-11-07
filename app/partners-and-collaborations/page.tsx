import PartnersHero from "./_components/partners-hero";
import FeaturedAffiliation from "./_components/featured-affiliation";
import InstitutionalPartners from "./_components/institutional-partners";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Partners & Collaborations", "Discover our institutional partners, academic collaborations, and global affiliation with e-NABLE supporting Hands on Prosthetic Engineering.", "/partners-and-collaborations");

export default function PartnersAndCollaborationsPage() {
    return (
        <main className="min-h-screen bg-white text-[#1B2D4C]">
            <PartnersHero />
            <FeaturedAffiliation />
            <InstitutionalPartners />
        </main>
    );
}

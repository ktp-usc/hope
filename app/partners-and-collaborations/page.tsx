import PartnersHero from "./_components/partners-hero";
import FeaturedAffiliation from "./_components/featured-affiliation";
import InstitutionalPartners from "./_components/institutional-partners";
import PartnershipCTA from "./_components/partnership-cta";

export default function PartnersAndCollaborationsPage() {
    return (
        <main className="min-h-screen bg-white text-[#1B2D4C]">
            <PartnersHero />
            <FeaturedAffiliation />
            <InstitutionalPartners />
            <PartnershipCTA />
        </main>
    );
}



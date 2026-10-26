import Image from "next/image";

// Information for each institutional partner
const partners = [
    {
        logo: "/images/partners/musc.png",
        logoScale: "scale-100",
        logoAlt: "Medical University of South Carolina logo",
        type: "CLINICAL PARTNERSHIP",
        name: "Medical University of South Carolina (MUSC)",
        description:
            "Our partnership with MUSC brings a clinical perspective to our hands-on prosthetic engineering work, connecting the work of makers with orthopedic care.",
    },
    {
        logo: "/images/partners/usc.png",
        logoScale: "scale-[1.35]",
        logoAlt: "University of South Carolina logo",
        type: "ACADEMIC COLLABORATION",
        name: "University of South Carolina",
        description:
            "Our connection with the University of South Carolina creates space for academic collaboration, bringing student perspectives and shared learning to the challenges of prosthetic engineering.",
    },
    {
        logo: "/images/partners/mix.png",
        logoScale: "scale-100",
        logoAlt: "The MIX logo",
        type: "TECHNOLOGY & INCUBATOR SUPPORT",
        name: "The MIX / USC Columbia Technology Incubator",
        description:
            "The MIX / USC Columbia Technology Incubator connects HOPE with a local environment for technology and innovation, supporting the exchange of ideas as we develop our work.",
    },
    {
        logo: "/images/partners/ktp.png",
        logoScale: "scale-[1.2]",
        logoAlt: "Kappa Theta Pi logo",
        type: "TECHNOLOGY & DEVELOPMENT PARTNER",
        name: "Kappa Theta Pi",
        description:
            "Kappa Theta Pi works with HOPE as a technology and development partner, bringing a collaborative, technology-focused perspective to the tools and systems behind our mission.",
    },
];

export default function InstitutionalPartners() {
    return (
        <section className="bg-[#FFF4D8]">
            <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">

                {/* Section heading */}
                <div className="mb-8 grid gap-6 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="mb-3 text-xs uppercase tracking-wide text-slate-500">
                            Our Institutional Partners
                        </p>

                        <h2 className="text-3xl font-normal text-[#1B2D4C]">
                            Different expertise. Shared purpose.
                        </h2>
                    </div>

                    <p className="max-w-sm text-sm leading-relaxed text-slate-500 md:justify-self-end">
                        The relationships that connect our mission to
                        care, learning, and technology.
                    </p>
                </div>

                {/* Partners grid */}
                <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#E5DCC6] bg-[#E5DCC6] md:grid-cols-2">

                    {partners.map((partner) => (
                        <article
                            key={partner.name}
                            className="flex min-h-[250px] flex-col bg-[#FFF4D8] p-8"
                        >

                            {/* Partner logo */}
                            <div className="relative mb-7 h-20 w-full max-w-[280px]">
                                <Image
                                    src={partner.logo}
                                    alt={partner.logoAlt}
                                    fill
                                    sizes="280px"
                                    className={`origin-left object-contain object-left ${partner.logoScale}`}
                                />
                            </div>

                            {/* Partnership type */}
                            <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                                {partner.type}
                            </p>

                            {/* Partner name */}
                            <h3 className="mb-3 text-lg font-medium text-[#1B2D4C]">
                                {partner.name}
                            </h3>

                            {/* Description */}
                            <p className="text-sm leading-relaxed text-slate-500">
                                {partner.description}
                            </p>

                        </article>
                    ))}

                </div>
            </div>
        </section>
    );
}

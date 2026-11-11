import Image from "next/image";

interface InstitutionalPartner {
    name: string;
    type: string;
    description: string;
    logo: string;
    logoAlt: string;
    url: string;
}

// Information for each institutional partner from Content Packet Section 6
const partners: InstitutionalPartner[] = [
    {
        logo: "/images/partners/musc.png",
        logoAlt: "Medical University of South Carolina logo",
        type: "INSTITUTIONAL COLLABORATION",
        name: "Medical University of South Carolina (MUSC)",
        description:
            "HOPE is developing an institutional collaboration with the Medical University of South Carolina focused on opportunities where engineering, digital design, 3D printing, and healthcare education can intersect. Current work includes supporting students in learning CAD and additive-manufacturing skills that can be applied to assistive and rehabilitation-related challenges.",
        url: "https://web.musc.edu/",
    },
    {
        logo: "/images/partners/usc.png",
        logoAlt: "University of South Carolina logo",
        type: "CAMPUS & ACADEMIC PARTNERSHIP",
        name: "University of South Carolina",
        description:
            "The University of South Carolina is home to the HOPE student organization at USC and provides the campus community where students recruit, train, organize, and carry out much of HOPE\u2019s hands-on work. HOPE Inc. and the student organization are separate organizations that collaborate closely.",
        url: "https://sc.edu/",
    },
    {
        logo: "/images/partners/mix.png",
        logoAlt: "The MIX logo",
        type: "ENTREPRENEURSHIP & INNOVATION",
        name: "The Midlands Innovation X-Change (The MIX)",
        description:
            "HOPE\u2019s history includes support from the University of South Carolina\u2019s entrepreneurship and innovation ecosystem. HOPE previously worked through the USC/Columbia Technology Incubator, which has since transitioned into The Midlands Innovation X-Change (The MIX), continuing entrepreneurial-support, mentorship, and resources for developing ventures.",
        url: "https://themixsc.org/",
    },
    {
        logo: "/images/partners/ktp.png",
        logoAlt: "Kappa Theta Pi logo",
        type: "TECHNOLOGY & DEVELOPMENT PARTNER",
        name: "Kappa Theta Pi",
        description:
            "Kappa Theta Pi at the University of South Carolina contributed its technology and development expertise to the redesign and development of the HOPE Inc. website. Through its nonprofit consulting program, KTP students work with nonprofit organizations on real technology projects while gaining practical project experience.",
        url: "https://www.ktpusc.com/",
    },
];

export default function InstitutionalPartners() {
    return (
        <section className="border-t border-line bg-paper py-14">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">

                {/* Section heading */}
                <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-quiet">
                            Our Institutional Partners
                        </p>

                        <h2 className="text-3xl font-bold text-ink">
                            Different expertise. Shared purpose.
                        </h2>
                    </div>

                    <p className="max-w-sm text-sm leading-relaxed text-quiet md:justify-self-end">
                        The relationships that connect our mission to
                        care, learning, and technology.
                    </p>
                </div>

                {/* Partners grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    {partners.map((partner) => (
                        <article
                            key={partner.name}
                            className="flex min-h-[320px] flex-col justify-between rounded-2xl border border-line bg-white p-8 shadow-sm transition-colors hover:border-ink/30"
                        >
                            <div>
                                {/* Partner logo */}
                                <div className="relative mb-6 h-16 w-full max-w-[220px]">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.logoAlt}
                                        fill
                                        sizes="220px"
                                        className="object-contain object-left"
                                    />
                                </div>

                                {/* Partnership type */}
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-quiet">
                                    {partner.type}
                                </p>

                                {/* Partner name */}
                                <h3 className="mb-3 text-lg font-bold text-ink">
                                    {partner.name}
                                </h3>

                                {/* Description */}
                                <p className="text-sm leading-relaxed text-quiet">
                                    {partner.description}
                                </p>
                            </div>

                            {/* Partner external link */}
                            <div className="mt-6 border-t border-line pt-4">
                                <a
                                    href={partner.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                                    aria-label={`Visit ${partner.name} website (opens in a new tab)`}
                                >
                                    Visit partner website
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M7 17 17 7" />
                                        <path d="M7 7h10v10" />
                                    </svg>
                                </a>
                            </div>

                        </article>
                    ))}

                </div>
            </div>
        </section>
    );
}

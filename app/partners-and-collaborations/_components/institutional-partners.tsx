import Image from "next/image";
import type { Partner, PartnerCategory } from "@/sanity/queries/partners";

const CATEGORY_LABELS: Record<PartnerCategory, string> = {
    "primary-network": "Primary Network",
    institutional: "Institutional Partner",
    incubator: "Entrepreneurship & Innovation",
    community: "Community Partner",
};

/** Grid of institutional, incubator, and community partner cards. */
export default function InstitutionalPartners({ partners }: { partners: Partner[] }) {
    return (
        <section className="border-t border-slate-200/80 bg-slate-50/70 py-14">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">

                {/* Section heading */}
                <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="mb-3 text-xs uppercase font-semibold tracking-wide text-slate-600">
                            Our Institutional Partners
                        </p>

                        <h2 className="text-3xl font-normal text-[#1B2D4C]">
                            Different expertise. Shared purpose.
                        </h2>
                    </div>

                    <p className="max-w-sm text-sm leading-relaxed text-slate-600 md:justify-self-end">
                        The relationships that connect our mission to
                        care, learning, and technology.
                    </p>
                </div>

                {/* Partners grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    {partners.map((partner) => (
                        <article
                            key={partner._id}
                            className="flex min-h-[320px] flex-col justify-between rounded-lg border border-slate-200/80 bg-white p-8 shadow-sm transition-colors hover:border-slate-300"
                        >
                            <div>
                                {/* Partner logo */}
                                {partner.logoUrl && (
                                    <div className="relative mb-6 h-16 w-full max-w-[220px]">
                                        <Image
                                            src={partner.logoUrl}
                                            alt={`${partner.name} logo`}
                                            fill
                                            sizes="220px"
                                            className="object-contain object-left"
                                        />
                                    </div>
                                )}

                                {/* Partnership type */}
                                <p className="mb-2 text-xs uppercase font-semibold tracking-wide text-slate-500">
                                    {partner.category ? CATEGORY_LABELS[partner.category] : null}
                                </p>

                                {/* Partner name */}
                                <h3 className="mb-3 text-lg font-medium text-[#1B2D4C]">
                                    {partner.name}
                                </h3>

                                {/* Description */}
                                <p className="text-sm leading-relaxed text-slate-600">
                                    {partner.description}
                                </p>
                            </div>

                            {/* Partner external link */}
                            {partner.websiteUrl && (
                            <div className="mt-6 border-t border-slate-100 pt-4">
                                <a
                                    href={partner.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B2D4C] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2D4C]"
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
                            )}

                        </article>
                    ))}

                </div>
            </div>
        </section>
    );
}

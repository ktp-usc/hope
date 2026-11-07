import Image from "next/image";
import type { Partner } from "@/sanity/queries/partners";

export default function FeaturedAffiliation({ partner }: { partner: Partner }) {
    return (
        <section className="mx-auto w-full max-w-6xl px-6 pb-14 lg:px-8">
            <div className="grid overflow-hidden rounded-md bg-[#EBF2F8] lg:grid-cols-[1.65fr_1fr]">

                {/* Left side: e-NABLE information */}
                <div className="p-8 lg:p-10">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs uppercase font-medium tracking-wide text-slate-600">
                            Our Global Affiliation
                        </span>

                        <span className="text-xs font-semibold text-[#1B2D4C]">
                            Certified chapter
                        </span>
                    </div>

                    {partner.logoUrl && (
                        <div className="relative mb-4 h-20 w-20">
                            <Image
                                src={partner.logoUrl}
                                alt={`${partner.name} logo`}
                                fill
                                sizes="80px"
                                className="object-contain object-left"
                            />
                        </div>
                    )}

                    <h2 className="text-4xl font-normal text-[#1B2D4C]">
                        e-NABLE
                    </h2>

                    <p className="mb-5 text-xs uppercase font-medium tracking-wide text-slate-600">
                        Enable the Future
                    </p>

                    <h3 className="mb-4 text-xl font-medium text-[#1B2D4C]">
                        A global network. A local commitment.
                    </h3>

                    <p className="mb-6 max-w-xl text-sm leading-relaxed text-slate-700">
                        {partner.description}
                    </p>

                    {partner.websiteUrl && (
                    <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B2D4C] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2D4C]"
                        aria-label="Explore Enable the Future (opens in a new tab)"
                    >
                        Explore Enable the Future
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
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
                    )}
                </div>

                {/* Right side: partnership image */}
                <div className="relative flex min-h-[300px] flex-col overflow-hidden bg-[#D6E2EC]">
                    <div className="relative flex-1 min-h-[240px]">
                        <Image
                            src="/images/partners/enable-workshop.png"
                            alt="e-NABLE community workshop session with volunteers building 3D-printed prosthetic hands"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                    </div>

                    <div className="bg-[#1B2D4C] px-5 py-3 text-xs text-white">
                        Shared knowledge. Hands-on possibility.
                    </div>
                </div>

            </div>
        </section>
    );
}

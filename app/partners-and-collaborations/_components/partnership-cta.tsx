import Link from "next/link";

export default function PartnershipCTA() {
    return (
        <section className="bg-[#1B2D4C]">
            <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">

                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

                    {/* Left side: heading and description */}
                    <div>
                        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[#F5CA58]">
                            Let&apos;s Build Something Meaningful
                        </p>

                        <h2 className="mb-4 text-3xl font-normal text-white md:text-4xl">
                            There&apos;s a place for your expertise.
                        </h2>

                        <p className="max-w-lg text-sm leading-relaxed text-slate-300">
                            Are you a clinician, educator, maker, or technology
                            team? Let&apos;s explore how your perspective can
                            support HOPE&apos;s work.
                        </p>
                    </div>

                    {/* Right side: CTA button */}
                    <Link
                        href="/get-involved"
                        className="inline-flex shrink-0 items-center justify-center gap-4 self-start rounded-md bg-[#F5CA58] px-6 py-4 text-sm font-medium text-[#1B2D4C] transition-colors hover:bg-[#E9B942] md:self-center"
                    >
                        Start a conversation
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
                    </Link>

                </div>
            </div>
        </section>
    );
}

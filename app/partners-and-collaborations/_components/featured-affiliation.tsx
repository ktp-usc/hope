export default function FeaturedAffiliation() {
    return (
        <section className="mx-auto w-full max-w-6xl px-6 pb-14 lg:px-8">
            <div className="grid overflow-hidden rounded-md bg-[#EBF2F8] lg:grid-cols-[1.65fr_1fr]">

                {/* Left side: e-NABLE information */}
                <div className="p-8 lg:p-10">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs uppercase text-slate-500">
              Our Global Affiliation
            </span>

                        <span className="text-xs text-[#1B2D4C]">
              Certified chapter
            </span>
                    </div>

                    <h2 className="text-4xl font-normal text-[#1B2D4C]">
                        e-NABLE
                    </h2>

                    <p className="mb-5 text-xs uppercase tracking-wide text-slate-400">
                        Enable the Future
                    </p>

                    <h3 className="mb-4 text-xl text-[#1B2D4C]">
                        A global network. A local commitment.
                    </h3>

                    <p className="mb-6 max-w-xl text-sm leading-relaxed text-slate-500">
                        HOPE is a certified chapter of e-NABLE, the global &quot;Enable the Future&quot; network.. We utilize
                        its international case databases to inform our
                        work, connecting our local team to a worldwide
                        community of volunteer makers and shared
                        prosthetic knowledge.
                    </p>

                    <a
                        href="https://enablingthefuture.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#1B2D4C] hover:underline"
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
                </div>

                {/* Right side: partnership image */}
                <div className="flex min-h-[280px] flex-col bg-[#D6E2EC]">
                    <div
                        className="flex-1 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('/images/partners/enable-workshop.png')",
                        }}
                    />

                    <div className="bg-[#1B2D4C] px-5 py-3 text-xs text-white">
                        Shared knowledge. Hands-on possibility.
                    </div>
                </div>

            </div>
        </section>
    );
}

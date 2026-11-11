import Image from "next/image";

export default function FeaturedAffiliation() {
    return (
        <section className="mx-auto w-full max-w-6xl px-6 pb-14 lg:px-8">
            <div className="grid overflow-hidden rounded-2xl bg-wash lg:grid-cols-[1.65fr_1fr]">

                {/* Left side: e-NABLE information */}
                <div className="p-8 lg:p-10">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wide text-quiet">
                            Our Global Affiliation
                        </span>

                        <span className="text-xs font-semibold text-ink">
                            Certified chapter
                        </span>
                    </div>

                    <h2 className="text-4xl font-bold text-ink">
                        e-NABLE
                    </h2>

                    <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-quiet">
                        Enable the Future
                    </p>

                    <h3 className="mb-4 text-xl font-bold text-ink">
                        A global network. A local commitment.
                    </h3>

                    <p className="mb-6 max-w-xl text-sm leading-relaxed text-quiet">
                        HOPE has longstanding ties to the global e-NABLE community, which helped shape HOPE&apos;s early work with 3D-printed prosthetic hands. As a certified e-NABLE chapter, HOPE draws on the community&apos;s open-source designs, resources, and worldwide maker network while continuing to develop custom projects and local capabilities.
                    </p>

                    <a
                        href="https://enablingthefuture.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
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
                </div>

                {/* Right side: partnership image */}
                <div className="relative flex min-h-[300px] flex-col overflow-hidden bg-line">
                    <div className="relative flex-1 min-h-[240px]">
                        <Image
                            src="/images/partners/enable-workshop.png"
                            alt="e-NABLE community workshop session with volunteers building 3D-printed prosthetic hands"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                    </div>

                    <div className="bg-ink px-5 py-3 text-xs text-white">
                        Shared knowledge. Hands-on possibility.
                    </div>
                </div>

            </div>
        </section>
    );
}

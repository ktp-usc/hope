export default function PartnersHero() {
    return (
        <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-16 lg:px-8 lg:pt-20">
            <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-16">

                {/* Left side: heading */}
                <div>
                    <p className="mb-5 text-xs font-medium uppercase tracking-wider text-slate-500">
                        Partners & Collaborations
                    </p>

                    <h1 className="text-4xl font-normal leading-tight tracking-tight text-[#1B2D4C] sm:text-5xl">
                        Better together.
                        <br />
                        Built for possibility.
                    </h1>
                </div>

                {/* Right side: introduction */}
                <div className="pb-1">
                    <p className="max-w-md text-base leading-relaxed text-slate-500">
                        Progress is a shared effort. We bring together
                        a global maker network, clinical expertise,
                        and local technology communities to put
                        prosthetic engineering into practice.
                    </p>
                </div>

            </div>
        </section>
    );
}


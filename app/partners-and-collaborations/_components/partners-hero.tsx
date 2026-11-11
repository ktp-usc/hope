export default function PartnersHero() {
    return (
        <section className="bg-sun px-6 py-14 lg:px-8 lg:py-20">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-16">

                {/* Left side: heading */}
                <div>
                    <p className="mb-5 text-xs font-bold uppercase tracking-wider text-ink">
                        Partners &amp; Collaborations
                    </p>

                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
                        Better together.
                        <br />
                        Built for possibility.
                    </h1>
                </div>

                {/* Right side: introduction */}
                <div className="pb-1">
                    <p className="max-w-md text-base leading-relaxed text-ink">
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

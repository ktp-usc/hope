"use client";

/**
 * Support inquiry component.
 * Directs users to the contact email while the intake API is being connected,
 * preventing unhandled form submissions.
 */
export default function SupportForm() {
    return (
        <div className="mx-auto w-full max-w-[460px] rounded-3xl border border-line bg-white p-6 shadow-[0_2px_4px_rgba(16,39,67,0.04),0_24px_48px_-16px_rgba(16,39,67,0.14)] sm:p-8">
            <h2 className="font-display text-3xl tracking-[-0.02em] text-ink sm:text-4xl">Support H.O.P.E.</h2>
            <p className="mt-2 text-sm text-quiet">
                Direct donations are temporarily paused, but there are many vital ways to help. Let us know how you can contribute.
            </p>

            <div className="mt-8 rounded-2xl border border-line bg-paper/60 p-6 text-center">
                <p className="font-display text-lg text-ink">
                    Get in touch
                </p>
                <p className="mt-2 text-sm leading-6 text-quiet">
                    Our online inquiry form is temporarily unavailable while we update our systems. To discuss sponsoring equipment, donating materials, offering expertise, or workplace giving, please reach our Logistics lead directly:
                </p>
                <a
                    href="mailto:aturner@handsonhope.ngo?subject=Supporting%20HOPE%20Inquiry"
                    className="mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-hope px-6 text-sm font-bold text-white transition-colors hover:bg-hope-deep"
                >
                    Email aturner@handsonhope.ngo
                </a>
            </div>

            <p className="mt-6 text-center text-xs text-quiet">
                Prefer direct email? Reach our Logistics lead at{" "}
                <a
                    href="mailto:aturner@handsonhope.ngo?subject=Supporting%20HOPE%20Inquiry"
                    className="text-quiet transition-colors hover:text-hope hover:underline decoration-1 underline-offset-2"
                >
                    aturner@handsonhope.ngo
                </a>
            </p>
        </div>
    );
}

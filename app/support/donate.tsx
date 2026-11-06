import { ArrowRight } from "lucide-react";
import SupportForm from "./support-form";

const supportWays = [
    {
        title: "Sponsor equipment",
        description: "Help fund the printers, scanners, tools, and fabrication equipment that bring each prosthetic to life.",
    },
    {
        title: "Donate materials",
        description: "Contribute approved components, printing materials, tools, and supplies our teams use every day.",
    },
    {
        title: "Offer your expertise",
        description: "Share your skills in engineering, healthcare, design, operations, or another professional field.",
    },
    {
        title: "Workplace giving",
        description: "Support H.O.P.E. through matching gifts, payroll giving, or a team-led fundraising campaign.",
    },
    {
        title: "Alumni mentorship",
        description: "Alumni and professionals can mentor the students who design and build each prosthetic.",
    },
];

const PAYPAL_URL = "https://www.paypal.com/us/fundraiser/charity/2442369";
const VENMO_HANDLE = "@HandsOnHOPENGO";
const VENMO_URL = "https://account.venmo.com/u/HandsOnHOPENGO";
const CONTACT_EMAIL = "aturner@handsonhope.ngo";

function DonationWidget() {
    return (
        <section
            aria-labelledby="donation-heading"
            className="w-full rounded-[28px] border border-line bg-white p-7 shadow-[0_2px_4px_rgba(16,39,67,0.04),0_24px_48px_-16px_rgba(16,39,67,0.14)] sm:p-9"
        >
            <div className="border-b border-line pb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-hope">Direct Giving</span>
                <h2 id="donation-heading" className="mt-1 font-display text-3xl leading-[1.1] tracking-[-0.02em] sm:text-4xl">
                    Make a Donation
                </h2>
            </div>

            <div className="mt-6 space-y-4">
                {/* PayPal Giving Fund */}
                <div className="rounded-2xl border border-line bg-paper/60 p-5 transition-colors hover:border-hope/40">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="font-display text-xl tracking-[-0.01em]">PayPal Giving Fund</h3>
                            <p className="mt-1 text-xs text-quiet">Hands On Prosthetic Engineering - HOPE</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                            0% charity fees
                        </span>
                    </div>
                    <a
                        href={PAYPAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-hope bg-hope px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:border-hope-deep hover:bg-hope-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hope"
                    >
                        Donate with PayPal
                        <ArrowRight aria-hidden className="size-4" />
                        <span className="sr-only">(opens in a new tab)</span>
                    </a>
                </div>

                {/* Venmo Charity */}
                <div className="rounded-2xl border border-line bg-paper/60 p-5 transition-colors hover:border-[#008cff]/40">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="font-display text-xl tracking-[-0.01em]">Venmo Charity</h3>
                            <p className="mt-1 text-xs text-quiet">Direct app or web profile donation</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-bold text-[#008cff]">
                            {VENMO_HANDLE}
                        </span>
                    </div>
                    <a
                        href={VENMO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#008cff] bg-[#008cff] px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:border-[#0074de] hover:bg-[#0074de] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008cff]"
                    >
                        Donate with Venmo
                        <ArrowRight aria-hidden className="size-4" />
                        <span className="sr-only">(opens in a new tab)</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default function Donate({ enabled }: { enabled: boolean }) {
    return (
        <div className="min-h-screen bg-paper text-ink">
            <main>
                <section className="mx-auto grid max-w-[1240px] gap-14 px-6 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-16">
                    <div className="max-w-[650px]">
                        <h1 className="font-display text-[clamp(3.25rem,7vw,6rem)] leading-[0.92] tracking-[-0.03em] text-balance">
                            Give hope.
                            <br />
                            <span className="relative inline-block text-hope">
                                Change lives.
                                <svg aria-hidden className="absolute -bottom-2 left-1 w-[96%]" viewBox="0 0 490 18" fill="none">
                                    <path d="M4 12C118 2 302 3 486 9" stroke="#FFD84D" strokeWidth="9" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>
                        <p className="mt-10 max-w-[34rem] text-lg leading-8 text-quiet text-pretty">
                            Your support is what allows us to provide life changing prosthetics to those in need.
                        </p>
                    </div>
                    {enabled ? <DonationWidget /> : <SupportForm />}
                </section>

                <section aria-labelledby="support-heading" className="bg-wash px-6 py-16 lg:px-10 lg:py-24">
                    <div className="mx-auto max-w-[1000px]">
                        <h2 id="support-heading" className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-balance sm:text-5xl">
                            {enabled ? "Other ways to support our work." : "Ways to support our work."}
                        </h2>
                        <p className="mt-5 max-w-[34rem] leading-7 text-quiet text-pretty">
                            Every contribution matters. Find the way your resources, skills, or workplace can help us
                            create more life-changing prosthetics.
                        </p>
                        <ul className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
                            {supportWays.map((way) => (
                                <li key={way.title} className="grid gap-2 py-6 md:grid-cols-[2fr_3fr] md:gap-10">
                                    <h3 className="text-lg font-extrabold tracking-[-0.01em]">{way.title}</h3>
                                    <p className="leading-7 text-quiet">{way.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}
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

const pill =
    "inline-flex items-center gap-2.5 rounded-full border-2 px-7 py-[17px] text-base font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4";

function DonationWidget() {
    const card = "rounded-[28px] border border-line bg-white p-8 shadow-[0_2px_4px_rgba(16,39,67,0.04),0_24px_48px_-16px_rgba(16,39,67,0.14)] sm:p-10";
    return (
        <div className="grid w-full gap-5">
            <section aria-labelledby="paypal-heading" className={card}>
                <h2 id="paypal-heading" className="font-display text-4xl leading-[1.1] tracking-[-0.02em]">
                    PayPal Giving Fund
                </h2>
                <p className="mt-3 font-semibold">Hands On Prosthetic Engineering - HOPE</p>
                <p className="mt-3 text-[17px] leading-7 text-quiet">0% charity fees, so your whole gift reaches our work.</p>
                <a
                    href={PAYPAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${pill} mt-7 border-hope bg-hope text-white hover:border-hope-deep hover:bg-hope-deep focus-visible:outline-hope`}
                >
                    Donate with PayPal
                    <ArrowRight aria-hidden className="size-[18px]" />
                    <span className="sr-only">(opens in a new tab)</span>
                </a>
            </section>
            <section aria-labelledby="venmo-heading" className={card}>
                <h2 id="venmo-heading" className="font-display text-3xl leading-[1.1] tracking-[-0.02em]">
                    Venmo Charity
                </h2>
                <div className="mt-4 flex items-center gap-6">
                    <div
                        role="img"
                        aria-label="QR code coming soon"
                        className="grid size-24 shrink-0 place-items-center rounded-xl border-2 border-dashed border-line text-center text-xs font-semibold text-quiet"
                    >
                        QR code
                        <br />
                        coming soon
                    </div>
                    <div>
                        <p className="font-extrabold">{VENMO_HANDLE}</p>
                        <a
                            href={VENMO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-[15px] font-bold text-hope underline underline-offset-4 hover:text-hope-deep"
                        >
                            Give on Venmo
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    </div>
                </div>
            </section>
            <p className="text-[15px] leading-6 text-quiet">
                Employer matching or grant checks? Email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-hope underline underline-offset-4 hover:text-hope-deep">
                    {CONTACT_EMAIL}
                </a>
                .
            </p>
        </div>
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

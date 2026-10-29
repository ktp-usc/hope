import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DonateForm from "./donate-form";

const facts = [
    "A student-run chapter at the University of South Carolina",
    "Prosthetic hands and arms made free of charge",
    "Equipment, materials, and expertise are welcome, too",
];

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
];

const faqs = [
    {
        question: "Who runs H.O.P.E.?",
        answer: "H.O.P.E. is a student organization at the University of South Carolina that designs and 3D prints prosthetic hands and arms.",
    },
    {
        question: "Does it cost recipients anything?",
        answer: "No. H.O.P.E. provides prosthetics free of charge.",
    },
    {
        question: "Can I give equipment, materials, or my time instead of money?",
        answer: "Yes. Equipment, materials, and expertise all help our teams. Visit Get Involved to see where your skills fit.",
    },
    {
        question: "Can my workplace support H.O.P.E.?",
        answer: "Yes. Matching gifts, payroll giving, and team-led fundraising campaigns are all ways to support the work.",
    },
];

const pill =
    "inline-flex items-center gap-2.5 rounded-full border-2 px-7 py-[17px] text-base font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4";

function GetInvolvedLink({ className }: { className: string }) {
    return (
        <Link href="/get-involved" className={`${pill} ${className}`}>
            See how to get involved
            <ArrowRight aria-hidden className="size-[18px]" />
        </Link>
    );
}

function DonationsPaused() {
    return (
        <div
            role="status"
            className="w-full rounded-[28px] border border-line bg-white p-8 shadow-[0_2px_4px_rgba(16,39,67,0.04),0_24px_48px_-16px_rgba(16,39,67,0.08)] sm:p-10"
        >
            <h2 className="font-display text-4xl leading-[1.1] tracking-[-0.02em] text-balance">
                Online giving isn&apos;t open right now.
            </h2>
            <p className="mt-5 text-[17px] leading-7 text-quiet">
                We aren&apos;t accepting online gifts at the moment. You can still support H.O.P.E. by giving your
                time, equipment, or expertise.
            </p>
            <div className="mt-7 flex flex-col items-start gap-[18px]">
                <GetInvolvedLink className="border-hope bg-hope text-white hover:bg-hope-deep hover:border-hope-deep focus-visible:outline-hope" />
                <a href="#support-heading" className="text-[15px] font-bold text-hope underline underline-offset-4 hover:text-hope-deep">
                    Read other ways to support our work
                </a>
            </div>
        </div>
    );
}

export default function Donate({ enabled }: { enabled: boolean }) {
    return (
        <div className="min-h-screen bg-paper text-ink">
            <Header />
            <main>
                <section className="mx-auto grid max-w-[1240px] gap-14 px-6 pb-16 pt-10 lg:grid-cols-[1fr_540px] lg:items-start lg:gap-20 lg:px-10 lg:pb-24 lg:pt-[72px]">
                    <div>
                        <h1 className="font-display text-[clamp(3.25rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] text-balance">
                            Give hope.
                            <br />
                            <span className="relative inline-block text-hope">
                                Change lives.
                                <svg aria-hidden className="absolute -bottom-2 left-1 w-[86%]" viewBox="0 0 490 18" fill="none" preserveAspectRatio="none">
                                    <path d="M4 12C118 2 302 3 486 9" stroke="#FFD84D" strokeWidth="9" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>
                        <p className="mt-10 max-w-[34rem] text-[19px] leading-8 text-quiet text-pretty">
                            Your support is what allows us to provide life changing prosthetics to those in need.
                        </p>
                        <ul className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
                            {facts.map((fact) => (
                                <li key={fact} className="py-4 font-semibold">
                                    {fact}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {enabled ? <DonateForm /> : <DonationsPaused />}
                </section>

                <section aria-labelledby="support-heading" className="bg-wash px-6 py-16 lg:px-10 lg:py-24">
                    <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[420px_1fr] lg:gap-20">
                        <div>
                            <h2 id="support-heading" className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-balance sm:text-[56px]">
                                {enabled ? "Other ways to support our work." : "Ways to support our work."}
                            </h2>
                            <p className="mt-5 text-lg leading-[30px] text-quiet text-pretty">
                                Every contribution matters. Find the way your resources, skills, or workplace can help
                                us create more life-changing prosthetics.
                            </p>
                        </div>
                        <ul className="divide-y divide-ink/15 border-y border-ink/15">
                            {supportWays.map((way) => (
                                <li key={way.title} className="grid gap-2.5 py-7 md:grid-cols-[260px_1fr] md:gap-10">
                                    <h3 className="text-xl font-extrabold leading-7">{way.title}</h3>
                                    <p className="text-[17px] leading-7 text-quiet">{way.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {enabled && (
                    <section aria-labelledby="involved-heading" className="mx-auto max-w-[1240px] px-6 pt-16 lg:px-10 lg:pt-24">
                        <div className="flex flex-col items-start justify-between gap-8 rounded-[32px] bg-hope p-8 text-white sm:p-14 lg:flex-row lg:items-center lg:gap-12">
                            <div className="max-w-[44rem]">
                                <h2 id="involved-heading" className="font-display text-5xl leading-[1.08] tracking-[-0.02em]">
                                    Give your time, too.
                                </h2>
                                <p className="mt-4 text-lg leading-[30px] text-[#d7e6ff]">
                                    Join the H.O.P.E. chapter at USC or find the role that fits your skills. Every
                                    project needs more than engineers.
                                </p>
                            </div>
                            <GetInvolvedLink className="shrink-0 border-sun bg-sun text-ink hover:border-white hover:bg-white focus-visible:outline-white" />
                        </div>
                    </section>
                )}

                <section aria-labelledby="faq-heading" className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10 lg:py-24">
                    <h2 id="faq-heading" className="font-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl">
                        Common questions.
                    </h2>
                    <dl className="mt-10 grid gap-x-20 border-b border-ink/15 md:grid-cols-2">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="border-t border-ink/15 py-7">
                                <dt className="text-xl font-extrabold leading-7">{faq.question}</dt>
                                <dd className="mt-2.5 text-[17px] leading-7 text-quiet">{faq.answer}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            </main>
            <Footer />
        </div>
    );
}

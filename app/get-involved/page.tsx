import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
    title: "Get Involved | H.O.P.E.",
    description:
        "Join H.O.P.E. at the University of South Carolina or reach out from another school, then find the way you want to contribute.",
};

// Verified H.O.P.E. page on Garnet Gate (USC). It also lists the chapter's contact details.
const GARNET_GATE_URL = "https://garnetgate.sa.sc.edu/organization/HOPE";

const contributions = [
    {
        title: "Design and technical",
        description: "Design and build prosthetics.",
        roles: ["CAD and 3D modeling", "3D printing and fabrication", "Electronics and software"],
    },
    {
        title: "People and community",
        description: "Connect H.O.P.E. with the people it serves.",
        roles: ["Outreach and events", "Recipient and family support", "Marketing and storytelling"],
    },
    {
        title: "Business and organizational",
        description: "Keep the organization running and growing.",
        roles: ["Fundraising and grants", "Partnerships and sponsors", "Finance and operations"],
    },
];

const pill =
    "inline-flex items-center gap-2.5 rounded-full px-7 py-[17px] text-base font-extrabold border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4";

function ExternalLink({ className, children }: { className: string; children: React.ReactNode }) {
    return (
        <a href={GARNET_GATE_URL} target="_blank" rel="noopener noreferrer" className={className}>
            {children}
            <ArrowRight aria-hidden className="size-[18px]" />
            <span className="sr-only">(opens in a new tab)</span>
        </a>
    );
}

export default function GetInvolvedPage() {
    return (
        <div className="min-h-screen bg-paper text-ink">
            <Header />
            <main>
                <section className="mx-auto max-w-[1240px] px-6 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-16">
                    <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-hope">Get involved</p>
                    <h1 className="mt-6 font-display text-[clamp(3.25rem,8vw,6rem)] leading-[0.95] tracking-[-0.03em] text-balance">
                        Build hope
                        <br />
                        <span className="relative inline-block text-hope">
                            with your hands.
                            <svg aria-hidden className="absolute -bottom-2 left-1 w-[83%]" viewBox="0 0 490 18" fill="none" preserveAspectRatio="none">
                                <path d="M4 12C118 2 302 3 486 9" stroke="#FFD84D" strokeWidth="9" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h1>
                    <p className="mt-10 max-w-[35rem] text-lg leading-8 text-quiet text-pretty">
                        H.O.P.E. is built by students who want to put their skills to work for people who need
                        prosthetics. See the ways you can contribute below, then choose where you&apos;re studying to get started.
                    </p>
                </section>

                <section aria-labelledby="contribute-heading" className="bg-wash px-6 py-16 lg:px-10 lg:py-24">
                    <div className="mx-auto max-w-[1240px]">
                        <h2 id="contribute-heading" className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-balance sm:text-[56px]">
                            Three ways to contribute.
                        </h2>
                        <p className="mt-5 max-w-[35rem] text-lg leading-7 text-quiet">
                            Every project needs more than engineers. Find the work that fits your skills and interests.
                        </p>
                        <ul className="mt-12 grid gap-6 md:grid-cols-3">
                            {contributions.map((c, i) => (
                                <li key={c.title} className="flex flex-col rounded-[28px] border border-line bg-white p-8">
                                    <div className="flex items-center justify-between">
                                        <span aria-hidden className="font-display text-[40px] leading-none text-hope">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span aria-hidden className="size-3.5 rounded-full bg-hope" />
                                    </div>
                                    <h3 className="mt-7 text-2xl font-extrabold leading-[30px]">{c.title}</h3>
                                    <p className="mt-4 text-base leading-[26px] text-quiet">{c.description}</p>
                                    <hr className="mt-6 border-line" />
                                    <ul className="mt-5 space-y-3">
                                        {c.roles.map((role) => (
                                            <li key={role} className="flex items-center gap-2.5 text-[15px] font-semibold">
                                                <span aria-hidden className="size-2 shrink-0 rounded-full bg-sun" />
                                                {role}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section aria-labelledby="path-heading" className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10 lg:py-24">
                    <h2 id="path-heading" className="font-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl">
                        Where are you studying?
                    </h2>
                    <div className="mt-8 grid gap-7 md:grid-cols-2">
                        <div className="flex flex-col rounded-[32px] border border-hope bg-hope p-8 text-white sm:p-11">
                            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-sun">University of South Carolina</p>
                            <h3 className="mt-4 font-display text-4xl leading-[1.1] sm:text-[44px]">I&apos;m a USC student</h3>
                            <p className="mt-5 text-[17px] leading-7 text-[#d7e6ff]">
                                Join the H.O.P.E. chapter on campus. Sign up through Garnet Gate to become a member,
                                attend meetings, and join a project team.
                            </p>
                            <div className="mt-8">
                                <ExternalLink className={`${pill} border-sun bg-sun text-ink hover:bg-white hover:border-white focus-visible:outline-white`}>
                                    Join HOPE at USC
                                </ExternalLink>
                                <p className="mt-5 text-sm font-semibold text-[#d7e6ff]">Opens Garnet Gate</p>
                            </div>
                        </div>

                        <div className="flex flex-col rounded-[32px] border border-line bg-white p-8 sm:p-11">
                            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-hope">Another school</p>
                            <h3 className="mt-4 font-display text-4xl leading-[1.1] sm:text-[44px]">I&apos;m at another school</h3>
                            <p className="mt-5 text-[17px] leading-7 text-quiet">
                                Not at USC? We want to hear from you. Reach out to learn how to contribute remotely or
                                start a H.O.P.E. group at your school.
                            </p>
                            <div className="mt-8">
                                <ExternalLink className={`${pill} border-hope bg-white text-hope hover:bg-hope hover:text-white focus-visible:outline-hope`}>
                                    Connect with HOPE
                                </ExternalLink>
                                <p className="mt-5 text-sm font-semibold text-quiet">Opens our Garnet Gate page, which lists contact details</p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}

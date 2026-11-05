import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Get Involved | HOPE Inc.",
    description:
        "HOPE brings together students from many different backgrounds to work on real projects, develop practical skills, and help run the organization.",
};

// Verified H.O.P.E. page on Garnet Gate (USC). It also lists the chapter's contact details.
const GARNET_GATE_URL = "https://garnetgate.sa.sc.edu/organization/HOPE";

const contributions = [
    {
        title: "Design and technical",
        description: "Engineering design, CAD, 3D printing, manufacturing, prototyping, and testing for adaptable assistive solutions.",
        roles: [
            "Engineering design",
            "CAD",
            "3D printing",
            "Manufacturing",
            "Prototyping and testing",
            "Software",
            "Electronics",
            "Accessibility",
            "Human-centered design",
            "Digital design and illustration",
        ],
    },
    {
        title: "People and community",
        description: "Recipient and family engagement, accessibility research, partner coordination, and gathering feedback.",
        roles: [
            "Recipient and family engagement",
            "Outreach",
            "Hospital and community-partner coordination",
            "Accessibility research",
            "Public health",
            "Psychology and human behavior",
            "Healthcare and rehabilitation perspectives",
            "Gathering feedback",
            "Translating needs into requirements",
        ],
    },
    {
        title: "Business and organizational",
        description: "Project management, nonprofit operations, communications, fundraising, and leadership.",
        roles: [
            "Project management",
            "Nonprofit and corporate operations",
            "Fundraising and grant development",
            "Communications and social media",
            "Photo, video, and storytelling",
            "Graphic design and branding",
            "Recruiting and volunteer coordination",
            "Partnerships and sponsor relations",
            "Events",
            "Executive leadership",
            "Organizational management",
        ],
    },
];

// Student org WordPress blog: URL not yet provided, the link renders once this is set.
const STUDENT_ORG_BLOG_URL = "https://hopeuofsc.wordpress.com/";

const pill =
    "inline-flex items-center gap-2.5 rounded-full px-7 py-[17px] text-base font-extrabold border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4";

function ExternalLink({ className, children, href = GARNET_GATE_URL }: { className: string; children: React.ReactNode; href?: string }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
            {children}
            <ArrowRight aria-hidden className="size-[18px]" />
            <span className="sr-only">(opens in a new tab)</span>
        </a>
    );
}

export default function GetInvolvedPage() {
    return (
        <div className="min-h-screen bg-paper text-ink">
            <main>
                <section className="mx-auto max-w-[1240px] px-6 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-16">
                    <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-hope">Get involved</p>
                    <h1 className="mt-6 font-display text-[clamp(3.25rem,8vw,6rem)] leading-[0.95] tracking-[-0.03em] text-balance">
                        Work on real projects.
                        <br />
                        <span className="relative inline-block text-hope">
                            Develop practical skills.
                        </span>
                    </h1>
                    <p className="mt-10 max-w-[38rem] text-lg leading-8 text-quiet text-pretty">
                        HOPE brings together students from many different backgrounds to work on real projects, develop practical skills, and help run the organization. You do not have to be an engineer to contribute—HOPE brings together students with technical, creative, business, healthcare, social-science, and community-focused interests.
                    </p>
                </section>

                <section aria-labelledby="contribute-heading" className="bg-wash px-6 py-16 lg:px-10 lg:py-24">
                    <div className="mx-auto max-w-[1240px]">
                        <h2 id="contribute-heading" className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-balance sm:text-[56px]">
                            Ways to contribute.
                        </h2>
                        <p className="mt-5 max-w-[38rem] text-lg leading-7 text-quiet">
                            HOPE benefits from people who approach problems differently. A successful project needs someone who can design a part, someone who understands the person using it, someone who can communicate with a family or partner, and someone who can keep the project organized and moving forward.
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
                            <h3 className="mt-4 font-display text-4xl leading-[1.1] sm:text-[44px]">USC students</h3>
                            <p className="mt-5 text-[17px] leading-7 text-[#d7e6ff]">
                                For students at the University of South Carolina, the best starting point is the HOPE student organization at USC. Students can join through Garnet Gate, connect with student leadership, and attend meetings, training, and project activities.
                            </p>
                            <div className="mt-8">
                                <ExternalLink className={`${pill} border-sun bg-sun text-ink hover:bg-white hover:border-white focus-visible:outline-white`}>
                                    Join HOPE at USC (Garnet Gate)
                                </ExternalLink>
                                {STUDENT_ORG_BLOG_URL && (
                                    <p className="mt-5">
                                        <a href={STUDENT_ORG_BLOG_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white underline underline-offset-4 hover:text-sun">
                                            Visit the HOPE student organization website
                                            <span className="sr-only"> (opens in a new tab)</span>
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col rounded-[32px] border border-line bg-white p-8 sm:p-11">
                            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-hope">Other institutions</p>
                            <h3 className="mt-4 font-display text-4xl leading-[1.1] sm:text-[44px]">Students at other schools</h3>
                            <p className="mt-5 text-[17px] leading-7 text-quiet">
                                Students do not have to be at USC to start a conversation with HOPE. Students, colleges, universities, and technical schools can contact HOPE about contributing, collaborating, or exploring opportunities.
                            </p>
                            <div className="mt-8">
                                <Link href="/contact" className={`${pill} border-hope bg-white text-hope hover:bg-hope hover:text-white focus-visible:outline-hope`}>
                                    Connect with HOPE
                                    <ArrowRight aria-hidden className="size-[18px]" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

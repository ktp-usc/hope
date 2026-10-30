import Header from "@/components/header";
import Footer from "@/components/footer";
import DonateForm from "./donate-form";

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

export default function Donate({ enabled }: { enabled: boolean }) {
    return (
        <div className="min-h-screen bg-paper text-ink">
            <Header />
            <main>
                <section
                    className={`mx-auto grid max-w-[1240px] gap-14 px-6 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-16 ${
                        enabled ? "lg:grid-cols-[1.1fr_0.9fr] lg:items-center" : "justify-items-center text-center"
                    }`}
                >
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
                    {enabled && <DonateForm />}
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
            <Footer />
        </div>
    );
}

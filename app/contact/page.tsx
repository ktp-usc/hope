import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, HandHeart, Handshake, MapPin } from "lucide-react";
import ContactCard from "./_components/contact-card";
import { getContactEmails } from "@/sanity/lib/contact-emails";

export const metadata: Metadata = {
    title: "Contact H.O.P.E.",
    description: "Contact H.O.P.E. with general questions, partnership ideas, and non-donation support.",
};

const pathways = [
    {
        title: "Request an assistive device",
        description: "For assistive device requests, start with our dedicated help page.",
        href: "/get-help",
        action: "Go to Get Help",
        icon: HandHeart,
    },
    {
        title: "USC students",
        description: "Explore student involvement and find H.O.P.E. through Garnet Gate.",
        href: "/get-involved",
        action: "Get involved",
        icon: GraduationCap,
        secondaryHref: "https://garnetgate.sa.sc.edu/organization/hope",
        secondaryAction: "Garnet Gate",
    },
    {
        title: "H.O.P.E. alumni",
        description: "Reconnect with the H.O.P.E. alumni community.",
        href: "/alumni",
        action: "Visit alumni",
        icon: Handshake,
    },
];

export const revalidate = 60;

export default async function ContactPage() {
    const emails = await getContactEmails();
    return (
        <main className="min-h-screen bg-[#f5f2e9] text-[#121212]">
            <section className="relative bg-[#f9d46b] px-6 pb-16 pt-28 text-[#121212] sm:pb-20 sm:pt-32">
                <div className="mx-auto max-w-7xl">
                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Let’s start a conversation.</h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-[#121212]/80">
                        Have a general question, partnership idea, or another way you’d like to support H.O.P.E.? We’d be glad to hear from you.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16" aria-labelledby="pathways-title">
                <div className="mb-7 max-w-2xl">
                    <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl" id="pathways-title">Find the right starting point</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {pathways.map(({ title, description, href, action, icon: Icon, secondaryHref, secondaryAction }) => (
                        <article className="flex flex-col rounded-2xl border border-[#121212]/10 bg-white p-6" key={title}>
                            <span className="mb-5 flex size-11 items-center justify-center rounded-full bg-[#f8cd53]/45 text-[#121212]"><Icon size={22} aria-hidden="true" /></span>
                            <h3 className="text-lg font-bold">{title}</h3>
                            <p className="mt-2 flex-1 leading-6 text-[#121212]/75">{description}</p>
                            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                                <Link className="inline-flex items-center gap-1 font-semibold text-[#121212] underline decoration-[#e95c36] decoration-2 underline-offset-4 hover:text-[#121212]/65" href={href}>
                                    {action}<ArrowUpRight size={16} aria-hidden="true" />
                                </Link>
                                {secondaryHref && secondaryAction && (
                                    <a className="inline-flex items-center gap-1 font-semibold text-[#121212] underline decoration-[#e95c36] decoration-2 underline-offset-4 hover:text-[#121212]/65" href={secondaryHref} target="_blank" rel="noreferrer">
                                        {secondaryAction}<ArrowUpRight size={16} aria-hidden="true" />
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl items-start gap-8 px-6 pb-16 sm:gap-10 sm:pb-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16" aria-labelledby="contact-introduction-title">
                <div className="lg:pt-8">
                    <h2 id="contact-introduction-title" className="max-w-[18ch] text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-ink sm:text-4xl lg:text-5xl">Have something else in mind?</h2>
                    <p className="mt-5 max-w-lg text-base leading-7 text-quiet sm:text-lg sm:leading-8">Whether you have a question, a partnership idea, or another way you&apos;d like to get involved, we&apos;d love to hear from you.</p>
                    <p className="mt-6 flex items-center gap-2 text-sm text-quiet"><MapPin size={16} aria-hidden="true" />Columbia, South Carolina</p>
                </div>
                <div className="min-w-0" aria-labelledby="contact-card-title">
                    <ContactCard emails={emails} />
                </div>
            </section>
        </main>
    );
}

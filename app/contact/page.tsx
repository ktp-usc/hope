import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, HandHeart, Handshake } from "lucide-react";
import GeneralContactForm from "@/components/forms/GeneralContactForm";

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
        secondaryHref: "https://garnetgate.sa.sc.edu/",
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

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#f5f2e9] text-[#121212]">
            <section className="relative bg-[#f9d46b] px-6 pb-16 pt-28 text-[#121212] sm:pb-20 sm:pt-32">
                <Link className="absolute right-0 top-0 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#121212]" href="/" aria-label="H.O.P.E. home">
                    <Image
                        src="/hope-logo.png"
                        alt="H.O.P.E. — Hands on Prosthetic Engineering"
                        width={946}
                        height={571}
                        className="h-auto w-28 sm:w-36"
                        priority
                    />
                </Link>
                <div className="mx-auto max-w-7xl">
                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Let’s start a conversation.</h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-[#121212]/80">
                        Have a general question, partnership idea, or another way you’d like to support H.O.P.E.? We’d be glad to hear from you.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16" aria-labelledby="pathways-title">
                <div className="mb-7 max-w-2xl">
                    <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl" id="pathways-title">Looking for something specific?</h2>
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

            <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]" aria-label="Contact form">
                <div className="rounded-3xl border border-[#121212]/10 bg-[#fff8df] p-6 sm:p-9">
                    <p className="mb-8 leading-7 text-[#121212]/70">This brief form is for general questions, collaborations, media inquiries, and in-kind or material support.</p>
                    <GeneralContactForm />
                </div>

                <aside className="h-fit rounded-3xl border border-[#121212]/10 bg-white p-6 sm:p-8">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#121212]/75">Contact H.O.P.E.</p>
                    <h2 className="mt-3 text-2xl font-bold">We’re based in Columbia, South Carolina.</h2>
                    <p className="mt-4 leading-7 text-[#121212]/80">For general questions, you can also email us directly. Please do not send sensitive personal or medical information.</p>
                    <a className="mt-5 inline-block break-all font-bold text-[#121212] underline decoration-[#e95c36] decoration-2 underline-offset-4 hover:text-[#121212]/65" href="mailto:aturner@handsonhope.ngo">aturner@handsonhope.ngo</a>
                </aside>
            </section>
        </main>
    );
}

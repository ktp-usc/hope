import Link from "next/link";
import { ArrowUpRight, GraduationCap, HandHeart, Handshake } from "lucide-react";
import ContactCard from "./_components/contact-card";
import { getContactEmails } from "@/sanity/lib/contact-emails";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Contact H.O.P.E.",
  "Contact H.O.P.E. with general questions, partnership ideas, and non-donation support.",
  "/contact"
);

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
    <main className="min-h-screen bg-white text-[#1a273d]">
      {/* 1. Yellow Header Banner */}
      <section className="bg-[#f7d06b] px-6 py-12 sm:py-16 lg:py-20 text-[#1a273d]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#1a273d]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
              Contact H.O.P.E.
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-5xl lg:text-6xl leading-[1.12]">
            Let’s start a conversation.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#1a273d]/85 sm:text-lg">
            Have a general question, partnership idea, or another way you’d like to support H.O.P.E.? We’d be glad to hear from you.
          </p>
        </div>
      </section>

      {/* 2. Pathways Section */}
      <section className="border-b border-slate-100 bg-white px-6 py-14 sm:py-18 lg:py-22" aria-labelledby="pathways-title">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#f7d06b]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
                Fast Pathways
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1a273d] sm:text-3xl lg:text-4xl" id="pathways-title">
              Find the right starting point
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pathways.map(({ title, description, href, action, icon: Icon, secondaryHref, secondaryAction }) => (
              <article
                key={title}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/50 p-7 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <span className="mb-5 flex size-11 items-center justify-center rounded-xl bg-[#f7d06b] text-[#12303f] shadow-sm">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-[#1a273d]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 pt-4 border-t border-slate-200/60">
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a273d] hover:underline underline-offset-4"
                  >
                    {action}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                  {secondaryHref && secondaryAction && (
                    <a
                      href={secondaryHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#1260d6] hover:underline underline-offset-4"
                    >
                      {secondaryAction}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Direct Contact Section */}
      <section
        className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-14 sm:py-18 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-22"
        aria-labelledby="contact-introduction-title"
      >
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#f7d06b]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
              Direct Inquiries
            </span>
          </div>
          <h2
            id="contact-introduction-title"
            className="text-2xl font-bold tracking-tight text-[#1a273d] sm:text-3xl lg:text-4xl leading-tight"
          >
            Have something else in mind?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Whether you have a question, a partnership idea, or another way you&apos;d like to get involved, we&apos;d love to hear from you.
          </p>
        </div>
        <div className="min-w-0" aria-labelledby="contact-card-title">
          <ContactCard emails={emails} />
        </div>
      </section>
    </main>
  );
}

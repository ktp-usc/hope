import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import EmailContact from "@/components/contact/EmailContact";
import { getContactEmails } from "@/sanity/lib/contact-emails";
import headerImage from "@/public/images/campus-community.jpg";
import { ContributorDirectory, FormerPresidents } from "./_components/alumni-rosters";
import { pageMetadata } from "@/lib/seo";
import { getAlumniDirectory } from "@/sanity/lib/alumni";

export const metadata = pageMetadata(
  "Alumni & Legacy",
  "Reconnect with HOPE, help preserve our shared history, and recognize the people who helped build Hands on Prosthetic Engineering.",
  "/alumni"
);

export const revalidate = 60;

export default async function AlumniPage() {
  const [{ presidents, contributors }, emails] = await Promise.all([
    getAlumniDirectory(),
    getContactEmails(),
  ]);

  return (
    <main className="min-h-screen bg-white text-[#1a273d]">
      {/* 1. Yellow Split Hero */}
      <section aria-labelledby="alumni-title" className="bg-[#f7d06b] text-[#1a273d]">
        <div className="mx-auto max-w-6xl grid items-center gap-10 px-6 py-12 sm:py-16 md:grid-cols-2 md:gap-12 lg:py-20">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#1a273d]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
                Hands on Prosthetic Engineering
              </span>
            </div>
            <h1
              id="alumni-title"
              className="text-4xl font-bold tracking-tight text-[#1a273d] sm:text-5xl lg:text-6xl leading-[1.12]"
            >
              Alumni &amp;<br />Legacy
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#1a273d]/85 sm:text-lg">
              HOPE has been built by generations of members who designed projects, taught new members, developed partnerships, raised funds, and led teams. Their work, lessons, and experience help the next generation continue building.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#1a273d]/75">
              Our historical records are still being reconstructed. Stay involved, share an update, correct a record, or help preserve a missing part of HOPE&apos;s history.
            </p>
            <div className="mt-8">
              <a
                href="#reconnect"
                className="inline-flex items-center rounded-lg bg-[#1a273d] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#122038] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a273d]"
              >
                Reconnect with HOPE
                <ArrowUpRight aria-hidden="true" size={16} className="ml-1.5" />
              </a>
            </div>
          </div>

          <div className="w-full">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white bg-[#ebf3fa] shadow-sm">
              <Image
                src={headerImage}
                alt="HOPE members gathered around a project display at Big Wednesday."
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-2.5 text-center text-xs text-[#1a273d]/75 italic">
              Generations of student engineering and campus leadership
            </p>
          </div>
        </div>
      </section>

      {/* 2. Page Section Quick Navigation */}
      <nav aria-label="Alumni page sections" className="border-b border-slate-200 bg-[#faf8f5]">
        <ul className="mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-3 px-6 py-4 text-sm font-semibold text-[#1a273d] lg:px-8">
          {[
            ["#former-presidents", "Former Presidents"],
            ["#contributors", "People Who Helped Build HOPE"],
            ["#reconnect", "Reconnect with HOPE"],
          ].map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="underline-offset-4 hover:underline hover:text-[#1260d6] focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 3. Rosters */}
      <FormerPresidents records={presidents} />
      <ContributorDirectory records={contributors} />

      {/* 4. Reconnect Section */}
      <section
        id="reconnect"
        aria-labelledby="reconnect-title"
        className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:py-18 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-22"
      >
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#f7d06b]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
              Keep the connection
            </span>
          </div>
          <h2 id="reconnect-title" className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl">
            Reconnect with HOPE
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Your experience is part of our story. Help fill gaps in the record, share what you worked on, or let us know if you would like to mentor the next generation.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Contact information stays private. A public listing requires your explicit consent, verification, and staff approval.
          </p>
        </div>

        <div>
          <EmailContact
            email={emails.alumni}
            title="Reconnect by email"
            description="Share an update, a correction, or your interest in mentoring. Please avoid private details about other people."
            buttonLabel="Open alumni reconnection email"
          />
        </div>
      </section>
    </main>
  );
}

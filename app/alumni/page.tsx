import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailContact from "@/components/contact/EmailContact";
import { getContactEmails } from "@/sanity/lib/contact-emails";
import headerImage from "@/public/images/campus-community.jpg";
import { ContributorDirectory, FormerPresidents } from "./_components/alumni-rosters";
import { getAlumniDirectory } from "@/sanity/lib/alumni";

export const metadata: Metadata = {
  title: "Alumni & Legacy | H.O.P.E.",
  description: "Reconnect with HOPE, help preserve our shared history, and recognize the people who helped build Hands on Prosthetic Engineering.",
};

export const revalidate = 60;

export default async function AlumniPage() {
  const [{ presidents, contributors }, emails] = await Promise.all([
    getAlumniDirectory(),
    getContactEmails(),
  ]);
  return <main className="bg-white text-ink">
    <section aria-labelledby="alumni-title" className="grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="flex flex-col items-start bg-[#f8cd53] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-widest">Hands on Prosthetic Engineering</p>
        <h1 id="alumni-title" className="mt-6 text-6xl font-bold leading-tight tracking-tight sm:text-7xl">Alumni &amp;<br />Legacy</h1>
        <p className="mt-6 max-w-xl leading-7">HOPE has been built by generations of members who designed projects, taught new members, developed partnerships, raised funds, and led teams. Their work, lessons, and experience help the next generation continue building.</p>
        <p className="mt-4 max-w-xl leading-7">Our historical records are still being reconstructed. Stay involved, share an update, correct a record, or help preserve a missing part of HOPE&apos;s history.</p>
        <Button asChild className="mt-8 h-auto rounded-full bg-white px-6 py-4 text-ink hover:bg-paper"><a href="#reconnect">Reconnect with HOPE <ArrowUpRight aria-hidden="true" /></a></Button>
      </div>
      <div className="relative min-h-72 bg-wash sm:min-h-96"><Image src={headerImage} alt="HOPE members gathered around a project display at Big Wednesday." fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" preload /></div>
    </section>
    <nav aria-label="Alumni page sections" className="border-b border-line"><ul className="mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-4 px-6 py-6 text-sm font-semibold lg:px-8">{[["#former-presidents", "Former Presidents"], ["#contributors", "People Who Helped Build HOPE"], ["#reconnect", "Reconnect with HOPE"]].map(([href, label]) => <li key={href}><a href={href} className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{label}</a></li>)}</ul></nav>
    <FormerPresidents records={presidents} />
    <ContributorDirectory records={contributors} />
    <section id="reconnect" aria-labelledby="reconnect-title" className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
      <div><p className="text-xs font-bold uppercase tracking-widest text-quiet">Keep the connection</p><h2 id="reconnect-title" className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Reconnect with HOPE</h2><p className="mt-5 leading-7 text-quiet">Your experience is part of our story. Help fill gaps in the record, share what you worked on, or let us know if you would like to mentor the next generation.</p><p className="mt-4 leading-7 text-quiet">Contact information stays private. A public listing requires your explicit consent, verification, and staff approval.</p></div>
      <EmailContact email={emails.alumni} title="Reconnect by email" description="Share an update, a correction, or your interest in mentoring. Please avoid private details about other people." buttonLabel="Open alumni reconnection email" />
    </section>
  </main>;
}

import Image from "next/image";
import { alumniContributors, formerPresidents, sortContributors, sortPresidents } from "@/lib/alumni";

const reconnectLink = <a href="#reconnect" className="font-semibold text-hope underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Help fill a gap in our history</a>;

export function FormerPresidents() {
  const presidents = sortPresidents(formerPresidents);
  return <section id="former-presidents" aria-labelledby="presidents-title" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
    <p className="text-xs font-bold uppercase tracking-widest text-quiet">Student leadership</p>
    <h2 id="presidents-title" className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Former Presidents</h2>
    <p className="mt-5 max-w-2xl leading-7 text-quiet">Each generation of student leaders helps the next continue building. We are reconstructing this chronological record of former HOPE student organization presidents and their verified years of service.</p>
    {presidents.length ? <ol className="mt-8 border-l-2 border-sun pl-6">{presidents.map((president) => <li key={president.id} className="relative pb-8">
      <span aria-hidden="true" className="absolute -left-8 top-2 size-3 rounded-full bg-hope" />
      <p className="text-sm font-semibold text-hope">{president.serviceStart === president.serviceEnd ? president.serviceStart : `${president.serviceStart}–${president.serviceEnd}`}</p>
      <h3 className="mt-2 text-xl font-semibold">{president.name}</h3>
      {president.currentRole && <p className="mt-2 text-quiet">Current role: {president.currentRole}</p>}
    </li>)}</ol> : <div className="mt-8 rounded-2xl border border-line bg-paper p-6 sm:p-8"><h3 className="text-xl font-semibold">Help us complete the timeline.</h3><p className="mb-4 mt-3 max-w-2xl leading-7 text-quiet">No former-president records with verified service years are ready to publish yet. If you served or can help confirm a term, we would appreciate your help.</p>{reconnectLink}</div>}
  </section>;
}

export function ContributorDirectory() {
  const contributors = sortContributors(alumniContributors);
  return <section id="contributors" aria-labelledby="contributors-title" className="bg-[#f5f2e9]">
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-widest text-quiet">A shared legacy</p>
      <h2 id="contributors-title" className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">People Who Helped Build HOPE</h2>
      <p className="mt-5 max-w-2xl leading-7 text-quiet">Students, alumni, advisors, volunteers, partners, and supporters have contributed their time, ideas, skills, and leadership. This alphabetical directory is a work in progress. If you contributed and do not see your name, please reconnect and help improve the record.</p>
      <p className="mt-5 text-sm"><span className="rounded bg-ink px-1 text-sun">★</span> Indicates a former executive or senior organizational leader.</p>
      {contributors.length ? <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{contributors.map((person) => <li key={person.id} className="min-w-0 rounded-2xl border border-line bg-white p-6 break-words">
        {person.headshot && <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-xl bg-wash"><Image src={person.headshot.src} alt={person.headshot.alt} fill sizes="(min-width: 1152px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 40vw, 80vw" className="object-cover object-top" /></div>}
        <h3 className="text-xl font-semibold">{person.name}{person.formerSeniorLeader && <><span aria-hidden="true" className="ml-2 rounded bg-ink px-1 text-sun">★</span><span className="sr-only"> — Former executive or senior organizational leader</span></>}</h3>
        {person.currentRole && <p className="mt-3 leading-7 text-quiet">{person.currentRole}</p>}
        {person.contribution && <p className="mt-3 leading-7 text-quiet">{person.contribution}</p>}
      </li>)}</ul> : <div className="mt-8 rounded-2xl border border-line bg-white p-6 sm:p-8"><h3 className="text-xl font-semibold">The record starts with reconnecting.</h3><p className="mb-4 mt-3 leading-7 text-quiet">Verified contributor profiles are not yet available for publication. We welcome missing names, contributions, and corrections for review.</p>{reconnectLink}</div>}
    </div>
  </section>;
}

import Image from "next/image";
import { UserRound } from "lucide-react";
import { alumniContributors, formerPresidents, sortContributors, sortPresidents } from "@/lib/alumni";
import type { AlumniContributor, FormerPresident } from "@/lib/alumni";

const reconnectLink = (
  <a href="#reconnect" className="font-semibold text-[#1260d6] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">
    Help fill a gap in our history &rarr;
  </a>
);

function LinkedInLink({ href, name }: { href?: string; name: string }) {
  if (!href) return null;
  return (
    <p className="mt-3">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} on LinkedIn (opens in a new tab)`}
        className="text-xs font-semibold text-[#1260d6] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        LinkedIn &rarr;
      </a>
    </p>
  );
}

export function FormerPresidents({ records = formerPresidents }: { records?: readonly FormerPresident[] }) {
  const presidents = sortPresidents(records);
  return (
    <section id="former-presidents" aria-labelledby="presidents-title" className="mx-auto max-w-6xl px-6 py-14 sm:py-18 lg:py-22 lg:px-8">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-0.5 w-5 bg-[#f7d06b]" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
          Student leadership
        </span>
      </div>
      <h2 id="presidents-title" className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl lg:text-[42px] leading-tight">
        Former Presidents
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
        Each generation of student leaders helps the next continue building. We are reconstructing this chronological record of former HOPE student organization presidents and their verified years of service.
      </p>
      {presidents.length ? (
        <ol className="mt-10 border-l-2 border-[#f7d06b] pl-6 space-y-8">
          {presidents.map((president) => (
            <li key={president.id} className="relative pb-6">
              <span aria-hidden="true" className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-[#1260d6]" />
              {president.headshot && (
                <div className="relative mb-4 h-32 w-28 overflow-hidden rounded-xl bg-[#ebf3fa] border border-slate-200">
                  <Image src={president.headshot.src} alt={president.headshot.alt} fill sizes="112px" className="object-cover object-top" />
                </div>
              )}
              <span className="text-xs font-bold uppercase tracking-wider text-[#1260d6]">
                {president.displayTerm ?? (president.serviceStart === president.serviceEnd ? president.serviceStart : `${president.serviceStart}–${president.serviceEnd}`)}
              </span>
              <h3 className="mt-1 text-xl font-bold text-[#1a273d]">{president.name}</h3>
              {president.currentRole && <p className="mt-1.5 text-sm text-slate-600"><span className="font-medium text-[#1a273d]">Current role:</span> {president.currentRole}</p>}
              {president.roleOrContribution && <p className="mt-1.5 text-sm text-slate-600"><span className="font-medium text-[#1a273d]">Role or contribution:</span> {president.roleOrContribution}</p>}
              <LinkedInLink href={president.linkedInUrl} name={president.name} />
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-8 rounded-2xl border border-slate-200/80 bg-[#faf8f5] p-6 sm:p-8">
          <h3 className="text-xl font-bold text-[#1a273d]">Help us complete the timeline.</h3>
          <p className="mb-4 mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            No former-president records with verified service years are ready to publish yet. If you served or can help confirm a term, we would appreciate your help.
          </p>
          {reconnectLink}
        </div>
      )}
    </section>
  );
}

export function ContributorDirectory({ records = alumniContributors }: { records?: readonly AlumniContributor[] }) {
  const contributors = sortContributors(records);
  return (
    <section id="contributors" aria-labelledby="contributors-title" className="bg-[#faf8f5] py-14 sm:py-18 lg:py-22">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-0.5 w-5 bg-[#f7d06b]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
            A shared legacy
          </span>
        </div>
        <h2 id="contributors-title" className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl lg:text-[42px] leading-tight">
          People Who Helped Build HOPE
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
          Students, alumni, advisors, volunteers, partners, and supporters have contributed their time, ideas, skills, and leadership. This alphabetical directory is a work in progress. If you contributed and do not see your name, please reconnect and help improve the record.
        </p>
        <p className="mt-4 text-xs font-medium text-slate-500">
          <span className="rounded bg-[#1a273d] px-1.5 py-0.5 text-xs text-[#f7d06b] mr-1.5">★</span> Indicates a former executive or senior organizational leader.
        </p>
        {contributors.length ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contributors.map((person) => (
              <li key={person.id} className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md">
                {person.headshot ? (
                  <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-xl bg-[#ebf3fa] border border-slate-200">
                    <Image src={person.headshot.src} alt={person.headshot.alt} fill sizes="(min-width: 1152px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 40vw, 80vw" className="object-cover object-top" />
                  </div>
                ) : (
                  <div role="img" aria-label={`No headshot available for ${person.name}`} className="mb-5 flex aspect-[4/5] items-center justify-center rounded-xl bg-[#ebf3fa] text-slate-400">
                    <UserRound size={32} aria-hidden="true" />
                  </div>
                )}
                <h3 className="text-lg font-bold text-[#1a273d]">
                  {person.name}
                  {person.formerSeniorLeader && (
                    <>
                      <span aria-hidden="true" className="ml-2 rounded bg-[#1a273d] px-1 text-xs text-[#f7d06b]">★</span>
                      <span className="sr-only"> — Former executive or senior organizational leader</span>
                    </>
                  )}
                </h3>
                {person.yearsActive && <p className="mt-2 text-xs leading-relaxed text-slate-600"><span className="font-semibold text-[#1a273d]">Years active: </span>{person.yearsActive}</p>}
                {person.currentRole && <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{person.currentRole}</p>}
                {person.contribution && <p className="mt-1.5 text-xs leading-relaxed text-slate-600"><span className="font-semibold text-[#1a273d]">Role or contribution: </span>{person.contribution}</p>}
                <LinkedInLink href={person.linkedInUrl} name={person.name} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1a273d]">The record starts with reconnecting.</h3>
            <p className="mb-4 mt-2 text-sm leading-relaxed text-slate-600">
              Verified contributor profiles are not yet available for publication. We welcome missing names, contributions, and corrections for review.
            </p>
            {reconnectLink}
          </div>
        )}
      </div>
    </section>
  );
}

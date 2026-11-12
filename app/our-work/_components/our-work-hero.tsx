import Image from "next/image";
import { ArrowDown } from "lucide-react";
import heroTeamImg from "@/public/images/projects/12_Outdoor_Org_Fair_Team.jpg";

export default function OurWorkHero() {
  return (
    <section className="bg-[#f7d06b] px-6 py-10 sm:py-12 lg:py-14 text-[#1a273d]" aria-labelledby="our-work-title">
      <div className="mx-auto max-w-6xl grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
        <div className="max-w-xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#1a273d]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1a273d]">
              Assistive technology &amp; practical engineering
            </span>
          </div>
          <h1
            id="our-work-title"
            className="text-4xl font-bold tracking-tight text-[#1a273d] sm:text-5xl lg:text-[54px] leading-[1.1]"
          >
            Our Work
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#1a273d]/90 sm:text-lg">
            Practical needs guide hands-on engineering. HOPE Inc., an independent nonprofit, provides resources and organizational support. The separately governed HOPE student organization at USC carries out much of the hands-on design, building, and testing.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#project-process"
              className="inline-flex items-center justify-center rounded-xl bg-[#1260d9] px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-[#0f55bd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1260d9]"
            >
              Explore our process
              <ArrowDown size={17} className="ml-1.5" aria-hidden="true" />
            </a>
            <a
              href="#projects-impact"
              className="inline-flex items-center justify-center rounded-xl border border-[#1a273d]/20 bg-white/80 px-6 py-3 text-base font-semibold text-[#1a273d] shadow-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a273d]"
            >
              View featured projects
            </a>
          </div>
        </div>

        <div className="w-full">
          <div className="relative overflow-hidden rounded-2xl border-4 border-white bg-[#ebf3fa] shadow-sm">
            <Image
              src={heroTeamImg}
              alt="HOPE student organization members at the outdoor organization fair showcasing student projects and campus outreach"
              priority
              className="block aspect-[4/3] h-auto w-full object-cover"
              sizes="(max-width: 900px) 100vw, 540px"
            />
          </div>
          <p className="mt-2.5 text-center text-xs text-[#1a273d]/75 italic">
            USC student members showcasing hands-on builds at the campus organization fair
          </p>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroTeamImg from "@/public/images/projects/12_Outdoor_Org_Fair_Team.jpg";

export default function OurWorkHero() {
  return (
    <section className="bg-[#ffd84d] py-16 lg:py-22" aria-labelledby="our-work-title">
      <div className="mx-auto w-[calc(100%-48px)] max-w-[1280px] grid items-center gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div className="max-w-[640px]">
          <p className="mb-2 inline-block text-xs font-bold tracking-[0.8px] text-[#102743] uppercase opacity-85">Assistive technology &amp; practical engineering</p>
          <h1 id="our-work-title" className="mt-4 mb-5 [font-family:var(--font-dm-serif),Georgia,serif] text-[clamp(48px,6vw,76px)] leading-[1.05] font-normal tracking-[-0.5px] text-[#102743]">Our Work</h1>
          <p className="text-lg leading-[1.6] text-[#102743] opacity-92">
            Practical needs guide hands-on engineering. HOPE Inc., an
            independent nonprofit, provides resources and organizational support.
            The separately governed HOPE student organization at USC carries
            out much of the hands-on design, building, and testing.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild className="h-auto min-h-12 gap-2.5 rounded-[40px] border-0 bg-[#102743] px-6 py-3.5 [font-family:inherit] text-sm leading-[1.4] font-bold whitespace-normal text-white no-underline [transition:opacity_0.2s_ease,transform_0.15s_ease] hover:[transform:translateY(-1px)] hover:bg-[#102743] hover:opacity-90 has-[>svg]:px-6">
              <a href="#project-process">
                Explore our process <ArrowDown size={16} aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" className="h-auto min-h-12 rounded-[40px] border-2 border-[#102743] bg-transparent px-6 py-3.5 [font-family:inherit] text-sm font-bold text-[#102743] no-underline [transition:background_0.2s_ease] hover:bg-[rgba(16,39,67,0.08)] focus-visible:border-[#102743] dark:border-[#102743] dark:bg-transparent dark:hover:bg-[rgba(16,39,67,0.08)]">
              <a href="#projects-impact">View featured projects</a>
            </Button>
          </div>
        </div>
        <div className="w-full max-w-[560px] justify-self-center lg:max-w-[520px] lg:justify-self-end">
          <div className="relative overflow-hidden rounded-[20px] border-4 border-white bg-[#eaeef4] shadow-[0_16px_36px_-8px_rgba(16,39,67,0.22)]">
            <Image
              src={heroTeamImg}
              alt="HOPE student organization members at the outdoor organization fair showcasing student projects and campus outreach"
              priority
              className="block aspect-[4/3] h-auto w-full object-cover"
              sizes="(max-width: 900px) 100vw, 540px"
            />
          </div>
          <p className="mt-2.5 text-center text-[13px] text-[#102743] italic opacity-80">
            USC student members showcasing hands-on builds at the campus organization fair
          </p>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, FileBadge } from "lucide-react";
import TimelineReveal from "./timeline-reveal";
import workshop from "./history-images/14_Big_Wednesday_Team.jpg";
import hand from "./history-images/08_HOPE_Printed_Hand.png";
import fair from "./history-images/12_Outdoor_Org_Fair_Team.jpg";
import shields from "./history-images/09_HOPE_Face_Shield_Frames.png";
import team from "./history-images/13_Creativibe_Display_Team.jpg";
import eli from "./history-images/02_Eli_On_Bicycle.jpg";
import detail from "./history-images/01_Eli_Bike_Arm_Detail.jpg";
import assembly from "./history-images/04_Eli_Bike_Assembly.jpg";

export const metadata: Metadata = {
  title: "Our History | H.O.P.E.",
  description: "From 3D-printed hands to a broader engineering mission. Explore the people, projects, and milestones that shaped H.O.P.E.",
};

interface Milestone {
  period: string;
  title: string;
  image: typeof fair | null;
  alt: string;
  color: string;
  description: string;
  href?: string;
}

// Photographs illustrate milestones; their placement does not date the photographs.
const milestones: Milestone[] = [
  { period: "2016", title: "Where It All Began", image: fair, alt: "H.O.P.E. members at an outdoor organization fair", color: "blue", description: "In 2016, the H.O.P.E. student organization was established at the University of South Carolina. Students began exploring how 3D printing could create prosthetic hands and upper-limb solutions for children, laying the foundation for a community of learning, collaboration, and service.", href: "/stories/hands-on-beginnings" },
  { period: "2017", title: "Building Something That Lasts", image: null, alt: "", color: "red", description: "In 2017, H.O.P.E. Inc. was incorporated as a separate South Carolina nonprofit organization to provide greater continuity, resources, organizational support, and external relationships beyond individual student leadership cycles. The nonprofit and USC student organization developed separate but complementary roles." },
  { period: "COVID-19", title: "Engineering Through a Crisis", image: shields, alt: "Colorful 3D-printed face-shield frames produced by H.O.P.E.", color: "purple", description: "During the COVID-19 response, H.O.P.E. members redirected their 3D-printing capabilities toward producing mask extenders and face-shield components. Working alongside a University of South Carolina professor and graduate students, members applied their design and fabrication skills to a different community need.", href: "/stories/ppe-response" },
  { period: "Today", title: "A Broader Engineering Mission", image: team, alt: "H.O.P.E. members with their organization’s project display", color: "blue", description: "Today, H.O.P.E. continues building on its roots through experimental prosthetic devices, task-specific assistive technologies, adaptive designs, accessibility solutions, student training, community service, and partnerships with other institutions and organizations." },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
      <span className="h-1 w-9 shrink-0 rounded-full bg-[#e95c36]" aria-hidden="true" />
      {children}
    </p>
  );
}

function Dinosaur() {
  return (
    <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 68c22 7 35-5 45-18l11-12 6-23c3-10 15-11 23-7l12 9-5 10-14-1-7 26 8 12-8 7-9-10-8 10 1 17H51l-2-13-13 1-7 10H17l7-15Z" />
      <path d="m66 40 12 4 11-7m-39 22 8 6m20-52 3-2m8 7h1M18 67l-12-7" />
    </svg>
  );
}

export default function HistoryPage() {
  return (
    <main className="bg-white text-ink">
      <header className="grid overflow-hidden bg-sun lg:grid-cols-[1.08fr_0.92fr]" aria-labelledby="history-title">
        <div className="flex flex-col items-start justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-[max(3rem,calc((100vw-75rem)/2))] lg:py-16">
          <SectionLabel>Our story</SectionLabel>
          <h1 id="history-title" className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Built by students.<br />Driven by possibility.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">
            What began as a student effort to create 3D-printed prosthetic hands has grown into a broader mission of hands-on engineering, practical problem-solving, and community impact. Explore the people, projects, and milestones that shaped H.O.P.E.
          </p>
          <a className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-xl bg-hope px-6 text-sm font-bold text-white transition-colors hover:bg-hope-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink" href="#timeline">
            Explore our history <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="relative min-h-72 overflow-hidden sm:min-h-96">
          <Image src={workshop} alt="H.O.P.E. students gathered around engineering equipment in a workshop" fill preload sizes="(max-width: 850px) 100vw, 50vw" className="object-cover object-center" />
        </div>
      </header>

      <section className="mx-auto grid w-[82%] max-w-[1180px] items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16" aria-labelledby="intro-title">
        <div>
          <SectionLabel>Where it started</SectionLabel>
          <h2 id="intro-title" className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            From 3D-printed hands to a broader engineering mission.
          </h2>
          <p className="mt-5 leading-7 text-quiet">H.O.P.E. began at the University of South Carolina with students interested in using 3D printing to create prosthetic hands and other upper-limb solutions for children. Early work focused on printing, assembling, fitting, and adapting designs shared through the open-source prosthetics community.</p>
          <p className="mt-4 leading-7 text-quiet">As students developed their skills, the organization began exploring more customized solutions, expanding beyond existing designs to address individual needs through prototyping, testing, and iterative engineering.</p>
        </div>
        <div className="relative mx-auto w-full max-w-xl py-6 lg:pl-4">
          <div className="relative aspect-[1.5] overflow-hidden rounded-2xl">
            <Image src={hand} alt="A white 3D-printed prosthetic hand on a wooden table" fill sizes="(max-width: 850px) 90vw, 40vw" className="object-cover" />
          </div>
          <p className="absolute -right-2 -top-1 rounded-2xl bg-[#ede2fd] px-5 py-4 text-base font-semibold leading-6 sm:-right-8 sm:px-7 sm:py-6 sm:text-lg">Student-driven.<br />Community-focused.<br />Real-world impact.</p>
        </div>
      </section>

      <section id="timeline" className="scroll-mt-6 bg-wash py-12 sm:py-16" aria-labelledby="timeline-title">
        <div className="mx-auto w-[82%] max-w-[1180px]">
          <SectionLabel>Our timeline</SectionLabel>
          <h2 id="timeline-title" className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Key moments in H.O.P.E.’s journey.
          </h2>
          <p className="mt-4 mb-8 max-w-4xl text-lg leading-7 text-quiet">
            From a student organization to a broader engineering mission, here are some of the milestones that have shaped our work, our community, and our impact.
          </p>
          <TimelineReveal>
            <ol className="grid gap-6 md:grid-cols-2" role="list">
              {milestones.map(({ period, title, image, alt, color, description, href }) => {
                const accent = color === "red" ? "text-[#e94e26]" : color === "purple" ? "text-purple-700" : "text-hope";
                return (
                  <li key={period} className="grid min-w-0 content-start gap-4 rounded-2xl border border-white/80 bg-white p-4 shadow-sm opacity-25 translate-y-3 transition-all duration-500 sm:p-5">
                    <div className="relative aspect-[1.9] min-w-0 overflow-hidden rounded-xl bg-[#fff4d6]">
                      {image ? (
                        href ? (
                          <Link href={href} aria-label={`${title} story`} className="absolute inset-0">
                            <Image src={image} alt={alt} unoptimized={image === shields} fill sizes="(max-width: 850px) 85vw, 42vw" className="object-cover" />
                          </Link>
                        ) : (
                          <Image src={image} alt={alt} unoptimized={image === shields} fill sizes="(max-width: 850px) 85vw, 42vw" className="object-cover" />
                        )
                      ) : (
                        <div className="flex h-full items-center gap-5 p-5 sm:p-7">
                          <FileBadge size={76} strokeWidth={1.25} className="shrink-0" aria-hidden="true" />
                          <div>
                            <h3 className="text-lg font-bold leading-tight">A stronger foundation<br />for a bigger impact.</h3>
                            <p className="mt-2 text-sm leading-5">H.O.P.E. Inc. was established to expand our reach, resources, and long-term sustainability.</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className={`text-2xl font-bold leading-none ${accent}`}>{period}</p>
                      <h3 className="mt-2 text-xl font-bold">
                        {href ? <Link href={href} className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hope">{title}</Link> : title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-quiet sm:text-base">{description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </TimelineReveal>
        </div>
      </section>

      <section className="bg-paper py-12 sm:py-16" aria-labelledby="featured-title">
        <div className="mx-auto grid w-[88%] max-w-[1268px] items-start gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionLabel>Featured story · 2017–2018</SectionLabel>
            <h2 id="featured-title" className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Engineering for the Individual</h2>
            <h3 className="mt-3 text-2xl font-bold"><Link href="/stories/elis-bike-arm" className="hover:underline">Eli’s Bike Arm</Link></h3>
            <p className="mt-5 text-lg leading-7 text-quiet">As H.O.P.E.’s capabilities grew, students began developing more customized solutions. Eli’s Bike Arm became an early example of task-specific engineering, adding a point of contact and counterforce to help Eli ride his bicycle.</p>
            <p className="mt-4 text-lg leading-7 text-quiet">Research began in 2017, with a prototype fitted in spring 2018. Continued development included a telescoping arm socket. Through iterative design and testing, Eli was able to ride the adapted bicycle through his neighborhood.</p>
            <aside className="mt-6 flex items-center gap-5 rounded-3xl bg-[#ffe28c] p-5 sm:p-7">
              <Dinosaur />
              <div><h4 className="text-lg font-bold">A design with personality.</h4><p className="mt-2 leading-6">Its shape resembled a dinosaur arm, leading to the nickname “Elijasaur.”</p></div>
            </aside>
          </div>
          <div className="grid min-w-0 gap-3">
            <Link href="/stories/elis-bike-arm" aria-label="Eli smiling on his adapted bicycle with the custom bike arm attached" className="overflow-hidden rounded-2xl">
              <Image src={eli} alt="Eli smiling on his adapted bicycle with the custom bike arm attached" sizes="(max-width: 850px) 90vw, 45vw" className="aspect-video h-auto w-full object-contain" />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/stories/elis-bike-arm" aria-label="Detail of the colorful custom bike-arm attachment" className="overflow-hidden rounded-xl">
                <Image src={detail} alt="Detail of the colorful custom bike-arm attachment" sizes="(max-width: 850px) 44vw, 23vw" className="aspect-[1.35] h-auto w-full object-cover" />
              </Link>
              <Link href="/stories/elis-bike-arm" aria-label="Bike-arm components and tools laid out for assembly" className="overflow-hidden rounded-xl">
                <Image src={assembly} alt="Bike-arm components and tools laid out for assembly" sizes="(max-width: 850px) 44vw, 23vw" className="aspect-[1.35] h-auto w-full object-cover" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

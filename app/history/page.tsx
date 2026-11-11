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
import MediaMilestones from "@/components/about/MediaMilestones";
import { mediaMilestones } from "./media-milestones";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Our History",
  "From 3D-printed hands to a broader engineering mission. Explore the people, projects, and milestones that shaped H.O.P.E.",
  "/history"
);

interface Milestone {
  period: string;
  title: string;
  image: typeof fair | null;
  alt: string;
  color: "blue" | "red" | "purple";
  description: string;
  href?: string;
}

const milestones: Milestone[] = [
  {
    period: "2016",
    title: "Where It All Began",
    image: fair,
    alt: "H.O.P.E. members at an outdoor organization fair",
    color: "blue",
    description:
      "In 2016, the H.O.P.E. student organization was established at the University of South Carolina. Students began exploring how 3D printing could create prosthetic hands and upper-limb solutions for children, laying the foundation for a community of learning, collaboration, and service.",
    href: "/stories/hands-on-beginnings",
  },
  {
    period: "2017",
    title: "Building Something That Lasts",
    image: null,
    alt: "",
    color: "red",
    description:
      "In 2017, H.O.P.E. Inc. was incorporated as a separate South Carolina nonprofit organization to provide greater continuity, resources, organizational support, and external relationships beyond individual student leadership cycles. The nonprofit and USC student organization developed separate but complementary roles.",
  },
  {
    period: "COVID-19",
    title: "Engineering Through a Crisis",
    image: shields,
    alt: "Colorful 3D-printed face-shield frames produced by H.O.P.E.",
    color: "purple",
    description:
      "During the COVID-19 response, H.O.P.E. members redirected their 3D-printing capabilities toward producing mask extenders and face-shield components. Working alongside a University of South Carolina professor and graduate students, members applied their design and fabrication skills to an urgent community need.",
    href: "/stories/ppe-response",
  },
  {
    period: "Today",
    title: "A Broader Engineering Mission",
    image: team,
    alt: "H.O.P.E. members with their organization’s project display",
    color: "blue",
    description:
      "Today, H.O.P.E. continues building on its roots through experimental prosthetic devices, task-specific assistive technologies, adaptive designs, accessibility solutions, student training, community service, and partnerships with other institutions and organizations.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span aria-hidden="true" className="h-0.5 w-5 bg-[#f7d06b]" />
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
        {children}
      </span>
    </div>
  );
}

function Dinosaur() {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 w-20 max-w-[80px] text-[#1a273d]"
    >
      <path d="M9 68c22 7 35-5 45-18l11-12 6-23c3-10 15-11 23-7l12 9-5 10-14-1-7 26 8 12-8 7-9-10-8 10 1 17H51l-2-13-13 1-7 10H17l7-15Z" />
      <path d="m66 40 12 4 11-7m-39 22 8 6m20-52 3-2m8 7h1M18 67l-12-7" />
    </svg>
  );
}

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-white text-[#1a273d] motion-safe:scroll-smooth">
      {/* 1. Yellow Split Hero */}
      <section className="bg-[#f7d06b] px-6 py-12 sm:py-16 lg:py-20 text-[#1a273d]" aria-labelledby="history-title">
        <div className="mx-auto max-w-6xl grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#1a273d]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
                Our story
              </span>
            </div>
            <h1
              id="history-title"
              className="text-4xl font-bold tracking-tight text-[#1a273d] sm:text-5xl lg:text-6xl leading-[1.12]"
            >
              Built by students.<br />Driven by possibility.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#1a273d]/85 sm:text-lg">
              What began as a student effort to create 3D-printed prosthetic hands has grown into a broader mission of hands-on engineering, practical problem-solving, and community impact. Explore the people, projects, and milestones that shaped H.O.P.E.
            </p>
            <div className="mt-8">
              <a
                href="#timeline"
                className="inline-flex items-center rounded-lg bg-[#1a273d] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#122038] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a273d]"
              >
                Explore our timeline
                <ArrowDown size={15} className="ml-1.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="w-full">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white bg-[#ebf3fa] shadow-sm">
              <Image
                src={workshop}
                alt="H.O.P.E. members gathered around a project display at Big Wednesday"
                fill
                priority
                sizes="(max-width: 850px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <p className="mt-2.5 text-center text-xs text-[#1a273d]/75 italic">
              USC members showcasing hands-on builds at Big Wednesday
            </p>
          </div>
        </div>
      </section>

      {/* 2. Introduction Section */}
      <section
        className="mx-auto max-w-6xl px-6 py-14 sm:py-18 lg:py-22 grid items-center gap-10 md:grid-cols-2 md:gap-14"
        aria-labelledby="intro-title"
      >
        <div>
          <SectionLabel>Where it started</SectionLabel>
          <h2
            id="intro-title"
            className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl leading-tight"
          >
            From 3D-printed hands to a broader engineering mission.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            H.O.P.E. began at the University of South Carolina with students interested in using 3D printing to create prosthetic hands and other upper-limb solutions for children. Early work focused on printing, assembling, fitting, and adapting designs shared through the open-source prosthetics community.
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            As students developed their skills, the organization began exploring more customized solutions, expanding beyond existing designs to address individual needs through prototyping, testing, and iterative engineering.
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-[#ebf3fa] shadow-sm">
            <Image
              src={hand}
              alt="A white 3D-printed prosthetic hand on a wooden table"
              fill
              sizes="(max-width: 850px) 90vw, 40vw"
              className="object-cover object-center"
            />
          </div>
          <div className="mt-4 rounded-xl border border-[#d6e7f5] bg-[#ebf3fa] p-4 text-center">
            <p className="text-sm font-bold text-[#1a273d]">
              Student-driven &middot; Community-focused &middot; Real-world impact
            </p>
          </div>
        </div>
      </section>

      {/* 3. Timeline Section */}
      <section
        id="timeline"
        className="bg-[#ebf3fa] px-6 py-14 sm:py-18 lg:py-22 scroll-mt-6"
        aria-labelledby="timeline-title"
      >
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Our timeline</SectionLabel>
          <h2
            id="timeline-title"
            className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl lg:text-[42px] leading-tight"
          >
            Key moments in H.O.P.E.’s journey.
          </h2>
          <p className="mt-4 mb-10 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            From a student organization to a broader engineering mission, here are milestones that shaped our work and community.
          </p>

          <TimelineReveal>
            <ol className="list-none p-0 m-0 grid gap-8">
              {milestones.map(({ period, title, image, alt, description, href }) => {
                return (
                  <li
                    key={period}
                    className="grid items-stretch gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm md:grid-cols-[140px_1fr_auto]"
                  >
                    <div className="flex md:flex-col justify-between items-start">
                      <span className="text-2xl sm:text-3xl font-bold text-[#1260d6]">
                        {period}
                      </span>
                      <span className="hidden md:inline-block size-3 rounded-full bg-[#f7d06b] mt-3" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1a273d]">
                        {href ? (
                          <Link href={href} className="hover:text-[#1260d6] hover:underline">
                            {title}
                          </Link>
                        ) : (
                          title
                        )}
                      </h3>
                      <p className="mt-2.5 text-base leading-relaxed text-slate-700">
                        {description}
                      </p>
                      {href && (
                        <Link
                          href={href}
                          className="mt-4 inline-flex items-center text-sm font-semibold text-[#1260d6] hover:underline"
                        >
                          Read milestone story &rarr;
                        </Link>
                      )}
                    </div>

                    {image ? (
                      <div className="relative aspect-[4/3] w-full md:w-48 overflow-hidden rounded-xl bg-slate-100 shrink-0">
                        <Image
                          src={image}
                          alt={alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 200px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex size-14 md:size-20 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#1a273d]">
                        <FileBadge size={32} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </TimelineReveal>
        </div>
      </section>

      {/* 4. Featured Story Section: Eli Bike Arm */}
      <section className="bg-[#faf8f5] px-6 py-14 sm:py-18 lg:py-22" aria-labelledby="featured-title">
        <div className="mx-auto max-w-6xl grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>Featured story &middot; 2017–2018</SectionLabel>
            <h2
              id="featured-title"
              className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl leading-tight"
            >
              Engineering for the Individual: Eli’s Bike Arm
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              As H.O.P.E.’s capabilities grew, students began developing more customized solutions. Eli’s Bike Arm became an early example of task-specific engineering, adding a point of contact and counterforce to help Eli ride his bicycle.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Research began in 2017, with a prototype fitted in spring 2018. Through iterative design and testing, Eli was able to ride his bicycle through his neighborhood.
            </p>

            <div className="mt-6 flex items-center gap-4 rounded-xl border border-amber-200/80 bg-[#f7d06b]/20 p-5">
              <Dinosaur />
              <div>
                <h3 className="text-base font-bold text-[#1a273d]">
                  A design with personality
                </h3>
                <p className="text-xs text-slate-700 mt-1">
                  Its profile resembled a dinosaur arm, leading to the nickname “Elijasaur.”
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/stories/elis-bike-arm"
                className="inline-flex items-center rounded-lg bg-[#f7d06b] px-5 py-2.5 text-sm font-semibold text-[#12303f] shadow-sm transition hover:bg-[#f3c64f]"
              >
                Read Full Story
              </Link>
            </div>
          </div>

          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image
                src={eli}
                alt="Eli smiling on his adapted bicycle with the custom bike arm attached"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200">
                <Image
                  src={detail}
                  alt="Detail of the colorful custom bike-arm attachment"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200">
                <Image
                  src={assembly}
                  alt="Bike-arm components and tools laid out for assembly"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Media & Milestones */}
      <MediaMilestones milestones={mediaMilestones} />
    </main>
  );
}

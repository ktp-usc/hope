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

export const metadata = pageMetadata("Our History", "From 3D-printed hands to a broader engineering mission. Explore the people, projects, and milestones that shaped H.O.P.E.", "/history");

interface Milestone {
  period: string;
  title: string;
  image: typeof fair | null;
  alt: string;
  color: "blue" | "red" | "purple";
  description: string;
  href?: string;
}

// Photographs illustrate milestones; their placement does not date the photographs.
const milestones: Milestone[] = [
  {
    period: "2016",
    title: "Where It All Began",
    image: fair,
    alt: "H.O.P.E. members at an outdoor organization fair",
    color: "blue",
    description: "In 2016, the H.O.P.E. student organization was established at the University of South Carolina. Students began exploring how 3D printing could create prosthetic hands and upper-limb solutions for children, laying the foundation for a community of learning, collaboration, and service.",
    href: "/stories/hands-on-beginnings",
  },
  {
    period: "2017",
    title: "Building Something That Lasts",
    image: null,
    alt: "",
    color: "red",
    description: "In 2017, H.O.P.E. Inc. was incorporated as a separate South Carolina nonprofit organization to provide greater continuity, resources, organizational support, and external relationships beyond individual student leadership cycles. The nonprofit and USC student organization developed separate but complementary roles.",
  },
  {
    period: "COVID-19",
    title: "Engineering Through a Crisis",
    image: shields,
    alt: "Colorful 3D-printed face-shield frames produced by H.O.P.E.",
    color: "purple",
    description: "During the COVID-19 response, H.O.P.E. members redirected their 3D-printing capabilities toward producing mask extenders and face-shield components. Working alongside a University of South Carolina professor and graduate students, members applied their design and fabrication skills to a different community need.",
    href: "/stories/ppe-response",
  },
  {
    period: "Today",
    title: "A Broader Engineering Mission",
    image: team,
    alt: "H.O.P.E. members with their organization’s project display",
    color: "blue",
    description: "Today, H.O.P.E. continues building on its roots through experimental prosthetic devices, task-specific assistive technologies, adaptive designs, accessibility solutions, student training, community service, and partnerships with other institutions and organizations.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-4 text-[12px] font-bold uppercase mb-[22px] m-0">
      <span aria-hidden="true" className="w-[36px] h-[5px] bg-[#e94e26] rounded-[4px] shrink-0" />
      {children}
    </p>
  );
}

function HeroAccents() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-[4%] top-[14%] -z-[1] w-[55px] h-[75px] pointer-events-none max-[1100px]:opacity-50"
    >
      <span className="absolute block w-[46px] h-[10px] rounded-[8px] bg-[#e94e26] -rotate-[60deg]" />
      <span className="absolute block w-[46px] h-[10px] rounded-[8px] bg-[#c59ce9] top-[40px] left-[15px] -rotate-[18deg]" />
    </div>
  );
}

function OriginLeftAccents() {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[20px] top-[22%] w-[55px] h-[75px] pointer-events-none"
    >
      <span className="absolute block w-[46px] h-[10px] rounded-[8px] bg-[#e94e26] rotate-[25deg]" />
      <span className="absolute block w-[46px] h-[10px] rounded-[8px] bg-[#f8cd53] top-[40px] left-[15px] -rotate-[20deg]" />
    </div>
  );
}

function OriginRightAccents() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-0 top-[60%] w-[55px] h-[75px] pointer-events-none"
    >
      <span className="absolute block w-[46px] h-[10px] rounded-[8px] bg-[#f8cd53] -rotate-[20deg]" />
      <span className="absolute block w-[46px] h-[10px] rounded-[8px] bg-[#3880e7] top-[40px] left-[15px] rotate-[30deg]" />
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
      className="shrink-0 w-[110px] max-[1100px]:w-[80px] max-[380px]:w-[60px]"
    >
      <path d="M9 68c22 7 35-5 45-18l11-12 6-23c3-10 15-11 23-7l12 9-5 10-14-1-7 26 8 12-8 7-9-10-8 10 1 17H51l-2-13-13 1-7 10H17l7-15Z" />
      <path d="m66 40 12 4 11-7m-39 22 8 6m20-52 3-2m8 7h1M18 67l-12-7" />
    </svg>
  );
}

export default function HistoryPage() {
  return (
    <main className="text-[#11182e] bg-white font-[Arial,Helvetica,sans-serif] text-[16px] leading-[1.35] motion-safe:scroll-smooth">
      {/* Hero Section */}
      <section
        className="grid grid-cols-[54%_46%] max-[850px]:grid-cols-1 bg-[#f8cd53] overflow-hidden"
        aria-labelledby="history-title"
      >
        <div className="pt-[42px] pr-[60px] pb-[38px] pl-[max(28px,calc((100vw-min(80vw,1180px))/2))] max-[1100px]:pl-[7vw] max-[1100px]:pr-[30px] max-[850px]:px-[7%] max-[850px]:py-[38px] max-[380px]:px-[5%] relative isolate">
          <SectionLabel>Our story</SectionLabel>
          <h1
            id="history-title"
            className="m-0 font-bold leading-[1.08] text-[clamp(36px,3.8vw,54px)] tracking-[-1px]"
          >
            Built by students.<br />Driven by possibility.
          </h1>
          <p className="m-0 max-w-[530px] mt-4">
            What began as a student effort to create 3D-printed prosthetic hands has grown into a broader mission of hands-on engineering, practical problem-solving, and community impact. Explore the people, projects, and milestones that shaped H.O.P.E.
          </p>
          <a
            className="inline-flex items-center justify-center gap-[18px] px-[26px] py-[15px] min-h-[48px] rounded-[17px] text-[15px] font-bold no-underline whitespace-nowrap border border-transparent disabled:cursor-not-allowed focus-visible:outline-3 focus-visible:outline-[#11182e] focus-visible:outline-offset-[5px] motion-safe:transition-[transform,filter] motion-safe:duration-200 hover:brightness-95 hover:-translate-y-0.5 bg-[#1260d9] text-white mt-[22px]"
            href="#timeline"
          >
            Explore our history <ArrowDown size={18} aria-hidden="true" />
          </a>
          <HeroAccents />
        </div>
        <div className="relative min-h-[380px] -ml-[20px] [clip-path:polygon(0_0,100%_0,100%_100%,7%_100%)] max-[850px]:min-h-[320px] max-[850px]:ml-0 max-[850px]:[clip-path:none] max-[380px]:min-h-[260px]">
          <Image
            src={workshop}
            alt="H.O.P.E. students gathered around engineering equipment in a workshop"
            fill
            preload
            sizes="(max-width: 850px) 100vw, 50vw"
            className="object-cover [object-position:center_25%]"
          />
        </div>
      </section>

      {/* Introduction Section */}
      <section
        className="mx-auto w-[82%] max-w-[1180px] max-[1100px]:w-[86%] max-[380px]:w-[90%] grid grid-cols-2 max-[850px]:grid-cols-1 gap-[65px] max-[1100px]:gap-[35px] max-[850px]:gap-[35px] py-[38px] max-[850px]:pt-[36px] max-[850px]:pb-[48px] items-center"
        aria-labelledby="intro-title"
      >
        <div>
          <SectionLabel>Where it started</SectionLabel>
          <h2
            id="intro-title"
            className="m-0 font-bold leading-[1.08] text-[clamp(29px,2.7vw,38px)] tracking-[-0.7px] mb-4"
          >
            From 3D-printed hands to a broader engineering mission.
          </h2>
          <p className="m-0">
            H.O.P.E. began at the University of South Carolina with students interested in using 3D printing to create prosthetic hands and other upper-limb solutions for children. Early work focused on printing, assembling, fitting, and adapting designs shared through the open-source prosthetics community.
          </p>
          <p className="m-0 mt-[14px]">
            As students developed their skills, the organization began exploring more customized solutions, expanding beyond existing designs to address individual needs through prototyping, testing, and iterative engineering.
          </p>
        </div>
        <div className="relative mr-[15px] max-[850px]:mr-[15px] max-[850px]:mt-[10px]">
          <div className="relative h-[300px] max-[850px]:h-auto max-[850px]:aspect-[1.5] w-[92%] rounded-[20px] overflow-hidden">
            <Image
              src={hand}
              alt="A white 3D-printed prosthetic hand on a wooden table"
              fill
              sizes="(max-width: 850px) 90vw, 40vw"
              className="object-cover object-center"
            />
          </div>
          <p className="m-0 absolute -right-[45px] max-[1100px]:-right-[20px] max-[850px]:-right-[15px] -top-[10px] p-[28px_30px] max-[1100px]:p-[22px] max-[380px]:p-[16px] rounded-[18px] bg-[#ede2fd] text-[19px] max-[1100px]:text-[17px] max-[380px]:text-[15px] leading-[1.3]">
            Student-driven.<br />Community-focused.<br />Real-world impact.
          </p>
          <OriginLeftAccents />
          <OriginRightAccents />
        </div>
      </section>

      {/* Timeline Section */}
      <section
        id="timeline"
        className="bg-[#e7f4fd] py-[36px] pb-[42px] scroll-mt-5"
        aria-labelledby="timeline-title"
      >
        <div className="mx-auto w-[82%] max-w-[1180px] max-[1100px]:w-[86%] max-[380px]:w-[90%]">
          <SectionLabel>Our timeline</SectionLabel>
          <h2
            id="timeline-title"
            className="m-0 font-bold leading-[1.08] text-[clamp(29px,2.7vw,38px)] tracking-[-0.7px]"
          >
            Key moments in H.O.P.E.’s journey.
          </h2>
          <p className="m-0 mt-[14px] mb-[28px] max-w-[1000px] text-[18px]">
            From a student organization to a broader engineering mission, here are some of the milestones that have shaped our work, our community, and our impact.
          </p>
          <TimelineReveal>
            <ol className="list-none p-0 m-0 grid gap-[22px] max-[850px]:pl-[30px] max-[850px]:gap-8">
              {milestones.map(({ period, title, image, alt, color, description, href }, idx) => {
                const isEven = idx % 2 === 1; // 0: 2016 (odd), 1: 2017 (even), 2: COVID (odd), 3: Today (even)
                const isLast = idx === milestones.length - 1;

                const accentColor =
                  color === "red"
                    ? "bg-[#e94e26] text-[#e94e26]"
                    : color === "purple"
                    ? "bg-[#7829bb] text-[#7829bb]"
                    : "bg-[#1260d9] text-[#1260d9]";
                const accentBg = accentColor.split(" ")[0];
                const accentText = accentColor.split(" ")[1];

                const cardBg =
                  idx === 1
                    ? "bg-[#fff4d6]"
                    : idx === 3
                    ? "bg-[#d3ebfc]"
                    : "bg-[#ffffffd9]";

                // Speech bubble arrow classes
                const arrow =
                  idx === 0 || idx === 2
                    ? "absolute top-[24px] -left-[14px] w-0 h-0 border-y-[10px] border-y-transparent border-r-[15px] border-r-[#ffffffd9] pointer-events-none"
                    : idx === 1
                    ? "absolute top-[24px] pointer-events-none w-0 h-0 border-y-[10px] border-y-transparent -left-[14px] border-r-[15px] border-r-[#fff4d6] min-[851px]:left-auto min-[851px]:-right-[14px] min-[851px]:border-r-0 min-[851px]:border-l-[15px] min-[851px]:border-l-[#fff4d6]"
                    : "absolute top-[24px] pointer-events-none w-0 h-0 border-y-[10px] border-y-transparent -left-[14px] border-r-[15px] border-r-[#d3ebfc] min-[851px]:left-auto min-[851px]:-right-[14px] min-[851px]:border-r-0 min-[851px]:border-l-[15px] min-[851px]:border-l-[#d3ebfc]";

                const visualColClass = isEven
                  ? "min-[851px]:col-start-2 min-[851px]:row-start-1 max-[850px]:col-start-1 max-[850px]:row-start-2"
                  : "min-[851px]:col-start-1 min-[851px]:row-start-1 max-[850px]:col-start-1 max-[850px]:row-start-2";
                const copyColClass = isEven
                  ? "min-[851px]:col-start-1 min-[851px]:row-start-1 max-[850px]:col-start-1 max-[850px]:row-start-1"
                  : "min-[851px]:col-start-2 min-[851px]:row-start-1 max-[850px]:col-start-1 max-[850px]:row-start-1";

                return (
                  <li
                    key={period}
                    className="relative grid grid-cols-2 max-[850px]:grid-cols-1 gap-x-[76px] max-[1100px]:gap-x-[60px] max-[850px]:gap-y-[14px] items-stretch"
                  >
                    {/* Vertical connecting line */}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 max-[850px]:left-[-21px] top-[18px] -bottom-[40px] max-[850px]:-bottom-[52px] w-[2px] bg-[#9eb9d7] pointer-events-none"
                      />
                    )}

                    {/* Circular marker */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-[calc(50%-12px)] max-[850px]:left-[-33px] top-[20px] w-[26px] h-[26px] ${accentBg} border-2 border-white rounded-full z-[2]`}
                    />

                    {/* Visual box */}
                    <div
                      className={`relative min-h-[200px] max-[850px]:min-h-0 ${
                        idx === 1 ? "max-[850px]:min-h-[190px] max-[850px]:aspect-auto" : "max-[850px]:aspect-[1.9]"
                      } rounded-[18px] overflow-hidden ${visualColClass}`}
                    >
                      {image ? (
                        href ? (
                          <Link
                            href={href}
                            aria-label={`${title} story`}
                            className="block absolute inset-0 w-full h-full rounded-[18px]"
                          >
                            <Image
                              src={image}
                              alt={alt}
                              unoptimized={image === shields}
                              fill
                              sizes="(max-width: 850px) 85vw, 42vw"
                              className={`object-cover ${idx === 3 ? "[object-position:center_32%]" : "object-center"}`}
                            />
                          </Link>
                        ) : (
                          <Image
                            src={image}
                            alt={alt}
                            unoptimized={image === shields}
                            fill
                            sizes="(max-width: 850px) 85vw, 42vw"
                            className={`object-cover ${idx === 3 ? "[object-position:center_32%]" : "object-center"}`}
                          />
                        )
                      ) : (
                        <div className="flex items-center gap-7 max-[1100px]:gap-[15px] max-[380px]:gap-3 h-full p-[26px_32px] max-[1100px]:p-[22px] max-[380px]:p-4 bg-[#fff4d6]">
                          <FileBadge
                            size={106}
                            strokeWidth={1.25}
                            aria-hidden="true"
                            className="shrink-0 w-[100px] max-[1100px]:w-[70px] max-[380px]:w-[55px] h-auto"
                          />
                          <div>
                            <h3 className="m-0 font-bold leading-[1.08] text-[21px] max-[380px]:text-[18px]">
                              A stronger foundation<br />for a bigger impact.
                            </h3>
                            <p className="m-0 text-[18px] max-[1100px]:text-[16px] max-[380px]:text-[14px]">
                              H.O.P.E. Inc. was established to expand our reach, resources, and long-term sustainability.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Copy box */}
                    <div
                      className={`relative ${cardBg} p-[20px_26px] max-[1100px]:p-[18px] rounded-[18px] ${copyColClass}`}
                    >
                      <span aria-hidden="true" className={arrow} />
                      <p className={`m-0 font-bold ${accentText} text-[29px] leading-[1.05]`}>
                        {period}
                      </p>
                      <h3 className="m-0 font-bold leading-[1.08] text-[21px] max-[850px]:text-[23px] my-[4px_10px]">
                        {href ? (
                          <Link
                            href={href}
                            className="text-inherit no-underline hover:underline focus-visible:outline-2 focus-visible:outline-[#1260d9] focus-visible:outline-offset-4 focus-visible:rounded-[4px]"
                          >
                            {title}
                          </Link>
                        ) : (
                          title
                        )}
                      </h3>
                      <p className="m-0 text-[14px] max-[850px]:text-[16px] leading-[1.35] max-[850px]:leading-[1.4]">
                        {description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </TimelineReveal>
        </div>
      </section>

      {/* Featured Story Section */}
      <section className="bg-[#fdf9ef] py-[36px] pb-[28px]" aria-labelledby="featured-title">
        <div className="mx-auto w-[88%] max-w-[1268px] max-[380px]:w-[90%] grid grid-cols-2 max-[850px]:grid-cols-1 gap-[55px] max-[1100px]:gap-[35px] max-[850px]:gap-7 items-start">
          <div className="pt-[18px] max-[850px]:pt-0">
            <SectionLabel>Featured story · 2017–2018</SectionLabel>
            <h2
              id="featured-title"
              className="m-0 font-bold leading-[1.08] text-[clamp(29px,2.7vw,38px)] tracking-[-0.7px]"
            >
              Engineering for the Individual
            </h2>
            <h3 className="m-0 font-bold leading-[1.08] text-[29px] mt-3">
              <Link
                href="/stories/elis-bike-arm"
                className="text-inherit no-underline hover:underline focus-visible:outline-2 focus-visible:outline-[#1260d9] focus-visible:outline-offset-4 focus-visible:rounded-[4px]"
              >
                Eli’s Bike Arm
              </Link>
            </h3>
            <p className="m-0 text-[18px] mt-5">
              As H.O.P.E.’s capabilities grew, students began developing more customized solutions. Eli’s Bike Arm became an early example of task-specific engineering, adding a point of contact and counterforce to help Eli ride his bicycle.
            </p>
            <p className="m-0 text-[18px] mt-5">
              Research began in 2017, with a prototype fitted in spring 2018. Continued development included a telescoping arm socket. Through iterative design and testing, Eli was able to ride the adapted bicycle through his neighborhood.
            </p>
            <aside className="flex items-center gap-6 max-[1100px]:gap-4 max-[380px]:gap-3 bg-[#ffe28c] rounded-[24px] p-[26px] max-[1100px]:p-[22px] max-[380px]:p-[18px] mt-7 max-[850px]:mt-6">
              <Dinosaur />
              <div>
                <h4 className="m-0 font-bold leading-[1.08] text-[21px] max-[380px]:text-[19px] mb-3">
                  A design with personality.
                </h4>
                <p className="m-0 text-[18px] max-[380px]:text-[16px]">
                  Its shape resembled a dinosaur arm, leading to the nickname “Elijasaur.”
                </p>
              </div>
            </aside>
          </div>
          <div className="max-[850px]:min-w-0">
            <Link
              href="/stories/elis-bike-arm"
              aria-label="Eli smiling on his adapted bicycle with the custom bike arm attached"
              className="block rounded-[16px] overflow-hidden no-underline focus-visible:outline-3 focus-visible:outline-[#1260d9] focus-visible:outline-offset-4"
            >
              <Image
                src={eli}
                alt="Eli smiling on his adapted bicycle with the custom bike arm attached"
                sizes="(max-width: 850px) 90vw, 45vw"
                className="block w-full h-auto rounded-[16px] aspect-[16/9] object-contain bg-[#eee7d8]"
              />
            </Link>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <Link
                href="/stories/elis-bike-arm"
                aria-label="Detail of the colorful custom bike-arm attachment"
                className="block rounded-[16px] overflow-hidden no-underline focus-visible:outline-3 focus-visible:outline-[#1260d9] focus-visible:outline-offset-4"
              >
                <Image
                  src={detail}
                  alt="Detail of the colorful custom bike-arm attachment"
                  sizes="(max-width: 850px) 44vw, 23vw"
                  className="block w-full h-auto rounded-[16px] aspect-[1.35] object-cover"
                />
              </Link>
              <Link
                href="/stories/elis-bike-arm"
                aria-label="Bike-arm components and tools laid out for assembly"
                className="block rounded-[16px] overflow-hidden no-underline focus-visible:outline-3 focus-visible:outline-[#1260d9] focus-visible:outline-offset-4"
              >
                <Image
                  src={assembly}
                  alt="Bike-arm components and tools laid out for assembly"
                  sizes="(max-width: 850px) 44vw, 23vw"
                  className="block w-full h-auto rounded-[16px] aspect-[1.35] object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Media & Milestones */}
      <MediaMilestones milestones={mediaMilestones} />
    </main>
  );
}

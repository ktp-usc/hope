import { getLeadership } from "@/sanity/lib/leadership";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Handshake, Settings, Wrench } from "lucide-react";
import workshopImage from "./about-images/13_Creativibe_Display_Team.jpg";
import presentDayImage from "./about-images/11_First_HOPE_Printer_Build.jpg";
import { pageMetadata } from "@/lib/seo";
import StudentOrgModule from "@/components/about/StudentOrgModule";
import TransparencyModule from "@/components/about/TransparencyModule";

export const metadata = pageMetadata(
  "About H.O.P.E.",
  "Hands on Prosthetic Engineering: our purpose, history, and the people helping shape H.O.P.E.",
  "/about"
);

const milestones = [
  {
    title: "Origins",
    description:
      "H.O.P.E. began at the University of South Carolina in 2016, when students came together to explore 3D-printed prosthetic hands and upper-limb solutions for children. Early projects drew on designs and resources shared through the open-source prosthetics community.",
  },
  {
    title: "Creation of H.O.P.E. Inc.",
    description:
      "In 2017, H.O.P.E. Inc. was incorporated as a separate South Carolina nonprofit to provide long-term continuity, resources, partnerships, and organizational support beyond individual student leadership cycles.",
  },
  {
    title: "Early projects",
    description:
      "As students gained experience, H.O.P.E. expanded beyond existing prosthetic-hand designs to develop customized solutions. Projects like Eli’s Bike Arm, researched beginning in 2017 and first fitted in spring 2018, demonstrated the value of iterative, task-specific engineering.",
  },
  {
    title: "COVID-era PPE work",
    description:
      "During the COVID-19 response, H.O.P.E. redirected its 3D-printing capabilities toward producing mask extenders and face-shield components, applying its engineering skills to an urgent community need.",
  },
  {
    title: "Rebuilding after COVID",
    description:
      "Like many student organizations, H.O.P.E. faced significant disruption during the pandemic. Its continued development has focused on building upon its original mission through student training, hands-on engineering, and expanded project opportunities.",
  },
  {
    title: "Current partnerships & operations",
    description:
      "Today, H.O.P.E. continues its work in experimental prosthetics, adaptive technologies, accessibility solutions, and student-led engineering. Collaborations with universities, nonprofits, and community partners help expand its capabilities and opportunities.",
  },
];

export const revalidate = 60;

export default async function AboutPage() {
  const leaders = await getLeadership();
  const nonprofitLeaders = leaders.filter((leader) => leader.affiliation !== "hope-student-org");
  const studentLeaders = leaders.filter((leader) => leader.affiliation === "hope-student-org");

  return (
    <main className="min-h-screen bg-white text-[#1a273d]">
      {/* 1. Yellow Split Hero */}
      <section className="bg-[#f7d06b] text-[#1a273d]" aria-labelledby="about-title">
        <div className="mx-auto max-w-6xl grid items-center gap-8 px-6 py-10 sm:py-12 md:grid-cols-[1.15fr_0.85fr] md:gap-10 lg:py-14">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#1a273d]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1a273d]">
                Hands on Prosthetic Engineering
              </span>
            </div>
            <h1
              id="about-title"
              className="text-4xl font-bold tracking-tight text-[#1a273d] sm:text-5xl lg:text-[54px] leading-[1.1]"
            >
              About H.O.P.E.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#1a273d]/90 sm:text-lg">
              H.O.P.E. is a student-powered engineering community turning practical needs into practical solutions. From experimental prosthetics to custom assistive technologies, we bring students together to design, build, and make a difference.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/history"
                className="inline-flex items-center justify-center rounded-xl bg-[#1260d9] px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-[#0f55bd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1260d9]"
              >
                Explore our history
                <ArrowUpRight size={18} className="ml-1.5" />
              </Link>
              <a
                href="#purpose"
                className="inline-flex items-center justify-center rounded-xl border border-[#1a273d]/20 bg-white/80 px-6 py-3 text-base font-semibold text-[#1a273d] shadow-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a273d]"
              >
                Our Purpose
                <ArrowDown size={16} className="ml-1.5" />
              </a>
            </div>
          </div>

          <div className="w-full">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white bg-[#ebf3fa] shadow-sm">
              <Image
                src={workshopImage}
                alt="H.O.P.E. members with their engineering project display."
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="mt-2.5 text-center text-xs text-[#1a273d]/75 italic">
              People &middot; Process &middot; Purpose
            </p>
          </div>
        </div>
      </section>

      {/* 2. Purpose Section */}
      <section id="purpose" className="mx-auto max-w-6xl px-6 py-14 sm:py-18 lg:py-22" aria-labelledby="purpose-title">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-0.5 w-5 bg-[#f7d06b]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
            Our purpose
          </span>
        </div>
        <div className="grid items-end justify-between gap-6 md:grid-cols-2">
          <h2 id="purpose-title" className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl lg:text-[42px] leading-tight">
            Built around people.<br />Grounded in making.
          </h2>
          <p className="text-base leading-relaxed text-slate-700">
            Our mission connects hands-on learning with real community needs. By designing adaptable, task-specific solutions, H.O.P.E. gives students the opportunity to develop technical and leadership skills while creating technologies that make a tangible difference.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <article className="flex flex-col justify-between rounded-2xl border border-[#d6e7f5] bg-[#ebf3fa] p-8 shadow-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-white text-[#0f55bd] shadow-sm">
                  <Handshake size={22} />
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#1a273d]">
                  Community
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#1a273d]">What HOPE is</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                H.O.P.E. brings students together to develop experimental prosthetics, assistive technologies, and practical engineering solutions. Through hands-on design, CAD, 3D printing, and prototyping, students gain real-world experience while contributing to meaningful projects.
              </p>
            </div>
          </article>

          <article className="flex flex-col justify-between rounded-2xl border border-amber-200/70 bg-[#faf8f5] p-8 shadow-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-white text-[#1a273d] shadow-sm">
                  <Wrench size={22} />
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#1a273d]">
                  Hands-On
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#1a273d]">Why we exist</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Our mission connects collegiate engineering with direct human impact. By designing adaptable, task-specific solutions, H.O.P.E. gives students the opportunity to develop technical and leadership skills while delivering practical devices directly to recipients without commercial barriers.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* 3. History Highlights */}
      <section id="history" className="bg-[#ebf3fa] px-6 py-14 sm:py-18 lg:py-22" aria-labelledby="history-title">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#f7d06b]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
              Our history
            </span>
          </div>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 id="history-title" className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl lg:text-[42px] leading-tight">
              A history of hands-on action.
            </h2>
            <div className="flex items-center gap-3">
              <Link
                href="/history"
                className="inline-flex items-center rounded-lg bg-[#f7d06b] px-5 py-2.5 text-sm font-semibold text-[#12303f] shadow-sm transition hover:bg-[#f3c64f]"
              >
                Full History &amp; Archive
                <ArrowRight size={15} className="ml-1.5" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map(({ title, description }, index) => (
              <article
                key={title}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#1260d6]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="size-2 rounded-full bg-[#f7d06b]" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[#1a273d]">{title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Present Day: Partnerships & Operations */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-18 lg:py-22" aria-labelledby="present-title">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-[#ebf3fa] shadow-sm">
            <Image
              src={presentDayImage}
              alt="Students gathered around a 3D printer during a hands-on H.O.P.E. workshop."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#f7d06b]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
                Present Day
              </span>
            </div>
            <h2 id="present-title" className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl">
              Partnerships &amp; Operations
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              H.O.P.E. operates through two distinct but closely coordinated organizations: H.O.P.E. Inc., an independent 501(c)(3) nonprofit, and the H.O.P.E. student organization at the University of South Carolina. Together, they connect student-led engineering with long-term organizational support and community partnerships.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-[#1260d6]">
                  <Handshake size={20} />
                  <h3 className="font-bold text-[#1a273d]">Partnerships</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Collaborations with universities, makers, and health educators expand our scope for service and learning.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-[#1260d6]">
                  <Settings size={20} />
                  <h3 className="font-bold text-[#1a273d]">Operations</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  H.O.P.E. Inc. provides nonprofit governance and resources, while USC students run hands-on prototyping and design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Dual-Organization Structure Module */}
      <StudentOrgModule garnetGateUrl="https://garnetgate.sa.sc.edu/organization/hope" />

      {/* 6. Leadership Section */}
      <section id="leadership" className="bg-[#faf8f5] px-6 py-14 sm:py-18 lg:py-22" aria-labelledby="leadership-title">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#f7d06b]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
              Leadership
            </span>
          </div>
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 id="leadership-title" className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl lg:text-[42px] leading-tight">
                The people helping shape H.O.P.E.
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                H.O.P.E. combines student-driven leadership with long-term nonprofit oversight.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {nonprofitLeaders.map(({ _id, name, title, bio, headshotUrl }) => (
              <article
                key={_id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
              >
                <div className="relative aspect-square w-full bg-[#ebf3fa]">
                  {headshotUrl ? (
                    <Image
                      src={headshotUrl}
                      alt={`Portrait of ${name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs font-semibold text-slate-400">
                      Photo Pending
                    </div>
                  )}
                </div>
                <div className="flex grow flex-col p-5">
                  <h3 className="text-lg font-bold text-[#1a273d]">{name}</h3>
                  <p className="text-xs font-semibold text-[#1260d6]">{title}</p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">{bio}</p>
                </div>
              </article>
            ))}
          </div>

          {studentLeaders.length > 0 && (
            <div className="mt-14 pt-10 border-t border-slate-200">
              <h3 className="text-xl font-bold text-[#1a273d] mb-6">
                Student Organization Leadership
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {studentLeaders.map(({ _id, name, title, bio, headshotUrl }) => (
                  <article
                    key={_id}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                  >
                    {headshotUrl ? (
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#ebf3fa]">
                        <Image
                          src={headshotUrl}
                          alt={`Portrait of ${name}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-[#ebf3fa] text-[10px] font-bold text-slate-400">
                        HOPE
                      </div>
                    )}
                    <div>
                      <h4 className="text-base font-bold text-[#1a273d]">{name}</h4>
                      <p className="text-xs font-semibold text-[#1260d6]">{title}</p>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">{bio}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. Transparency Module */}
      <TransparencyModule />
    </main>
  );
}

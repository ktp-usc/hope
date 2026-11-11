import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Handshake, Settings, Wrench } from "lucide-react";
import workshopImage from "./about-images/13_Creativibe_Display_Team.jpg";
import presentDayImage from "./about-images/11_First_HOPE_Printer_Build.jpg";

export const metadata: Metadata = {
  title: "About H.O.P.E.",
  description: "Hands on Prosthetic Engineering: our purpose, history, and the people helping shape H.O.P.E.",
};

const milestones = [
  { title: "Origins", description: "H.O.P.E. began at the University of South Carolina in 2016, when students came together to explore 3D-printed prosthetic hands and upper-limb solutions for children. Early projects drew on designs and resources shared through the open-source prosthetics community." },
  { title: "Creation of H.O.P.E. Inc.", description: "In 2017, H.O.P.E. Inc. was incorporated as a separate South Carolina nonprofit to provide long-term continuity, resources, partnerships, and organizational support beyond individual student leadership cycles." },
  { title: "Early projects", description: "As students gained experience, H.O.P.E. expanded beyond existing prosthetic-hand designs to develop customized solutions. Projects like Eli’s Bike Arm, researched beginning in 2017 and first fitted in spring 2018, demonstrated the value of iterative, task-specific engineering." },
  { title: "COVID-era PPE work", description: "During the COVID-19 response, H.O.P.E. redirected its 3D-printing capabilities toward producing mask extenders and face-shield components, applying its engineering skills to an urgent community need." },
  { title: "Rebuilding after COVID", description: "Like many student organizations, H.O.P.E. faced significant disruption during the pandemic. Its continued development has focused on building upon its original mission through student training, hands-on engineering, and expanded project opportunities." },
  { title: "Current partnerships & operations", description: "Today, H.O.P.E. continues its work in experimental prosthetics, adaptive technologies, accessibility solutions, and student-led engineering. Collaborations with universities, nonprofits, and community partners help expand its capabilities and opportunities." },
];

const leaders = [
  { name: "Abby Herschman", role: "Chair, H.O.P.E. Inc. Board of Directors", description: "Provides board leadership and governance oversight for H.O.P.E. Inc., supporting the nonprofit’s long-term mission and organizational continuity." },
  { name: "Andrew Super", role: "Vice Chair, H.O.P.E. Inc. Board of Directors", description: "Serves as Vice Chair of the Board, contributing to nonprofit oversight, organizational continuity, and support for H.O.P.E.’s mission." },
  { name: "Ashley Turner", role: "Board Director, Logistics", description: "Serves on the H.O.P.E. Inc. Board of Directors with a focus on logistics and organizational support." },
  { name: "Matthew Yvon", role: "Chief Executive Officer, H.O.P.E. Inc.", description: "Leads H.O.P.E. Inc.’s executive operations, helping coordinate the nonprofit’s resources, activities, and organizational development." },
];

function HandMark() {
  return (
    <div aria-hidden="true" className="absolute bottom-8 left-8 flex h-20 items-end gap-1.5">
      {[["h-14", "bg-sun"], ["h-20", "bg-sun"], ["h-16", "bg-sun"], ["h-12", "bg-[#e95c36]"]].map(([height, color], index) => (
        <span key={index} className={`w-5 rounded-t-full ${height} ${color}`} />
      ))}
    </div>
  );
}

const container = "mx-auto w-[90%] max-w-[1296px]";
const sectionLabel = "inline-flex rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold uppercase leading-tight text-white";

export default function AboutPage() {
  return (
    <main className="bg-white text-ink">
      <header className="grid overflow-hidden bg-sun lg:min-h-[620px] lg:grid-cols-[1.05fr_0.95fr]" aria-labelledby="about-title">
        <div className="flex flex-col items-start px-6 py-12 sm:px-10 sm:py-16 lg:px-[9%] lg:py-20">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
            <span className="h-1 w-10 bg-[#e95c36]" />
            Hands on Prosthetic Engineering
          </p>
          <h1 id="about-title" className="mt-6 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            About<br />H.O.P.E.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
            H.O.P.E. is a student-powered engineering community turning practical needs into practical solutions. From experimental prosthetics to custom assistive technologies, we bring students together to design, build, and make a difference.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a className="inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 text-sm font-bold text-ink transition-colors hover:bg-paper" href="/history">
              Explore our history <ArrowUpRight size={17} />
            </a>
            <a className="inline-flex min-h-12 items-center gap-2 text-xs font-bold uppercase tracking-wider" href="#purpose">
              Scroll to learn more <ArrowDown size={17} />
            </a>
          </div>
        </div>
        <div className="relative min-h-72 overflow-hidden bg-slate-200 sm:min-h-96 lg:min-h-full">
          <Image
            src={workshopImage}
            alt="H.O.P.E. members with their engineering project display."
            fill
            sizes="(max-width: 700px) 100vw, 45vw"
            className="object-cover"
            preload
          />
          <span className="absolute right-6 top-6 rounded-full bg-white px-3 py-2 text-[11px] font-bold uppercase">
            <i className="mr-2 inline-block size-1.5 rounded-full bg-[#e95c36]" />
            People · Process · Purpose
          </span>
          <HandMark />
        </div>
      </header>

      <section id="purpose" className={`${container} scroll-mt-6 py-16 sm:py-20 lg:py-24`} aria-labelledby="purpose-title">
        <span className={sectionLabel}>Our purpose</span>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="purpose-title" className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Built around people.<br />Grounded in making.
          </h2>
          <ul className="flex flex-wrap gap-2.5 text-sm" aria-label="Our values">
            <li className="rounded-full border border-line px-4 py-2">Hands on</li>
            <li className="rounded-full bg-wash px-4 py-2">Engineering</li>
            <li className="rounded-full border border-line px-4 py-2">Community</li>
          </ul>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="relative flex min-h-72 flex-col justify-between gap-8 overflow-hidden rounded-3xl bg-[#458fd2] p-7 text-ink sm:p-9">
            <h3 className="pr-16 text-3xl font-bold sm:text-4xl">What HOPE is</h3>
            <span className="absolute right-7 top-7 grid size-12 place-items-center rounded-full bg-white"><Handshake size={25} /></span>
            <p className="max-w-xl pr-10 leading-7">H.O.P.E. brings students together to develop experimental prosthetics, assistive technologies, and practical engineering solutions. Through hands-on design, CAD, 3D printing, and prototyping, students gain real-world experience while contributing to meaningful projects.</p>
            <span className="absolute bottom-7 right-7 size-12 rounded-full bg-sun" aria-hidden="true" />
          </article>
          <article className="relative flex min-h-72 flex-col justify-between gap-8 overflow-hidden rounded-3xl bg-sun p-7 sm:p-9">
            <h3 className="pr-16 text-3xl font-bold sm:text-4xl">Why we exist</h3>
            <span className="absolute right-7 top-7 grid size-12 place-items-center rounded-full bg-white"><Wrench size={25} /></span>
            <p className="max-w-xl pr-10 leading-7">Our mission connects hands-on learning with real community needs. By designing adaptable, task-specific solutions, H.O.P.E. gives students the opportunity to develop technical and leadership skills while creating technologies that can make a difference in people’s lives.</p>
            <span className="absolute bottom-7 right-7 size-12 rounded-full bg-[#e95c36]" aria-hidden="true" />
          </article>
        </div>
      </section>

      <section id="history" className={`${container} scroll-mt-6 py-14 sm:py-20`} aria-labelledby="history-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className={`${sectionLabel} bg-sun text-ink`}>Our history</span>
            <h2 id="history-title" className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              A history of<br />hands-on action.
            </h2>
          </div>
          <div className="flex size-28 flex-col justify-between rounded-2xl bg-[#458fd2] p-4 sm:size-36 sm:p-6">
            <strong className="text-4xl leading-none sm:text-5xl">06</strong>
            <span className="text-[11px] font-bold uppercase">Milestones</span>
          </div>
        </div>
        <ol className="mt-10 grid gap-x-12 md:grid-cols-2">
          {milestones.map(({ title, description }, index) => (
            <li key={title} className="relative flex min-h-40 gap-5 border-b border-line py-6 pl-2">
              <span className="mt-1 size-4 shrink-0 rounded-full border-4 border-white bg-sun shadow-sm" aria-hidden="true" />
              <div className="min-w-0">
                <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-quiet sm:text-base">{description}</p>
              </div>
              <span className="ml-auto shrink-0 text-xs font-bold text-hope">{String(index + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${container} grid gap-8 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14`} aria-labelledby="present-title">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200">
          <Image
            src={presentDayImage}
            alt="Students gathered around a 3D printer during a hands-on H.O.P.E. workshop."
            fill
            sizes="(max-width: 700px) 90vw, (max-width: 1440px) 44vw, 630px"
            className="object-cover"
          />
          <span className={`${sectionLabel} absolute left-6 top-6 bg-sun text-ink`}>HOPE today</span>
          <div className="absolute bottom-6 left-6 flex gap-2" aria-hidden="true">
            <span className="h-3 w-12 rounded-full bg-[#458fd2]" /><span className="h-3 w-7 rounded-full bg-[#e95c36]" />
          </div>
        </div>
        <div>
          <span className={sectionLabel}>Present day</span>
          <h2 id="present-title" className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Partnerships &amp;<br />operations
          </h2>
          <p className="mt-5 leading-7 text-quiet">H.O.P.E. operates through two distinct but closely coordinated organizations: H.O.P.E. Inc., an independent 501(c)(3) nonprofit, and the H.O.P.E. student organization at the University of South Carolina. Together, they connect student-led engineering with long-term organizational support and community partnerships.</p>
          <div className="mt-8 grid gap-7 sm:grid-cols-2">
            <article className="border-t-2 border-ink pt-5">
              <h3 className="flex items-center justify-between gap-3 text-xl font-bold">Partnerships <Handshake size={24} className="shrink-0 text-hope" /></h3>
              <p className="mt-4 text-sm leading-6 text-quiet">H.O.P.E. collaborates with universities, nonprofits, and community organizations to expand opportunities for engineering, education, and service. Its relationships include the University of South Carolina and e-NABLE. An institutional collaboration with the Medical University of South Carolina is still developing. Its historical relationship with the former USC/Columbia Technology Incubator connects it to the Midlands Innovation X-Change; an active formal partnership has not been confirmed.</p>
            </article>
            <article className="border-t-2 border-ink pt-5">
              <h3 className="flex items-center justify-between gap-3 text-xl font-bold">Operations <Settings size={24} className="shrink-0 text-hope" /></h3>
              <p className="mt-4 text-sm leading-6 text-quiet">H.O.P.E. Inc. provides nonprofit oversight, funding, resources, and external partnerships, while the USC student organization coordinates much of the hands-on design, prototyping, manufacturing, recruitment, and training. Each organization maintains its own governance and responsibilities.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="leadership" className="scroll-mt-6 bg-paper py-16 sm:py-20 lg:py-24" aria-labelledby="leadership-title">
        <div className={container}>
          <span className={sectionLabel}>Leadership</span>
          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <h2 id="leadership-title" className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              The people helping<br />shape H.O.P.E.
            </h2>
            <p className="leading-7 text-quiet">H.O.P.E. combines student-driven leadership with long-term nonprofit oversight. Its Board of Directors provides continuity and governance, while executive and student leaders guide daily operations, projects, and organizational development.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {leaders.map(({ name, role, description }, index) => (
              <article className="overflow-hidden rounded-2xl bg-white shadow-sm" key={name}>
                <div className="flex h-40 items-start bg-wash p-4" role="img" aria-label={`Headshot placeholder for ${name}`}>
                  <span className="rounded-full bg-white px-3 py-2 text-[10px] font-bold uppercase">
                    <i className={`mr-2 inline-block size-1.5 rounded-full ${index % 2 ? "bg-[#e95c36]" : "bg-sun"}`} />
                    Headshot forthcoming
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold">{name}</h3>
                  <p className="mt-3 text-sm font-bold">{role}</p>
                  <p className="mt-3 text-sm leading-6 text-quiet">{description}</p>
                </div>
              </article>
            ))}
          </div>
          <section className="mt-10" aria-labelledby="student-leadership-title">
            <h3 id="student-leadership-title" className="text-2xl font-bold">Student Organization Leadership</h3>
            <article className="mt-5 max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h4 className="text-xl font-bold">Trinity Oglesby</h4>
              <p className="mt-3 text-sm font-bold">President, H.O.P.E. Student Organization at USC</p>
              <p className="mt-3 leading-7 text-quiet">Leads the university-based student organization, where students organize, train, recruit, and carry out much of H.O.P.E.’s hands-on project work.</p>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}

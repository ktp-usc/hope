import Image from "next/image";
import Link from "next/link";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="h-0.5 w-5 bg-[#f7d06b]" />
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1b2d4c]">
        {children}
      </span>
    </div>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="ml-1.5 inline h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="ml-1.5 inline h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-lg bg-[#f7d06b] px-5 py-2.5 text-sm font-semibold text-[#12303f] shadow-sm transition hover:bg-[#f3c64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f]"
    >
      {children}
      <ArrowUpRightIcon />
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#12303f] shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f]"
    >
      {children}
      <ArrowUpRightIcon />
    </Link>
  );
}

/* ---------- Data Sources (Content Packet v0.2 & Figma Mockup) ---------- */

const campusCards = [
  {
    eyebrow: "Listen & understand",
    title: "Person-centered design",
    body: "Connecting student engineers with individuals and families to understand real practical needs before designing.",
    image: "/images/campus-design.jpg",
    alt: "HOPE students engaging with the campus community during project outreach",
  },
  {
    eyebrow: "Build & refine",
    title: "Hands-on engineering",
    body: "Students gain direct experience with CAD modeling, 3D printing, prototyping, and iterative fabrication.",
    image: "/images/campus-engineering.jpg",
    alt: "HOPE team member assembling and calibrating a 3D printer for prosthetics work",
  },
  {
    eyebrow: "Learn & share",
    title: "Knowledge that travels",
    body: "Bringing together university talent, open-source resources, and community partners to scale assistive technology.",
    image: "/images/campus-community.jpg",
    alt: "HOPE student organization members at the University of South Carolina",
  },
];

/* ---------- Page Component ---------- */

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#1b2d4c]">
      {/* 1. Hero Section */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <Eyebrow>Hands On Prosthetic Engineering</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-[#1b2d4c] sm:text-5xl lg:text-6xl leading-[1.12]">
            Moving Forward.
            <br />
            Living Without Limits.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600">
            People first. Possibilities next. HOPE brings hands-on engineering and human
            understanding together to make prosthetic solutions more accessible.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/get-help">Get Help</PrimaryButton>
            <SecondaryButton href="/our-work">Explore Our Work</SecondaryButton>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            A nonprofit built around people, not just prosthetics.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-[#ebf3fa] p-3 shadow-sm">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              src="/images/hero.jpg"
              alt="Students collaborating on hands-on prosthetic engineering design"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="px-3 py-3.5">
            <p className="text-sm font-semibold text-[#1b2d4c]">
              Designed with people. Built for life.
            </p>
            <p className="mt-0.5 text-xs text-slate-500 flex items-center gap-1.5">
              Everyday needs are where better design begins.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Mission Statement Section */}
      <section className="mx-auto max-w-6xl px-6 py-6">
        <div className="rounded-2xl border border-[#d6e7f5] bg-[#ebf3fa] px-8 py-12 md:px-12 md:py-14">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Eyebrow>Why HOPE exists</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-[#1b2d4c] sm:text-3xl lg:text-4xl leading-tight">
                Turning practical needs into practical solutions.
              </h2>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                HOPE is a student-powered engineering and nonprofit community focused on creating
                accessible prosthetic devices, task-specific assistive technologies, and adaptable
                designs customized for individual needs.
              </p>
              <Link
                href="/about"
                className="mt-5 inline-flex items-center text-sm font-semibold text-[#12303f] hover:underline underline-offset-4"
              >
                Get to know HOPE
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Student Impact ("Campus to Community") */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <Eyebrow>Student impact</Eyebrow>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="text-3xl font-bold tracking-tight text-[#1b2d4c] sm:text-4xl">
            Campus to Community
          </h2>
          <Link
            href="/our-work"
            className="inline-flex items-center text-sm font-semibold text-[#12303f] hover:underline underline-offset-4"
          >
            Discover Our Work
            <ArrowRightIcon />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {campusCards.map((card) => (
            <article key={card.title} className="flex flex-col">
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-100 shadow-sm">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-300 hover:scale-105"
                />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {card.eyebrow}
              </p>
              <h3 className="mt-1 text-lg font-bold text-[#1b2d4c]">{card.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Featured Impact: Eli Bike Arm Case Study */}
      <section className="border-y border-amber-100/70 bg-[#faf8f5]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 lg:py-20">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-amber-200/50 shadow-sm md:aspect-square">
            <Image
              src="/images/eli-arm.jpg"
              alt="Detail of the 3D-printed bike arm joint attachment holding bicycle handlebar"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <Eyebrow>Featured impact</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight text-[#1b2d4c] sm:text-4xl">
              Eli Bike Arm
            </h2>
            <p className="mt-5 text-sm italic leading-relaxed text-slate-700 sm:text-base">
              &ldquo;Eli’s Bike Arm started as a custom engineering challenge: add an arm to the bicycle
              that Eli could use as another point of contact and press against for counterforce while riding.
              Nicknamed &lsquo;Elijasaur&rsquo; for its distinct profile, the iterative design gave Eli the
              stability needed to ride his bicycle through his neighborhood.&rdquo;
            </p>
            <div className="mt-6">
              <PrimaryButton href="/our-work">Read More</PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

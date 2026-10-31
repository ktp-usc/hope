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

const metrics = [
  {
    value: "1,284",
    label: "Prosthetic devices made",
    icon: (
      <svg className="h-5 w-5 text-[#b88c1c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    value: "842",
    label: "Students involved",
    icon: (
      <svg className="h-5 w-5 text-[#b88c1c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    value: "3,760",
    label: "Lives helped",
    icon: (
      <svg className="h-5 w-5 text-[#b88c1c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    title: "Learning with purpose",
    quote:
      "Working with HOPE gave our engineering team real-world purpose. We weren't just solving textbook problems—we were designing solutions for someone right in front of us.",
    attribution: "Student Member & Alum, Class of 2024",
  },
  {
    title: "Design that listens",
    quote:
      "HOPE approaches assistive design with patience and humility. They take the time to understand everyday barriers and build something that genuinely fits.",
    attribution: "Community Partner & Supporter, 2025",
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
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f7d06b]" />
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
            <p className="mt-5 text-xs text-slate-500">
              Support depends on your needs and project suitability. HOPE does not replace medical
              advice or emergency care.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Impact Metrics Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <Eyebrow>Impact metrics</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight text-[#1b2d4c] sm:text-4xl">
          Measuring the difference we make.
        </h2>
        <p className="mt-2 text-xs text-slate-500">
          Sample figures for illustration only &mdash; not actual HOPE impact data.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-[#fae8b2] bg-[#fff4d2] p-8 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100/70">
                {m.icon}
              </div>
              <p className="text-4xl font-bold tracking-tight text-[#1b2d4c] sm:text-5xl">
                {m.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-700">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="mx-auto max-w-6xl px-6 pb-20 lg:pb-24">
        <Eyebrow>Testimonials</Eyebrow>
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-[#1b2d4c] sm:text-4xl">
          What People Say
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.title}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-[#f3f8fc] p-8 shadow-sm"
            >
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-0.5 w-4 bg-[#f7d06b]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    A little clarity
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1b2d4c]">{t.title}</h3>
                <blockquote className="mt-4 text-sm italic leading-relaxed text-slate-700 sm:text-base">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-slate-200/50 pt-4 text-xs font-semibold text-slate-500">
                &ndash; {t.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}

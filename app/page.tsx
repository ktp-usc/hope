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

/* ---------- Data: Content Packet v0.2 §1, §3, §15 ---------- */

const campusCards = [
  {
    eyebrow: "Listen & define",
    title: "Person-centered design",
    body: "Connecting student engineers with individuals and families to understand real practical needs before designing.",
    image: "/images/campus-design.jpg",
    alt: "HOPE students engaging with the campus community during project outreach",
  },
  {
    eyebrow: "Design & iterate",
    title: "Hands-on engineering",
    body: "Students gain direct experience with CAD modeling, 3D printing, prototyping, and iterative fabrication.",
    image: "/images/campus-engineering.jpg",
    alt: "HOPE team member assembling and calibrating a 3D printer for prosthetics work",
  },
  {
    eyebrow: "Build & document",
    title: "Two organizations, one mission",
    body: "The HOPE student organization at USC carries out hands-on design and fabrication. HOPE Inc. provides continuity, resources, and organizational support.",
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
            Turning Practical Needs
            <br />
            Into Practical Solutions.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600">
            A student-powered engineering and nonprofit community. Our charitable roots are in
            developing experimental pediatric upper-limb prosthetic devices. Today, HOPE also
            works on task-specific assistive devices, accessibility solutions, and adaptable
            designs that can be customized for individual needs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/get-help">Get Help</PrimaryButton>
            <SecondaryButton href="/our-work">Explore Our Work</SecondaryButton>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            HOPE Inc. is an independent 501(c)(3) nonprofit. The HOPE student organization at USC carries out much of the hands-on work.
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
              Students gain hands-on experience in engineering design, CAD, 3D printing, and prototyping.
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
                From experimental prosthetics to assistive, adaptive, and accessibility engineering.
              </h2>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                HOPE develops experimental prosthetic devices and other assistive technologies,
                ranging from custom, task-specific solutions to adaptive designs. Not every HOPE
                project is a prosthetic &mdash; the same design and manufacturing capabilities also
                support service, training, outreach, and other practical engineering work.
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

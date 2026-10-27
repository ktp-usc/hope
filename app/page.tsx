import Image from "next/image";
import Link from "next/link";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="h-0.5 w-5 bg-[#f2c14e]" />
      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#1b3a4b]">
        {children}
      </span>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="ml-2 inline h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-md bg-[#f2c14e] px-4 py-2 text-sm font-medium text-[#1b3a4b] transition hover:brightness-95"
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#1b3a4b] transition hover:bg-gray-50"
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}

/* ---------- data ---------- */

const campusCards = [
  {
    eyebrow: "Listen & understand",
    title: "IMAGE 1 TITLE",
    body: "IMAGE 1 CAPTION/DESCRIPTION.",
    image: "/images/campus-design.jpg",
    alt: "Image 1",
  },
  {
    eyebrow: "Build & refine",
    title: "IMAGE 2 TITLE",
    body: "IMAGE 2 CAPTION/DESCRIPTION.",
    image: "/images/campus-engineering.jpg",
    alt: "Image 2",
  },
  {
    eyebrow: "Learn & share",
    title: "IMAGE 3 TITLE",
    body: "IMAGE 3 CAPTION/DESCRIPTION.",
    image: "/images/campus-community.jpg",
    alt: "Image 3",
  },
];

const metrics = [
  { value: "1,284", label: "Prosthetic devices made" },
  { value: "842", label: "Students involved" },
  { value: "3,760", label: "Lives helped" },
];

const testimonials = [
  {
    title: "Alumni Quote 1 (brief phrase here)",
    quote:
      "Quote from alumni giving testimonial Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    attribution: "John Doe, Position in relation to organization, 2026",
  },
  {
    title: "Student Quote 2 (brief phrase here)",
    quote:
      "Quote from student giving testimonial Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    attribution: "John Doe, Position in relation to organization, 2026",
  },
];

/* ---------- page ---------- */

export default function Home() {
  return (
    <div className="text-[#1b3a4b]">
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <Eyebrow>Hands On Prosthetic Engineering</Eyebrow>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Motto placeholder
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-600">
            People first. Possibilities next. HOPE brings hands-on engineering and human
            understanding together to make prosthetic solutions more accessible.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton href="/get-help">Get Help</PrimaryButton>
            <SecondaryButton href="/our-work">Explore Our Work</SecondaryButton>
          </div>
          <p className="mt-6 text-xs text-gray-500">
            A nonprofit built around people, not just prosthetics.
          </p>
        </div>

        <div className="rounded-2xl bg-[#e8f3fa] p-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/hero.jpg"
              alt="First image seen on the hompage"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="px-2 py-3">
            <p className="text-sm font-semibold">Caption for picture.</p>
            <p className="text-xs text-gray-500">Description for picture.</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#4681BE]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-14 md:grid-cols-2">
          <div>
            <Eyebrow>Why HOPE exists</Eyebrow>
            <h2 className="text-3xl font-semibold leading-tight">
              HOPE&rsquo;s Mission Statement Placeholder
            </h2>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-black">
              Temporary placeholder for short explanation of what they do.
            </p>
            <Link href="/about" className="mt-4 inline-flex items-center text-sm font-medium">
              Get to know HOPE
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Campus to Community */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Eyebrow>Student impact</Eyebrow>
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold">Campus to Community</h2>
          <Link href="/our-work" className="inline-flex items-center text-sm font-medium">
            Discover Our Work
            <ArrowIcon />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {campusCards.map((card) => (
            <article key={card.title}>
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-[11px] uppercase tracking-wide text-gray-500">{card.eyebrow}</p>
              <h3 className="mt-1 text-lg font-semibold">{card.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* HOPE impact / featured story */}
      <section className="bg-[#fff7e0]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/eli-arm.jpg"
              alt="Eli bike arm"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <Eyebrow>HOPE impact</Eyebrow>
            <h2 className="text-3xl font-semibold">Eli Bike Arm</h2>
            <p className="mt-4 text-sm italic leading-relaxed text-gray-600">
              &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.&rdquo;
            </p>
            <div className="mt-5">
              <PrimaryButton href="/our-work">Read More</PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Impact metrics */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Eyebrow>Impact metrics</Eyebrow>
        <h2 className="text-3xl font-semibold">Measuring the difference we make.</h2>
        <p className="mt-2 text-xs text-gray-500">
          Sample figures for illustration only &mdash; not actual HOPE impact data.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-2xl bg-[#4681BE] p-6">
              <p className="text-5xl font-semibold text-black">{m.value}</p>
              <p className="mt-2 text-xs font-semibold">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Eyebrow>Testimonials</Eyebrow>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.title}
              className="rounded-2xl bg-[#f5f9fc] p-6 shadow-md"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="h-0.5 w-4 bg-[#f2c14e]" />
              </div>
              <h3 className="text-2xl font-semibold leading-snug">{t.title}</h3>
              <blockquote className="mt-4 text-sm italic leading-relaxed text-gray-600">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-xs font-semibold">&ndash; {t.attribution}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
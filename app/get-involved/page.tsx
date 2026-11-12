import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import hopeLogo from "@/app/about/about-images/hope-logo.jpg";
import uscLogo from "@/app/about/about-images/usc-logo.jpg";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Get Involved",
  "HOPE brings together students from many different backgrounds to work on real projects, develop practical skills, and help run the organization.",
  "/get-involved"
);

// Verified H.O.P.E. page on Garnet Gate (USC).
const GARNET_GATE_URL = "https://garnetgate.sa.sc.edu/organization/HOPE";
const STUDENT_ORG_BLOG_URL = "https://hopeuofsc.wordpress.com/";

const contributions = [
  {
    title: "Design and technical",
    description:
      "Engineering design, CAD, 3D printing, manufacturing, prototyping, and testing for adaptable assistive solutions.",
    roles: [
      "Engineering design",
      "CAD",
      "3D printing",
      "Manufacturing",
      "Prototyping and testing",
      "Software",
      "Electronics",
      "Accessibility",
      "Human-centered design",
      "Digital design and illustration",
    ],
  },
  {
    title: "People and community",
    description:
      "Recipient and family engagement, accessibility research, partner coordination, and gathering feedback.",
    roles: [
      "Recipient and family engagement",
      "Outreach",
      "Hospital and community-partner coordination",
      "Accessibility research",
      "Public health",
      "Psychology and human behavior",
      "Healthcare and rehabilitation perspectives",
      "Gathering feedback",
      "Translating needs into requirements",
    ],
  },
  {
    title: "Business and organizational",
    description:
      "Project management, nonprofit operations, communications, fundraising, and leadership.",
    roles: [
      "Project management",
      "Nonprofit and corporate operations",
      "Fundraising and grant development",
      "Communications and social media",
      "Photo, video, and storytelling",
      "Graphic design and branding",
      "Recruiting and volunteer coordination",
      "Partnerships and sponsor relations",
      "Events",
      "Executive leadership",
      "Organizational management",
    ],
  },
];

export default function GetInvolvedPage() {
  return (
    <main className="min-h-screen bg-white text-[#1a273d]">
      {/* 1. Yellow Header Banner */}
      <section className="bg-[#f7d06b] px-6 py-10 sm:py-12 lg:py-14 text-[#1a273d]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#1a273d]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1a273d]">
              Get involved
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-5xl lg:text-[54px] leading-[1.1]">
            Work on real projects.
            <br />
            Develop practical skills.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#1a273d]/90 sm:text-lg">
            HOPE brings together students from many different backgrounds to work on real projects, develop practical skills, and help run the organization. You do not have to be an engineer to contribute.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#where-are-you-studying"
              className="inline-flex items-center justify-center rounded-xl bg-[#1260d9] px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-[#0f55bd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1260d9]"
            >
              How to Join
              <ArrowRight className="ml-1.5 size-4" />
            </a>
            <a
              href="#ways-to-contribute"
              className="inline-flex items-center justify-center rounded-xl border border-[#1a273d]/20 bg-white/80 px-6 py-3 text-base font-semibold text-[#1a273d] shadow-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a273d]"
            >
              Ways to Contribute
            </a>
          </div>
        </div>
      </section>

      {/* 2. Ways to Contribute */}
      <section id="ways-to-contribute" className="bg-[#ebf3fa] px-6 py-14 sm:py-18 lg:py-22">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#f7d06b]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
                Areas of work
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1a273d] sm:text-3xl lg:text-4xl">
              Ways to contribute
            </h2>
            <p className="mt-3.5 text-base leading-relaxed text-slate-700">
              HOPE benefits from people who approach problems differently. A successful project needs someone who can design a part, someone who understands the person using it, someone who can communicate with a family or partner, and someone who can keep the project organized and moving forward.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {contributions.map((c, i) => (
              <article
                key={c.title}
                className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#1260d6]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="size-2.5 rounded-full bg-[#f7d06b]" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#1a273d]">{c.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{c.description}</p>
                <hr className="mt-5 border-slate-100" />
                <ul className="mt-4 space-y-2">
                  {c.roles.map((role) => (
                    <li key={role} className="flex items-center gap-2 text-xs font-semibold text-[#1a273d]">
                      <span className="size-1.5 shrink-0 rounded-full bg-[#f7d06b]" />
                      {role}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Where Are You Studying? (USC vs Other Schools) */}
      <section id="where-are-you-studying" className="mx-auto max-w-6xl px-6 py-14 sm:py-18 lg:py-22">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#f7d06b]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
              Get Started
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1a273d] sm:text-3xl lg:text-4xl">
            Where are you studying?
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* USC Students Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#d6e7f5] bg-[#ebf3fa] p-8 sm:p-10 shadow-sm">
            <div>
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1260d6]">
                  University of South Carolina
                </span>
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white p-2 shadow-sm border border-slate-200/80 flex items-center justify-center">
                  <Image
                    src={uscLogo}
                    alt="H.O.P.E. at USC logo"
                    className="max-h-full max-w-full object-contain"
                    width={56}
                    height={56}
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#1a273d] sm:text-3xl">USC Students</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                For students at the University of South Carolina, the best starting point is the HOPE student organization at USC. Students can join through Garnet Gate, connect with student leadership, and attend meetings, training, and project activities.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={GARNET_GATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center rounded-lg bg-[#f7d06b] px-5 py-2.5 text-sm font-semibold text-[#12303f] shadow-sm transition hover:bg-[#f3c64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f]"
              >
                Join HOPE at USC (Garnet Gate)
                <ArrowUpRight className="ml-1.5 size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              {STUDENT_ORG_BLOG_URL && (
                <a
                  href={STUDENT_ORG_BLOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs font-semibold text-[#1a273d] underline underline-offset-4 hover:text-[#1260d6]"
                >
                  Visit the HOPE student organization website &rarr;
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>

          {/* Other Institutions Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
            <div>
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1260d6]">
                  Other Institutions
                </span>
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white p-2 shadow-sm border border-slate-200/80 flex items-center justify-center">
                  <Image
                    src={hopeLogo}
                    alt="H.O.P.E. Inc. logo"
                    className="max-h-full max-w-full object-contain"
                    width={56}
                    height={56}
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#1a273d] sm:text-3xl">Students at Other Schools</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Students do not have to be at USC to start a conversation with HOPE. Students, colleges, universities, and technical schools can contact HOPE about contributing, collaborating, or exploring opportunities.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#1a273d] shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a273d]"
              >
                Connect with HOPE
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

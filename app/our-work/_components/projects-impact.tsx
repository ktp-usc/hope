import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectStoryCard } from "@/sanity/lib/queries";
import eliArmImg from "@/public/images/projects/01_Eli_Bike_Arm_Detail.jpg";
import ppeFramesImg from "@/public/images/projects/09_HOPE_Face_Shield_Frames.png";
import printedHandImg from "@/public/images/projects/08_HOPE_Printed_Hand.png";

interface ProjectDisplayItem {
  title: string;
  slug: string;
  category: string;
  status: string;
  image: StaticImageData | string;
  alt: string;
  summary: string;
}

const defaultProjects: ProjectDisplayItem[] = [
  {
    title: "Eli's Bike Arm — Designing for the Ride",
    slug: "elis-bike-arm",
    category: "Adaptive Device",
    status: "Iterative Engineering",
    image: eliArmImg,
    alt: "Detail view of Eli's custom 3D-printed bike arm joint attachment",
    summary:
      "A custom-engineered support arm mounted to a bicycle, providing Eli with a stable point of contact and counterforce while riding. Researched in 2017 and fitted in spring 2018, it exemplifies HOPE's iterative design approach.",
  },
  {
    title: "When HOPE Shifted Its 3D Printers to PPE",
    slug: "ppe-response",
    category: "Community Response",
    status: "Small-Batch Fabrication",
    image: ppeFramesImg,
    alt: "Batch of 3D-printed face shield frames fabricated during COVID-19 relief",
    summary:
      "During the pandemic, student members partnered with USC faculty and graduate students to redirect 3D printing toward mask extenders and face-shield components, answering an urgent public health need.",
  },
  {
    title: "Where HOPE's Hands-On Work Began",
    slug: "hands-on-beginnings",
    category: "Prosthetic Exploration",
    status: "Foundational Roots",
    image: printedHandImg,
    alt: "Early 3D-printed prosthetic hand assembly developed by student builders",
    summary:
      "HOPE's origins began with open-source pediatric prosthetic hands, student buildathons, and cost-free community fittings, building the foundational CAD and fabrication capabilities the team relies on today.",
  },
];

interface ProjectsImpactProps {
  stories?: ProjectStoryCard[];
}

/**
 * Displays curated project case studies on the /our-work page,
 * rendering cards for active, foundational, and milestone engineering initiatives.
 */
export default function ProjectsImpact({ stories }: ProjectsImpactProps) {
  const displayProjects: ProjectDisplayItem[] =
    stories && stories.length > 0
      ? stories.map((s) => ({
          title: s.title,
          slug: s.slug,
          category: s.category || "Project Case Study",
          status: s.status || "Active",
          image: s.imageUrl || eliArmImg,
          alt: s.alt || s.title,
          summary: s.summary,
        }))
      : defaultProjects;

  return (
    <section
      id="projects-impact"
      className="border-t border-slate-200/80 bg-white py-14 sm:py-18 lg:py-22"
      aria-labelledby="projects-impact-title"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#f7d06b]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
                Projects &amp; Impact
              </span>
            </div>
            <h2
              id="projects-impact-title"
              className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl lg:text-[42px] leading-tight"
            >
              Practical needs turned into working solutions.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#1a273d]/85">
            Every project begins with a specific person, challenge, or community need.
            Here is a curated look at foundational builds and milestone projects that shaped HOPE.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <article
              key={project.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ebf3fa]">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="block h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute top-3.5 left-3.5 rounded-full bg-[#1a273d]/90 px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
              <div className="flex grow flex-col p-6">
                <span className="mb-2 text-[11px] font-bold tracking-wider text-[#1260d6] uppercase">
                  {project.status}
                </span>
                <h3 className="mb-2.5 text-xl font-bold text-[#1a273d] leading-snug">
                  {project.title}
                </h3>
                <p className="mb-6 grow text-sm leading-relaxed text-slate-700">
                  {project.summary}
                </p>
                <Link
                  href={`/stories/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a273d] hover:text-[#1260d6] hover:underline underline-offset-4"
                  aria-label={`Read the full case study: ${project.title}`}
                >
                  Read full story <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

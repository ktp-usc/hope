import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import courtneyImage from "@/public/images/projects/05_Courtney_Finger_Adaptation.jpg";
import stethoscopeImage from "@/public/images/projects/06_3D_Printed_Stethoscope.jpg";
import openerImage from "@/public/images/projects/07_Hand_Bottle_Opener_Adaptation.jpg";
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
      className="border-t border-[#dce5ef] bg-white py-22 lg:py-24"
      aria-labelledby="projects-impact-title"
    >
      <div className="mx-auto w-[calc(100%-48px)] max-w-[1280px]">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="w-fit rounded-[40px] bg-[#102743] px-4 py-1.5 text-xs font-bold tracking-[0.5px] text-white uppercase leading-[1.3]">
              Projects &amp; Impact
            </p>
            <h2
              id="projects-impact-title"
              className="mt-5 [font-family:var(--font-dm-serif),Georgia,serif] text-[clamp(32px,3.5vw,48px)] font-normal tracking-[-0.3px] text-[#102743] leading-[1.15]"
            >
              Practical needs turned into working solutions.
            </h2>
          </div>
          <p className="max-w-[640px] text-[17px] leading-[1.6] text-[#475569]">
            Every project begins with a specific person, challenge, or community need.
            Here is a curated look at foundational builds and milestone projects that shaped HOPE.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <article
              key={project.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#dce5ef] bg-white [transition:transform_0.2s_ease,box-shadow_0.2s_ease,border-color_0.2s_ease] hover:border-[#cbd5e1] hover:shadow-[0_16px_32px_-4px_rgba(16,39,67,0.1)] hover:[transform:translateY(-4px)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f1f5f9]">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="block h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute top-3.5 left-3.5 rounded-[20px] bg-[rgba(16,39,67,0.88)] px-2.5 py-1 text-[11px] font-bold tracking-[0.5px] text-white uppercase backdrop-blur-[4px]">
                  {project.category}
                </span>
              </div>
              <div className="flex grow flex-col p-6">
                <span className="mb-2 text-[11px] font-extrabold tracking-[0.6px] text-[#1260d6] uppercase">
                  {project.status}
                </span>
                <h3 className="mb-3 text-[clamp(20px,2.2vw,26px)] font-bold text-[#102743] leading-[1.25]">
                  {project.title}
                </h3>
                <p className="mb-6 grow text-sm leading-[1.6] text-[#475569]">
                  {project.summary}
                </p>
                <Link
                  href={`/stories/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#102743] no-underline leading-[1.6] [transition:color_0.15s_ease] hover:text-[#1260d6]"
                  aria-label={`Read the full case study: ${project.title}`}
                >
                  Read full story <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3" aria-label="More HOPE project photographs">
          {[
            { image: courtneyImage, caption: "Courtney's finger adaptation", alt: "Courtney showing a finger-adaptation device fitted to a hand" },
            { image: stethoscopeImage, caption: "3D-printed stethoscope", alt: "3D printer fabricating yellow stethoscope components on its build plate" },
            { image: openerImage, caption: "Early task-specific adaptation", alt: "Two articulated 3D-printed hand assemblies, one gray and one red, on a table" },
          ].map(({ image, caption, alt }) => <figure key={caption}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f1f5f9]">
              <Image src={image} alt={alt} fill sizes="(min-width: 1280px) 405px, (min-width: 768px) 30vw, 90vw" className="object-contain" />
            </div>
            <figcaption className="mt-3 text-sm text-[#475569]">{caption}</figcaption>
          </figure>)}
        </div>
      </div>
    </section>
  );
}

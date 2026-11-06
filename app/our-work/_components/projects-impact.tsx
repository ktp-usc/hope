import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import eliArmImg from "@/public/images/projects/01_Eli_Bike_Arm_Detail.jpg";
import ppeFramesImg from "@/public/images/projects/09_HOPE_Face_Shield_Frames.png";
import printedHandImg from "@/public/images/projects/08_HOPE_Printed_Hand.png";

const projects = [
  {
    title: "Eli's Bike Arm — Designing for the Ride",
    slug: "eli-bike-arm",
    category: "Adaptive Device",
    status: "Iterative Engineering",
    image: eliArmImg,
    alt: "Detail view of Eli's custom 3D-printed bike arm joint attachment",
    summary:
      "A custom-engineered support arm mounted to a bicycle, providing Eli with a stable point of contact and counterforce while riding. Researched in 2017 and fitted in spring 2018, it exemplifies HOPE's iterative design approach.",
  },
  {
    title: "When HOPE Shifted Its 3D Printers to PPE",
    slug: "covid-ppe",
    category: "Community Response",
    status: "Small-Batch Fabrication",
    image: ppeFramesImg,
    alt: "Batch of 3D-printed face shield frames fabricated during COVID-19 relief",
    summary:
      "During the pandemic, student members partnered with USC faculty and graduate students to redirect 3D printing toward mask extenders and face-shield components, answering an urgent public health need.",
  },
  {
    title: "Where HOPE's Hands-On Work Began",
    slug: "early-hands",
    category: "Prosthetic Exploration",
    status: "Foundational Roots",
    image: printedHandImg,
    alt: "Early 3D-printed prosthetic hand assembly developed by student builders",
    summary:
      "HOPE's origins began with open-source pediatric prosthetic hands, student buildathons, and cost-free community fittings, building the foundational CAD and fabrication capabilities the team relies on today.",
  },
];

export default function ProjectsImpact() {
  return (
    <section
      id="projects-impact"
      className="border-t border-[#dce5ef] bg-white py-22 lg:py-24"
      aria-labelledby="projects-impact-title"
    >
      <div className="mx-auto w-[calc(100%-48px)] max-w-[1280px]">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="w-fit rounded-[40px] bg-[#102743] px-4 py-1.5 text-xs leading-[1.3] font-bold tracking-[0.5px] text-white uppercase">Projects &amp; Impact</p>
            <h2 id="projects-impact-title" className="mt-5 [font-family:var(--font-dm-serif),Georgia,serif] text-[clamp(32px,3.5vw,48px)] leading-[1.15] font-normal tracking-[-0.3px] text-[#102743]">Practical needs turned into working solutions.</h2>
          </div>
          <p className="max-w-[640px] text-[17px] leading-[1.6] text-[#475569]">
            Every project begins with a specific person, challenge, or community need.
            Here is a curated look at foundational builds and milestone projects that shaped HOPE.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.slug} className="flex flex-col overflow-hidden rounded-2xl border border-[#dce5ef] bg-white [transition:transform_0.2s_ease,box-shadow_0.2s_ease,border-color_0.2s_ease] hover:[transform:translateY(-4px)] hover:border-[#cbd5e1] hover:shadow-[0_16px_32px_-4px_rgba(16,39,67,0.1)]">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f1f5f9]">
                <Image
                  src={project.image}
                  alt={project.alt}
                  className="block h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute top-3.5 left-3.5 rounded-[20px] bg-[rgba(16,39,67,0.88)] px-2.5 py-1 text-[11px] font-bold tracking-[0.5px] text-white uppercase backdrop-blur-[4px]">{project.category}</span>
              </div>
              <div className="flex grow flex-col p-6">
                <span className="mb-2 text-[11px] font-extrabold tracking-[0.6px] text-[#1260d6] uppercase">{project.status}</span>
                <h3 className="mb-3 text-[clamp(20px,2.2vw,26px)] leading-[1.25] font-bold text-[#102743]">{project.title}</h3>
                <p className="mb-6 grow text-sm leading-[1.6] text-[#475569]">{project.summary}</p>
                <Link
                  href={`/stories/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm leading-[1.6] font-bold text-[#102743] no-underline [transition:color_0.15s_ease] hover:text-[#1260d6]"
                  aria-label={`Read the full case study: ${project.title}`}
                >
                  Read full story <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


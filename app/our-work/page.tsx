import type { Metadata } from "next";
import OurWorkHero from "./_components/our-work-hero";
import WhatWeDo from "./_components/what-we-do";
import ProjectsImpact from "./_components/projects-impact";
import ProjectProcess from "./_components/project-process";

export const metadata: Metadata = {
  title: "Our Work | HOPE",
  description:
    "Explore HOPE's experimental devices, featured project case studies, and practical solutions developed through CAD, 3D printing, and iterative testing. Learn how we listen, design, build, and document.",
};

export default function OurWorkPage() {
  return (
    <main className="bg-white [font-family:var(--font-manrope),-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] text-base leading-[1.6] text-[#102743]">
      <OurWorkHero />
      <WhatWeDo />
      <ProjectsImpact />
      <ProjectProcess />
    </main>
  );
}

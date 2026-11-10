import OurWorkHero from "./_components/our-work-hero";
import WhatWeDo from "./_components/what-we-do";
import ProjectsImpact from "./_components/projects-impact";
import ProjectProcess from "./_components/project-process";
import { pageMetadata } from "@/lib/seo";
import { getProjectStories } from "@/sanity/lib/queries";

export const metadata = pageMetadata("Our Work", "Explore HOPE's experimental devices, project case studies, and practical solutions developed through CAD, 3D printing, and iterative testing.", "/our-work");

export const revalidate = 60;

/**
 * Our Work landing page server component featuring foundational stories,
 * Sanity-managed projects, and the iterative engineering process.
 */
export default async function OurWorkPage() {
  const stories = await getProjectStories();

  return (
    <main className="bg-white [font-family:var(--font-manrope),-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] text-base leading-[1.6] text-[#102743]">
      <OurWorkHero />
      <WhatWeDo />
      <ProjectsImpact stories={stories} />
      <ProjectProcess />
    </main>
  );
}

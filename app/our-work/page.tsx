import type { Metadata } from "next";
import OurWorkHero from "./_components/our-work-hero";
import WhatWeDo from "./_components/what-we-do";
import ProjectProcess from "./_components/project-process";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Our Work | H.O.P.E.",
  description:
    "Explore H.O.P.E.'s experimental devices and task-specific solutions, developed through CAD, 3D printing, and iterative testing. Learn how we listen, design, build, and document.",
};

export default function OurWorkPage() {
  return (
    <main className={styles.page}>
      <OurWorkHero />
      <WhatWeDo />
      <ProjectProcess />
    </main>
  );
}

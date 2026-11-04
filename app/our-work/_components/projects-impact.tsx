import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import eliArmImg from "@/public/images/projects/01_Eli_Bike_Arm_Detail.jpg";
import ppeFramesImg from "@/public/images/projects/09_HOPE_Face_Shield_Frames.png";
import printedHandImg from "@/public/images/projects/08_HOPE_Printed_Hand.png";
import styles from "../page.module.css";

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
      className={styles.projectsSection}
      aria-labelledby="projects-impact-title"
    >
      <div className={styles.container}>
        <div className={styles.projectsHeader}>
          <div>
            <p className={styles.label}>Projects &amp; Impact</p>
            <h2 id="projects-impact-title">Practical needs turned into working solutions.</h2>
          </div>
          <p className={styles.projectsIntro}>
            Every project begins with a specific person, challenge, or community need.
            Here is a curated look at foundational builds and milestone projects that shaped HOPE.
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <article key={project.slug} className={styles.projectCard}>
              <div className={styles.projectImageWrapper}>
                <Image
                  src={project.image}
                  alt={project.alt}
                  className={styles.projectImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className={styles.projectCategory}>{project.category}</span>
              </div>
              <div className={styles.projectBody}>
                <span className={styles.projectStatus}>{project.status}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectSummary}>{project.summary}</p>
                <Link
                  href={`/stories/${project.slug}`}
                  className={styles.projectLink}
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


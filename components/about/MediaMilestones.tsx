import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./MediaMilestones.module.css";

export type MediaMilestone = {
  yearOrDate: string;
  category: "Media Coverage" | "Milestone" | "Grant / Award" | "Partnership";
  title: string;
  description: string;
  image?: string | StaticImageData;
  /** Supply descriptive alt text with any informative approved image. */
  imageAlt?: string;
  /** Only supply an approved press or organizational source URL. */
  externalUrl?: string;
  /** Internal route for an existing historical story. */
  storyHref?: `/stories/${string}`;
};

export interface MediaMilestonesProps {
  milestones: readonly MediaMilestone[];
}

export default function MediaMilestones({ milestones }: MediaMilestonesProps) {
  if (!milestones.length) return null;

  return <section className={styles.section} id="media-milestones" aria-labelledby="media-milestones-title">
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 id="media-milestones-title">Media &amp; Milestones</h2>
        <p>HOPE&apos;s history is made up of projects, people, partnerships, and moments that helped move the organization forward.</p>
      </header>
      <div className={styles.grid}>
        {milestones.map(milestone => <article className={styles.card} key={`${milestone.category}-${milestone.title}`}>
          {milestone.image && <div className={styles.imageContainer}>
            <Image src={milestone.image} alt={milestone.imageAlt ?? ""} fill sizes="(max-width: 700px) 90vw, (max-width: 1440px) 40vw, 550px" className={styles.image} />
          </div>}
          <div className={styles.cardContent}>
            <div className={styles.metadata}>
              <span className={styles.category}>{milestone.category}</span>
              <span className={styles.date}>{milestone.yearOrDate}</span>
            </div>
            <h3>{milestone.title}</h3>
            <p>{milestone.description}</p>
            {milestone.storyHref && <Link href={milestone.storyHref} className={styles.sourceLink} aria-label={`Read the full story: ${milestone.title}`}>
              Read the full story <ArrowRight size={17} aria-hidden="true" />
            </Link>}
            {milestone.externalUrl && <a href={milestone.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.sourceLink} aria-label={`View source for ${milestone.title} (opens in a new tab)`}>
              View source <ArrowUpRight size={17} aria-hidden="true" />
            </a>}
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}

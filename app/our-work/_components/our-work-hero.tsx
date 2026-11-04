import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroTeamImg from "@/public/images/projects/12_Outdoor_Org_Fair_Team.jpg";
import styles from "../page.module.css";

export default function OurWorkHero() {
  return (
    <section className={styles.hero} aria-labelledby="our-work-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Assistive technology &amp; practical engineering</p>
          <h1 id="our-work-title">Our Work</h1>
          <p className={styles.heroDescription}>
            Practical needs guide hands-on engineering. HOPE Inc., an
            independent nonprofit, provides resources and organizational support.
            The separately governed HOPE student organization at USC carries
            out much of the hands-on design, building, and testing.
          </p>
          <div className={styles.heroActions}>
            <Button asChild className={styles.button}>
              <a href="#project-process">
                Explore our process <ArrowDown size={16} aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" className={styles.secondaryButton}>
              <a href="#projects-impact">View featured projects</a>
            </Button>
          </div>
        </div>
        <div className={styles.heroImageWrapper}>
          <div className={styles.heroImageFrame}>
            <Image
              src={heroTeamImg}
              alt="HOPE student organization members at the outdoor organization fair showcasing student projects and campus outreach"
              priority
              className={styles.heroImage}
              sizes="(max-width: 900px) 100vw, 540px"
            />
          </div>
          <p className={styles.heroImageCaption}>
            USC student members showcasing hands-on builds at the campus organization fair
          </p>
        </div>
      </div>
    </section>
  );
}

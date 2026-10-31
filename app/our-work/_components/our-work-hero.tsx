import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "../page.module.css";

export default function OurWorkHero() {
  return (
    <section className={styles.hero} aria-labelledby="our-work-title">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Assistive technology &amp; practical engineering</p>
        <h1 id="our-work-title">Our Work</h1>
        <p className={styles.heroDescription}>
          Practical needs guide hands-on engineering. H.O.P.E. Inc., an
          independent nonprofit, provides resources and organizational support.
          The separately governed H.O.P.E. student organization at USC carries
          out much of the hands-on design, building, and testing.
        </p>
        <Button asChild className={styles.button}>
          <a href="#project-process">
            Explore our process <ArrowDown size={16} aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
}

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import hopeLogo from "@/app/about/about-images/hope-logo.jpg";
import uscLogo from "@/app/about/about-images/usc-logo.jpg";
import styles from "./about-modules.module.css";

export interface StudentOrgModuleProps {
  /** Supply verified destinations when approved. */
  garnetGateUrl?: `https://${string}`;
}

export default function StudentOrgModule({ garnetGateUrl }: StudentOrgModuleProps) {
  return (
    <section id="student-org" className={styles.module} aria-labelledby="student-org-title">
      <h2 id="student-org-title" className={styles.heading}>Two organizations. One shared mission.</h2>
      <p className={styles.description}>
        H.O.P.E. operates as two distinct but tightly coordinated entities. Each organization maintains its own governance and responsibilities while working in unison to turn engineering into real community solutions.
      </p>

      <div className={styles.organizations}>
        <article className={`${styles.organizationCard} ${styles.nonprofit}`}>
          <Image src={hopeLogo} alt="H.O.P.E. Inc. nonprofit logo" className={styles.logo} sizes="100px" />
          <div className={styles.organizationCopy}>
            <h3>H.O.P.E. Inc.</h3>
            <span className={styles.entityLabel}>Independent 501(c)(3) Nonprofit</span>
            <ul>
              <li>Incorporated in South Carolina in 2017 to provide durable multi-year continuity.</li>
              <li>Governed by an independent Board of Directors providing fiscal oversight and legal accountability.</li>
              <li>Coordinates institutional partnerships, grant funding, equipment procurement, and long-term resources.</li>
            </ul>
          </div>
        </article>

        <article className={`${styles.organizationCard} ${styles.studentOrg}`}>
          <Image src={uscLogo} alt="H.O.P.E. student chapter logo" className={styles.logo} sizes="100px" />
          <div className={styles.organizationCopy}>
            <h3>H.O.P.E. at USC</h3>
            <span className={styles.entityLabel}>University Student Organization</span>
            <ul>
              <li>Founded at the University of South Carolina in 2016 as a student engineering chapter.</li>
              <li>Student members organize, recruit, train, and execute hands-on CAD design, 3D printing, and prototyping.</li>
              <li>Led by elected student officers who balance technical project work with collegiate campus engagement.</li>
            </ul>
            <div className={styles.buttons}>
              {garnetGateUrl ? (
                <a
                  className={`${styles.button} ${styles.garnetButton}`}
                  href={garnetGateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join via Garnet Gate <ArrowRight size={16} aria-hidden="true" />
                </a>
              ) : (
                <a
                  className={`${styles.button} ${styles.garnetButton}`}
                  href="https://garnetgate.sa.sc.edu/organization/hope"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join via Garnet Gate <ArrowRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

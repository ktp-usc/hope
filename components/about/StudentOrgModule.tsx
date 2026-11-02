import Image from "next/image";
import { ArrowRight } from "lucide-react";
import hopeLogo from "@/app/about/about-images/hope-logo.jpg";
import uscLogo from "@/app/about/about-images/usc-logo.jpg";
import styles from "./about-modules.module.css";

export interface StudentOrgModuleProps {
  /** Supply verified destinations when approved; omitted destinations render disabled buttons. */
  garnetGateUrl?: `https://${string}`;
  studentBlogUrl?: `https://${string}`;
}

export default function StudentOrgModule({ garnetGateUrl, studentBlogUrl }: StudentOrgModuleProps) {
  return <section id="student-org" className={styles.module} aria-labelledby="student-org-title">
    <span className={styles.label}>Our organizations</span>
    <h2 id="student-org-title" className={styles.heading}>Two organizations. One shared mission.</h2>
    <p className={styles.description}>H.O.P.E. has two distinct but closely coordinated organizations. The two organizations have separate governance and responsibilities but work closely toward a shared mission.</p>
    <div className={styles.organizations}>
      <article className={`${styles.organizationCard} ${styles.nonprofit}`}>
        <Image src={hopeLogo} alt="H.O.P.E. Inc. logo" className={styles.logo} sizes="100px" />
        <div className={styles.organizationCopy}>
          <h3>H.O.P.E. Inc.</h3><span className={styles.entityLabel}>Independent Nonprofit</span>
          <ul>
            <li>Incorporated in South Carolina in 2017.</li>
            <li>Independent 501(c)(3) nonprofit organization.</li>
            <li>Provides continuity, resources, funding, outside partnerships, and organizational support.</li>
          </ul>
        </div>
      </article>
      <article className={`${styles.organizationCard} ${styles.studentOrg}`}>
        <Image src={uscLogo} alt="H.O.P.E. at USC student organization logo" className={styles.logo} sizes="100px" />
        <div className={styles.organizationCopy}>
          <h3>H.O.P.E. at USC</h3><span className={styles.entityLabel}>Student Organization</span>
          <ul>
            <li>Established at the University of South Carolina in 2016.</li>
            <li>Where students organize, train, recruit, and carry out much of H.O.P.E.’s hands-on design, prototyping, manufacturing, outreach, and project work.</li>
          </ul>
          <div className={styles.buttons}>
            {garnetGateUrl
              ? <a className={`${styles.button} ${styles.garnetButton}`} href={garnetGateUrl} target="_blank" rel="noopener noreferrer">Garnet Gate <ArrowRight size={16} aria-hidden="true" /></a>
              : <button className={`${styles.button} ${styles.garnetButton}`} disabled title="Awaiting approved Garnet Gate URL">Garnet Gate <ArrowRight size={16} aria-hidden="true" /></button>}
            {/* {studentBlogUrl
              ? <a className={styles.button} href={studentBlogUrl} target="_blank" rel="noopener noreferrer">Student Organization Blog <ArrowRight size={16} aria-hidden="true" /></a>
              : <button className={styles.button} disabled title="Awaiting approved Student Organization Blog URL">Student Organization Blog <ArrowRight size={16} aria-hidden="true" /></button>} */}
          </div>
        </div>
      </article>
    </div>
  </section>;
}

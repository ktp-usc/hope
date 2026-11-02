import { ShieldCheck, Users, FileText, ChartNoAxesCombined } from "lucide-react";
import styles from "./about-modules.module.css";

const disclosures = [
  { title: "Nonprofit Status", Icon: ShieldCheck, paragraphs: ["Independent 501(c)(3) nonprofit organization.", "Incorporated in South Carolina in 2017."] },
  { title: "Governance & Oversight", Icon: Users, paragraphs: ["H.O.P.E. Inc. is governed by a Board of Directors, while student executives manage much of the nonprofit’s day-to-day work.", "The H.O.P.E. student organization at USC has its own student leadership and responsibilities. The two organizations collaborate closely while remaining distinct."] },
  { title: "Public Documents", Icon: FileText, pending: true, paragraphs: ["Future library for the IRS determination letter, filed Articles, adopted bylaws when ready, selected approved policies, annual reports, and useful public filings."] },
  { title: "Financial & Impact Information", Icon: ChartNoAxesCombined, pending: true, paragraphs: ["Future information: verified summaries, clearly defined measures, and examples showing where support goes."] },
];

export default function TransparencyModule() {
  return <section id="transparency" className={styles.module} aria-labelledby="transparency-title">
    <span className={styles.label}>Transparency &amp; governance</span>
    <h2 id="transparency-title" className={styles.heading}>Built on trust. Committed to transparency.</h2>
    <p className={styles.description}>H.O.P.E. Inc. is committed to responsible nonprofit governance, accurate recordkeeping, and meaningful transparency about its organization and work.</p>
    <div className={styles.transparencyGrid}>
      {disclosures.map(({ title, Icon, paragraphs, pending }) => <article className={styles.disclosureCard} key={title}>
        <span className={styles.disclosureIcon}><Icon size={27} strokeWidth={1.75} aria-hidden="true" /></span>
        <h3>{title}</h3>
        {pending && <span className={styles.pendingLabel}>Future information</span>}
        {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </article>)}
    </div>
  </section>;
}

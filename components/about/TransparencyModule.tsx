import { ShieldCheck, Users, FileText, ChartNoAxesCombined } from "lucide-react";
import styles from "./about-modules.module.css";

const disclosures = [
  {
    title: "Nonprofit Status",
    Icon: ShieldCheck,
    paragraphs: [
      "H.O.P.E. Inc. is an independent 501(c)(3) tax-exempt nonprofit organization incorporated in South Carolina in 2017.",
      "All charitable activities directly support student education, assistive device fabrication, and community access.",
    ],
  },
  {
    title: "Governance & Oversight",
    Icon: Users,
    paragraphs: [
      "Governed by a dedicated Board of Directors responsible for fiduciary oversight, legal compliance, and strategic direction.",
      "Student executive officers coordinate operational workflows, maintaining close alignment between campus builds and nonprofit priorities.",
    ],
  },
  {
    title: "Corporate Records & Filings",
    Icon: FileText,
    paragraphs: [
      "Maintains active standing with the South Carolina Secretary of State and complies with all state and federal charitable reporting requirements.",
      "Corporate documentation including Articles of Incorporation and determination records are maintained in our central archive.",
    ],
  },
  {
    title: "Financial Responsibility",
    Icon: ChartNoAxesCombined,
    paragraphs: [
      "Committed to rigorous stewardship of every dollar, donation, and equipment grant.",
      "Resource allocations directly fund 3D printing filament, mechanical fasteners, adaptive hardware, and student workshop safety tools.",
    ],
  },
];

export default function TransparencyModule() {
  return (
    <section id="transparency" className={styles.module} aria-labelledby="transparency-title">
      <h2 id="transparency-title" className={styles.heading}>Built on trust. Committed to transparency.</h2>
      <p className={styles.description}>
        H.O.P.E. Inc. adheres to sound nonprofit governance, accurate recordkeeping, and open communication about our organizational structure, funding, and impact.
      </p>
      <div className={styles.transparencyGrid}>
        {disclosures.map(({ title, Icon, paragraphs }) => (
          <article className={styles.disclosureCard} key={title}>
            <span className={styles.disclosureIcon} aria-hidden="true">
              <Icon size={26} strokeWidth={1.8} />
            </span>
            <h3>{title}</h3>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

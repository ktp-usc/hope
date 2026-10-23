import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, Handshake, Settings, Wrench } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About H.O.P.E.",
  description: "Hands on Prosthetic Engineering: our purpose, history, and the people helping shape H.O.P.E.",
};

const milestones = [
  "Origins",
  "Creation of HOPE Inc.",
  "Early projects",
  "COVID-era PPE work",
  "Rebuilding after COVID",
  "Current partnerships & operations",
];

const leaders = ["Abby Herschman", "Andrew Super", "Additional board leader", "Additional executive leader"];

function HandMark({ outline = false }: { outline?: boolean }) {
  return <div aria-hidden="true" className={`${styles.handMark} ${outline ? styles.outline : ""}`}>
    <span /><span /><span /><span />
  </div>;
}

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span />Hands on Prosthetic Engineering</p>
          <h1 id="about-title">About<br />H.O.P.E.</h1>
          <p>description here</p>
          <div className={styles.heroActions}>
            <a className={styles.button} href="#history">Explore our history <ArrowUpRight size={17} /></a>
            <a className={styles.scrollLink} href="#purpose">Scroll to learn more <ArrowDown size={17} /></a>
          </div>
        </div>
        <div className={styles.heroPhoto} role="img" aria-label="Photo placeholder">
          <span className={styles.photoBadge}><i />People · Process · Purpose</span>
          <HandMark />
        </div>
      </section>

      <div className={styles.cream}>
        <section id="purpose" className={`${styles.container} ${styles.purpose}`} aria-labelledby="purpose-title">
          <span className={styles.label}>Our purpose</span>
          <div className={styles.sectionHeading}>
            <h2 id="purpose-title">Built around people.<br />Grounded in making.</h2>
            <ul className={styles.tags} aria-label="Our values"><li>Hands on</li><li>Engineering</li><li>Community</li></ul>
          </div>
          <div className={styles.purposeCards}>
            <article className={`${styles.purposeCard} ${styles.blueCard}`}>
              <h3>What HOPE is</h3><span className={styles.iconCircle}><Handshake size={25} /></span>
              <p>description here</p><span className={styles.dot} />
            </article>
            <article className={`${styles.purposeCard} ${styles.yellowCard}`}>
              <h3>Why we exist</h3><span className={styles.iconCircle}><Wrench size={25} /></span>
              <p>description here</p><span className={styles.dot} />
            </article>
          </div>
        </section>

        <section id="history" className={`${styles.container} ${styles.history}`} aria-labelledby="history-title">
          <div className={styles.historyHeading}>
            <div><span className={`${styles.label} ${styles.yellowLabel}`}>Our history</span>
              <h2 id="history-title">A history of<br />hands-on action.</h2></div>
            <div className={styles.milestoneCount}><strong>06</strong><span>Milestones</span></div>
          </div>
          <ol className={styles.timeline}>
            {milestones.map((title, index) => <li key={title} className={styles.milestone}>
              <span className={styles.timelineDot} aria-hidden="true" />
              <div><h3>{title}</h3><p>description here</p></div>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            </li>)}
          </ol>
        </section>
      </div>

      <section className={`${styles.container} ${styles.present}`} aria-labelledby="present-title">
        <div className={styles.presentPhoto} role="img" aria-label="Photo placeholder">
          <span className={`${styles.label} ${styles.yellowLabel}`}>HOPE today</span>
          <div className={styles.photoAccent} aria-hidden="true"><span /><span /></div>
        </div>
        <div className={styles.presentCopy}>
          <span className={styles.label}>Present day</span>
          <h2 id="present-title">Partnerships &amp;<br />operations</h2><p>description here</p>
          <div className={styles.presentDetails}>
            <article><h3>Partnerships <Handshake size={24} /></h3><p>description here</p></article>
            <article><h3>Operations <Settings size={24} /></h3><p>description here</p></article>
          </div>
        </div>
      </section>

      <section id="leadership" className={styles.leadership} aria-labelledby="leadership-title">
        <div className={styles.container}>
          <span className={styles.label}>Leadership</span>
          <div className={styles.sectionHeading}><h2 id="leadership-title">The people helping<br />shape H.O.P.E.</h2><p>description here</p></div>
          <div className={styles.leaderGrid}>
            {leaders.map((name, index) => <article className={styles.leaderCard} key={name}>
              <div className={styles.headshot} role="img" aria-label={`Headshot placeholder for ${name}`}>
                <span className={styles.photoBadge}><i className={index % 2 ? styles.red : ""} />Headshot forthcoming</span>
              </div>
              <div className={styles.leaderCopy}><h3>{name}</h3><p>description here</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className={styles.takePart} aria-labelledby="take-part-title">
        <div className={`${styles.container} ${styles.takePartInner}`}>
          <div className={styles.takePartCopy}><span className={styles.eyebrow}>Take part</span>
            <h2 id="take-part-title">Help move<br />H.O.P.E. forward.</h2>
            <div className={styles.takePartActions}><p>description here</p>
              <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.yellowButton}`} disabled title="Support HOPE page coming soon">Support HOPE <ArrowUpRight size={17} /></button>
                <button className={styles.button} disabled title="Get involved page coming soon">Get involved <ArrowUpRight size={17} /></button>
              </div>
            </div>
          </div>
          <div className={styles.handIllustration} aria-hidden="true"><HandMark outline /><div className={styles.palmLines}><span /><span /><span /></div><span className={styles.palmAccent} /></div>
        </div>
      </section>
    </main>
  );
}

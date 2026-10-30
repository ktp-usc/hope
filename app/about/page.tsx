import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Handshake, Settings, Wrench } from "lucide-react";
import styles from "./page.module.css";
import workshopImage from "./about-images/13_Creativibe_Display_Team.jpg";
import presentDayImage from "./about-images/11_First_HOPE_Printer_Build.jpg";

export const metadata: Metadata = {
  title: "About H.O.P.E.",
  description: "Hands on Prosthetic Engineering: our purpose, history, and the people helping shape H.O.P.E.",
};

const milestones = [
  { title: "Origins", description: "H.O.P.E. began at the University of South Carolina in 2016, when students came together to explore 3D-printed prosthetic hands and upper-limb solutions for children. Early projects drew on designs and resources shared through the open-source prosthetics community." },
  { title: "Creation of H.O.P.E. Inc.", description: "In 2017, H.O.P.E. Inc. was incorporated as a separate South Carolina nonprofit to provide long-term continuity, resources, partnerships, and organizational support beyond individual student leadership cycles." },
  { title: "Early projects", description: "As students gained experience, H.O.P.E. expanded beyond existing prosthetic-hand designs to develop customized solutions. Projects like Eli’s Bike Arm, researched beginning in 2017 and first fitted in spring 2018, demonstrated the value of iterative, task-specific engineering." },
  { title: "COVID-era PPE work", description: "During the COVID-19 response, H.O.P.E. redirected its 3D-printing capabilities toward producing mask extenders and face-shield components, applying its engineering skills to an urgent community need." },
  { title: "Rebuilding after COVID", description: "Like many student organizations, H.O.P.E. faced significant disruption during the pandemic. Its continued development has focused on building upon its original mission through student training, hands-on engineering, and expanded project opportunities." },
  { title: "Current partnerships & operations", description: "Today, H.O.P.E. continues its work in experimental prosthetics, adaptive technologies, accessibility solutions, and student-led engineering. Collaborations with universities, nonprofits, and community partners help expand its capabilities and opportunities." },
];

// Role summaries from the working content packet, not individual biographies.
const leaders = [
  { name: "Abby Herschman", role: "Chair, H.O.P.E. Inc. Board of Directors", description: "Provides board leadership and governance oversight for H.O.P.E. Inc., supporting the nonprofit’s long-term mission and organizational continuity." },
  { name: "Andrew Super", role: "Vice Chair, H.O.P.E. Inc. Board of Directors", description: "Serves as Vice Chair of the Board, contributing to nonprofit oversight, organizational continuity, and support for H.O.P.E.’s mission." },
  { name: "Ashley Turner", role: "Board Director, Logistics", description: "Serves on the H.O.P.E. Inc. Board of Directors with a focus on logistics and organizational support." },
  { name: "Matthew Yvon", role: "Chief Executive Officer, H.O.P.E. Inc.", description: "Leads H.O.P.E. Inc.’s executive operations, helping coordinate the nonprofit’s resources, activities, and organizational development." },
];

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
          <p>H.O.P.E. is a student-powered engineering community turning practical needs into practical solutions. From experimental prosthetics to custom assistive technologies, we bring students together to design, build, and make a difference.</p>
          <div className={styles.heroActions}>
            <a className={styles.button} href="#history">Explore our history <ArrowUpRight size={17} /></a>
            <a className={styles.scrollLink} href="#purpose">Scroll to learn more <ArrowDown size={17} /></a>
          </div>
        </div>
        <div className={styles.heroPhoto}>
          <Image
            src={workshopImage}
            alt="H.O.P.E. members with their engineering project display."
            fill
            sizes="(max-width: 700px) 100vw, 45vw"
            className={styles.panelImage}
            preload
          />
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
              <p>H.O.P.E. brings students together to develop experimental prosthetics, assistive technologies, and practical engineering solutions. Through hands-on design, CAD, 3D printing, and prototyping, students gain real-world experience while contributing to meaningful projects.</p><span className={styles.dot} aria-hidden="true" />
            </article>
            <article className={`${styles.purposeCard} ${styles.yellowCard}`}>
              <h3>Why we exist</h3><span className={styles.iconCircle}><Wrench size={25} /></span>
              <p>Our mission connects hands-on learning with real community needs. By designing adaptable, task-specific solutions, H.O.P.E. gives students the opportunity to develop technical and leadership skills while creating technologies that can make a difference in people’s lives.</p><span className={styles.dot} aria-hidden="true" />
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
            {milestones.map(({ title, description }, index) => <li key={title} className={styles.milestone}>
              <span className={styles.timelineDot} aria-hidden="true" />
              <div><h3>{title}</h3><p>{description}</p></div>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            </li>)}
          </ol>
        </section>
      </div>

      <section className={`${styles.container} ${styles.present}`} aria-labelledby="present-title">
        <div className={styles.presentPhoto}>
          <Image
            src={presentDayImage}
            alt="Students gathered around a 3D printer during a hands-on H.O.P.E. workshop."
            fill
            sizes="(max-width: 700px) 90vw, (max-width: 1440px) 44vw, 630px"
            className={styles.panelImage}
          />
          <span className={`${styles.label} ${styles.yellowLabel}`}>HOPE today</span>
          <div className={styles.photoAccent} aria-hidden="true"><span /><span /></div>
        </div>
        <div className={styles.presentCopy}>
          <span className={styles.label}>Present day</span>
          <h2 id="present-title">Partnerships &amp;<br />operations</h2><p>H.O.P.E. operates through two distinct but closely coordinated organizations: H.O.P.E. Inc., an independent 501(c)(3) nonprofit, and the H.O.P.E. student organization at the University of South Carolina. Together, they connect student-led engineering with long-term organizational support and community partnerships.</p>
          <div className={styles.presentDetails}>
            <article><h3>Partnerships <Handshake size={24} /></h3><p>H.O.P.E. collaborates with universities, nonprofits, and community organizations to expand opportunities for engineering, education, and service. Its relationships include the University of South Carolina and e-NABLE. An institutional collaboration with the Medical University of South Carolina is still developing. Its historical relationship with the former USC/Columbia Technology Incubator connects it to the Midlands Innovation X-Change; an active formal partnership has not been confirmed.</p></article>
            <article><h3>Operations <Settings size={24} /></h3><p>H.O.P.E. Inc. provides nonprofit oversight, funding, resources, and external partnerships, while the USC student organization coordinates much of the hands-on design, prototyping, manufacturing, recruitment, and training. Each organization maintains its own governance and responsibilities.</p></article>
          </div>
        </div>
      </section>

      <section id="leadership" className={styles.leadership} aria-labelledby="leadership-title">
        <div className={styles.container}>
          <span className={styles.label}>Leadership</span>
          <div className={styles.sectionHeading}><h2 id="leadership-title">The people helping<br />shape H.O.P.E.</h2><p>H.O.P.E. combines student-driven leadership with long-term nonprofit oversight. Its Board of Directors provides continuity and governance, while executive and student leaders guide daily operations, projects, and organizational development.</p></div>
          <div className={styles.leaderGrid}>
            {leaders.map(({ name, role, description }, index) => <article className={styles.leaderCard} key={name}>
              <div className={styles.headshot} role="img" aria-label={`Headshot placeholder for ${name}`}>
                <span className={styles.photoBadge}><i className={index % 2 ? styles.red : ""} />Headshot forthcoming</span>
              </div>
              <div className={styles.leaderCopy}><h3>{name}</h3><p className={styles.leaderRole}>{role}</p><p>{description}</p></div>
            </article>)}
          </div>
          <section className={styles.studentLeadership} aria-labelledby="student-leadership-title">
            <h3 id="student-leadership-title">Student Organization Leadership</h3>
            <article className={styles.studentCard}>
              <h4>Trinity Oglesby</h4>
              <p className={styles.leaderRole}>President, H.O.P.E. Student Organization at USC</p>
              <p>Leads the university-based student organization, where students organize, train, recruit, and carry out much of H.O.P.E.’s hands-on project work.</p>
            </article>
          </section>
        </div>
      </section>

      <section className={styles.takePart} aria-labelledby="take-part-title">
        <div className={`${styles.container} ${styles.takePartInner}`}>
          <div className={styles.takePartCopy}><span className={styles.eyebrow}>Take part</span>
            <h2 id="take-part-title">Help move<br />H.O.P.E. forward.</h2>
            <div className={styles.takePartActions}><p>Every project begins with people willing to contribute. Whether you’re a student, community partner, professional, or supporter, there are opportunities to help H.O.P.E. turn engineering skills into meaningful solutions.</p>
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, FileBadge } from "lucide-react";
import TimelineReveal from "./timeline-reveal";
import styles from "./page.module.css";
import workshop from "./history-images/14_Big_Wednesday_Team.jpg";
import hand from "./history-images/08_HOPE_Printed_Hand.png";
import fair from "./history-images/12_Outdoor_Org_Fair_Team.jpg";
import shields from "./history-images/09_HOPE_Face_Shield_Frames.png";
import team from "./history-images/13_Creativibe_Display_Team.jpg";
import eli from "./history-images/02_Eli_On_Bicycle.jpg";
import printerBuild from "./history-images/11_First_HOPE_Printer_Build.jpg";

export const metadata: Metadata = { title: "Our History | H.O.P.E.", description: "From 3D-printed hands to a broader engineering mission. Explore the people, projects, and milestones that shaped H.O.P.E." };

// Photographs illustrate milestones; their placement does not date the photographs.
const milestones = [
  { period: "2016", title: "Where It All Began", image: fair, alt: "H.O.P.E. members at an outdoor organization fair", color: "blue", description: "In 2016, the H.O.P.E. student organization was established at the University of South Carolina. Students began exploring how 3D printing could create prosthetic hands and upper-limb solutions for children, laying the foundation for a community of learning, collaboration, and service." },
  { period: "2017", title: "Building Something That Lasts", image: null, alt: "", color: "red", description: "In 2017, H.O.P.E. Inc. was incorporated as a separate South Carolina nonprofit organization to provide greater continuity, resources, organizational support, and external relationships beyond individual student leadership cycles. The nonprofit and USC student organization developed separate but complementary roles." },
  { period: "2017–2018", title: "Engineering for the Individual", image: printerBuild, alt: "H.O.P.E. students collaborating around a 3D printer", color: "yellow", description: "As students developed their skills, the organization began exploring more customized solutions, expanding beyond existing designs to address individual needs through prototyping, testing, and iterative engineering." },
  { period: "COVID-19", title: "Engineering Through a Crisis", image: shields, alt: "Colorful 3D-printed face-shield frames produced by H.O.P.E.", color: "purple", description: "During the COVID-19 response, H.O.P.E. members redirected their 3D-printing capabilities toward producing mask extenders and face-shield components. Working alongside a University of South Carolina professor and graduate students, members applied their design and fabrication skills to a different community need." },
  { period: "Post-COVID", title: "Rebuilding and Moving Forward", image: workshop, alt: "H.O.P.E. members gathered with their engineering project display", color: "blue", description: "Like many student organizations, H.O.P.E. experienced significant disruption during the pandemic. Its continued development has remained centered on student learning, practical engineering, and meaningful community projects. The combination of student-driven work and nonprofit continuity provides a foundation for future growth." },
  { period: "Today", title: "A Broader Engineering Mission", image: team, alt: "H.O.P.E. members with their organization’s project display", color: "red", description: "Today, H.O.P.E. continues building on its roots through experimental prosthetic devices, task-specific assistive technologies, adaptive designs, accessibility solutions, student training, community service, and partnerships with other institutions and organizations." },
];
const storyLinks: Readonly<Record<string, string>> = {
  "2016": "/stories/hands-on-beginnings",
  "COVID-19": "/stories/ppe-response",
};

function SectionLabel({ children }: { children: React.ReactNode }) { return <p className={styles.label}><span aria-hidden="true" />{children}</p>; }
function Accents({ className = "" }: { className?: string }) { return <div className={`${styles.accents} ${className}`} aria-hidden="true"><span /><span /><span /></div>; }
function Dinosaur() { return <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 68c22 7 35-5 45-18l11-12 6-23c3-10 15-11 23-7l12 9-5 10-14-1-7 26 8 12-8 7-9-10-8 10 1 17H51l-2-13-13 1-7 10H17l7-15Z" /><path d="m66 40 12 4 11-7m-39 22 8 6m20-52 3-2m8 7h1M18 67l-12-7" /></svg>; }

export default function HistoryPage() {
  return <main className={styles.page}>
    <section className={styles.hero} aria-labelledby="history-title">
      <div className={styles.heroCopy}>
        <SectionLabel>Our story</SectionLabel>
        <h1 id="history-title">Built by students.<br />Driven by possibility.</h1>
        <p>What began as a student effort to create 3D-printed prosthetic hands has grown into a broader mission of hands-on engineering, practical problem-solving, and community impact. Explore the people, projects, and milestones that shaped H.O.P.E.</p>
        <a className={`${styles.button} ${styles.blueButton}`} href="#timeline">Explore our history <ArrowDown size={18} aria-hidden="true" /></a><Accents />
      </div>
      <div className={styles.heroVisual}><Image src={workshop} alt="H.O.P.E. students gathered around engineering equipment in a workshop" fill preload sizes="(max-width: 850px) 100vw, 50vw" className={styles.cover} /></div>
    </section>
    <section className={`${styles.container} ${styles.introduction}`} aria-labelledby="intro-title">
      <div><SectionLabel>Where it started</SectionLabel><h2 id="intro-title">From 3D-printed hands to a broader engineering mission.</h2>
        <p>H.O.P.E. began at the University of South Carolina with students interested in using 3D printing to create prosthetic hands and other upper-limb solutions for children. Early work focused on printing, assembling, fitting, and adapting designs shared through the open-source prosthetics community.</p>
        <p>As students developed their skills, the organization began exploring more customized solutions, expanding beyond existing designs to address individual needs through prototyping, testing, and iterative engineering.</p>
      </div>
      <div className={styles.originVisual}><div className={styles.originPhoto}><Image src={hand} alt="A white 3D-printed prosthetic hand on a wooden table" fill sizes="(max-width: 850px) 90vw, 40vw" className={styles.cover} /></div>
        <p className={styles.floatingCard}>Student-driven.<br />Community-focused.<br />Real-world impact.</p><Accents /><Accents className={styles.originRightAccents} />
      </div>
    </section>
    <section id="timeline" className={styles.timelineSection} aria-labelledby="timeline-title"><div className={styles.container}>
      <SectionLabel>Our timeline</SectionLabel><h2 id="timeline-title">Key moments in H.O.P.E.’s journey.</h2>
      <p className={styles.timelineIntro}>From a student organization to a broader engineering mission, here are some of the milestones that have shaped our work, our community, and our impact.</p>
      <TimelineReveal><ol className={styles.timeline}>{milestones.map(({ period, title, image, alt, color, description }) => <li key={period} className={`${styles.milestone} ${styles[color]}`}>
        <span className={styles.marker} aria-hidden="true" />
        <div className={styles.milestoneVisual}>{image ? <Image src={image} alt={alt} unoptimized={image === shields} fill sizes="(max-width: 850px) 85vw, 42vw" className={styles.cover} /> : <div className={styles.nonprofit}><FileBadge size={106} strokeWidth={1.25} aria-hidden="true" /><div><h3>A stronger foundation<br />for a bigger impact.</h3><p>H.O.P.E. Inc. was established to expand our reach, resources, and long-term sustainability.</p></div></div>}</div>
        <div className={styles.milestoneCopy}><p className={styles.period}>{period}</p><h3>{title}</h3><p>{description}</p>
          {storyLinks[period] && <Link className={styles.storyLink} href={storyLinks[period]}>Read the full story <ArrowRight size={16} aria-hidden="true" /></Link>}
        </div>
      </li>)}</ol></TimelineReveal>
    </div></section>
    <section className={styles.featured} aria-labelledby="featured-title"><div className={`${styles.wideContainer} ${styles.featuredInner}`}>
      <div className={styles.featuredCopy}><SectionLabel>Featured story · 2017–2018</SectionLabel><h2 id="featured-title">Eli’s Bike Arm</h2>
        <p>Eli’s Bike Arm became an early example of task-specific engineering, adding a point of contact and counterforce to help Eli ride his bicycle.</p>
        <aside className={styles.callout}><Dinosaur /><div><h4>A design with personality.</h4><p>Its shape resembled a dinosaur arm, leading to the nickname “Elijasaur.”</p></div></aside>
        <Link className={`${styles.button} ${styles.blueButton} ${styles.featuredStoryLink}`} href="/stories/elis-bike-arm">Explore Eli&apos;s Story <ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
      <div className={styles.storyPhotos}><Image src={eli} alt="Eli smiling on his adapted bicycle with the custom bike arm attached" sizes="(max-width: 850px) 90vw, 45vw" className={styles.mainStoryPhoto} />
      </div>
    </div></section>
    <section className={styles.cta} aria-labelledby="next-title"><div className={`${styles.wideContainer} ${styles.ctaInner}`}>
      <div><SectionLabel>What’s next</SectionLabel><h2 id="next-title">Be part of what comes next.</h2><p>H.O.P.E.’s story continues through the students, volunteers, partners, and supporters who help turn ideas into real-world impact.</p></div>
      <div className={styles.buttons}><button className={styles.button} disabled title="Get Involved page coming soon">Get Involved <ArrowRight size={18} aria-hidden="true" /></button><button className={`${styles.button} ${styles.outlineButton}`} disabled title="Support H.O.P.E. page coming soon">Support H.O.P.E. <ArrowRight size={18} aria-hidden="true" /></button></div>
    </div><Accents /></section>
  </main>;
}

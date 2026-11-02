import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Handshake, HeartHandshake, Sparkles, Wrench } from "lucide-react";
import styles from "./page.module.css";
import workshopImage from "./about-images/13_Creativibe_Display_Team.jpg";
import presentDayImage from "./about-images/11_First_HOPE_Printer_Build.jpg";
import StudentOrgModule from "@/components/about/StudentOrgModule";
import TransparencyModule from "@/components/about/TransparencyModule";

export const metadata: Metadata = {
  title: "About H.O.P.E. | Hands on Prosthetic Engineering",
  description: "Hands on Prosthetic Engineering: our mission, history, and the people turning practical needs into custom assistive solutions.",
};

const milestones = [
  {
    year: "2016",
    title: "Origins at South Carolina",
    description: "H.O.P.E. began at the University of South Carolina when engineering students came together to explore 3D-printed prosthetic hands for children, drawing on designs from the open-source prosthetics community.",
  },
  {
    year: "2017",
    title: "Incorporation of H.O.P.E. Inc.",
    description: "H.O.P.E. Inc. was incorporated as an independent South Carolina nonprofit to provide long-term continuity, resources, and governance beyond student graduation cycles.",
  },
  {
    year: "2018",
    title: "Eli’s Bike Arm & Custom Engineering",
    description: "Expanded beyond standard hands into custom adaptations. Eli’s Bike Arm—researched in 2017 and fitted in spring 2018—proved the power of iterative, task-specific engineering.",
  },
  {
    year: "2020",
    title: "COVID-19 PPE Response",
    description: "During the pandemic, members redirected 3D-printing equipment toward producing face-shield frames and mask extenders, adapting engineering skills to an urgent regional healthcare need.",
  },
  {
    year: "2022",
    title: "Rebuilding & Lab Expansion",
    description: "Focused on rebuilding after pandemic disruptions by deepening hands-on student training in CAD, rapid prototyping, and additive manufacturing.",
  },
  {
    year: "Present",
    title: "Collaborations & Continual Impact",
    description: "Today, H.O.P.E. advances experimental prosthetics, accessibility tools, and assistive devices in collaboration with universities, clinics, and community partners.",
  },
];

const leaders = [
  {
    name: "Abby Herschman",
    role: "Chair, Board of Directors",
    initials: "AH",
    description: "Provides board governance and strategic oversight for H.O.P.E. Inc., supporting long-term continuity and compliance.",
  },
  {
    name: "Andrew Super",
    role: "Vice Chair, Board of Directors",
    initials: "AS",
    description: "Serves as Vice Chair, guiding organizational development, nonprofit partnerships, and mission alignment.",
  },
  {
    name: "Ashley Turner",
    role: "Board Director, Logistics",
    initials: "AT",
    description: "Directs technical logistics, digital infrastructure, domain operations, and historical archive management.",
  },
  {
    name: "Matthew Yvon",
    role: "Chief Executive Officer, H.O.P.E. Inc.",
    initials: "MY",
    description: "Leads nonprofit executive operations, resource allocation, and coordination across student and community initiatives.",
  },
  {
    name: "Trinity Oglesby",
    role: "President, USC Student Organization",
    initials: "TO",
    description: "Leads the university student chapter at USC, coordinating member training, workshop builds, and hands-on fabrication.",
  },
];

function HandMark({ outline = false }: { outline?: boolean }) {
  return (
    <div aria-hidden="true" className={`${styles.handMark} ${outline ? styles.outline : ""}`}>
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroCopy}>
          <h1 id="about-title">Hands on Prosthetic Engineering</h1>
          <p className={styles.heroLead}>
            H.O.P.E. is a student-powered engineering community turning practical needs into real solutions.
            From experimental pediatric prosthetics to custom assistive tools, we bring collegiate makers together to design, build, and deliver without commercial barriers.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#history">
              Explore our history <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className={styles.secondaryAction} href="#purpose">
              Our purpose &amp; values <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className={styles.heroPhoto}>
          <Image
            src={workshopImage}
            alt="H.O.P.E. team members demonstrating engineering project prototypes at a campus display."
            fill
            sizes="(max-width: 700px) 100vw, 45vw"
            className={styles.panelImage}
            priority
          />
          <HandMark />
        </div>
      </section>

      {/* Purpose Section */}
      <section id="purpose" className={styles.purposeSection} aria-labelledby="purpose-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <h2 id="purpose-title">Built around people.<br />Grounded in making.</h2>
              <p className={styles.sectionSubtext}>
                Our charitable roots started in 3D-printed pediatric prosthetics. Today, we develop custom, task-specific adaptations that empower individuals and give students hands-on technical purpose.
              </p>
            </div>
            <ul className={styles.tags} aria-label="Core values">
              <li>Hands-on Engineering</li>
              <li>Iterative Design</li>
              <li>Community Service</li>
            </ul>
          </div>

          <div className={styles.purposeGrid}>
            <article className={`${styles.purposeCard} ${styles.blueCard}`}>
              <div className={styles.cardHeader}>
                <span className={styles.iconCircle} aria-hidden="true">
                  <Wrench size={24} />
                </span>
                <h3>What We Do</h3>
              </div>
              <p>
                We design and fabricate experimental upper-limb prosthetics, assistive mechanisms, and adaptive tools.
                Using CAD modeling, 3D printing, and iterative physical testing, students solve real challenges that off-the-shelf devices do not address.
              </p>
            </article>

            <article className={`${styles.purposeCard} ${styles.creamCard}`}>
              <div className={styles.cardHeader}>
                <span className={styles.iconCircle} aria-hidden="true">
                  <Handshake size={24} />
                </span>
                <h3>Why It Matters</h3>
              </div>
              <p>
                Every project connects student education directly with individual human dignity.
                Recipients receive tailored assistive solutions free of charge, while student engineers gain production-grade design, prototyping, and leadership experience.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className={styles.historySection} aria-labelledby="history-title">
        <div className={styles.container}>
          <div className={styles.sectionHeaderSimple}>
            <h2 id="history-title">A history of hands-on action</h2>
            <p className={styles.historyIntro}>
              From our first 3D printer build in 2016 to custom pediatric engineering and pandemic emergency manufacturing, here is how H.O.P.E. evolved.
            </p>
          </div>

          <ol className={styles.timeline}>
            {milestones.map(({ year, title, description }, index) => (
              <li key={title} className={styles.milestone}>
                <div className={styles.milestoneMarker}>
                  <span className={styles.timelineDot} aria-hidden="true" />
                  <span className={styles.milestoneYear}>{year}</span>
                </div>
                <div className={styles.milestoneBody}>
                  <span className={styles.milestoneIndex}>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Engineering & Collaborations Section */}
      <section className={styles.collaborationsSection} aria-labelledby="collaborations-title">
        <div className={styles.container}>
          <div className={styles.collabLayout}>
            <div className={styles.presentPhoto}>
              <Image
                src={presentDayImage}
                alt="Students assembled around an early 3D printer workshop build."
                fill
                sizes="(max-width: 700px) 90vw, (max-width: 1440px) 44vw, 630px"
                className={styles.panelImage}
              />
              <div className={styles.photoAccent} aria-hidden="true">
                <span />
                <span />
              </div>
            </div>

            <div className={styles.presentCopy}>
              <h2 id="collaborations-title">Engineering &amp; community collaborations</h2>
              <p className={styles.collabIntro}>
                H.O.P.E.’s work thrives through collaborative relationships with academic institutions, makerspaces, open-source communities, and regional healthcare partners.
              </p>
              <div className={styles.collabCards}>
                <article className={styles.collabCard}>
                  <h3>
                    <span>e-NABLE Community</span>
                    <HeartHandshake size={20} className={styles.collabIcon} aria-hidden="true" />
                  </h3>
                  <p>
                    Longstanding ties to the global open-source assistive design community provide foundational CAD models, assembly references, and a global network of peer innovators.
                  </p>
                </article>
                <article className={styles.collabCard}>
                  <h3>
                    <span>Clinical &amp; University Partners</span>
                    <Sparkles size={20} className={styles.collabIcon} aria-hidden="true" />
                  </h3>
                  <p>
                    Ongoing collaborations with the University of South Carolina, Kappa Theta Pi, and developing initiatives with the Medical University of South Carolina explore how additive manufacturing directly aids rehabilitation.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authoritative Dual-Organization Module */}
      <StudentOrgModule garnetGateUrl="https://garnetgate.sa.sc.edu/organization/hope" />

      {/* Leadership Section */}
      <section id="leadership" className={styles.leadershipSection} aria-labelledby="leadership-title">
        <div className={styles.container}>
          <div className={styles.sectionHeaderSimple}>
            <h2 id="leadership-title">People guiding H.O.P.E.</h2>
            <p className={styles.leadershipIntro}>
              Our model pairs student operational initiative with long-term 501(c)(3) nonprofit governance. Board directors provide institutional stability, while student leaders run weekly lab builds and campus recruitment.
            </p>
          </div>

          <div className={styles.leaderGrid}>
            {leaders.map(({ name, role, initials, description }) => (
              <article className={styles.leaderCard} key={name}>
                <div className={styles.avatarHeader}>
                  <div className={styles.monogramAvatar} aria-hidden="true">
                    {initials}
                  </div>
                  <div>
                    <h3>{name}</h3>
                    <p className={styles.leaderRole}>{role}</p>
                  </div>
                </div>
                <p className={styles.leaderBio}>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Module */}
      <TransparencyModule />
      
    </main>
  );
}

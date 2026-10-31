import styles from "../page.module.css";

export default function WhatWeDo() {
  return (
    <section className={styles.work} aria-labelledby="what-we-do-title">
      <div className={`${styles.container} ${styles.workGrid}`}>
        <div>
          <p className={styles.label}>What we do</p>
          <h2 id="what-we-do-title">Engineering around a practical need.</h2>
        </div>
        <div className={styles.workCopy}>
          <p>
            H.O.P.E. develops experimental prosthetic devices, assistive
            technologies, adaptive designs, and accessibility solutions.
            Task-specific engineering shapes a solution around the person,
            the activity, and its practical demands.
          </p>
          <p>
            Projects may adapt existing or publicly shared designs, modify
            components, develop new features, or create customized solutions.
            Students use computer-aided design (CAD), 3D printing, prototyping,
            manufacturing, and fabrication, refining designs through iterative
            testing as they learn more about the person and the task.
          </p>
          <p>
            Beyond prosthetic and assistive devices, these engineering
            capabilities may also support service, training, outreach, and
            other practical projects that fit H.O.P.E.&apos;s mission and capacity.
          </p>
        </div>
      </div>
    </section>
  );
}

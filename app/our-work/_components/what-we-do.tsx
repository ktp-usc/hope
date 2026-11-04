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
            HOPE develops experimental prosthetic devices and other assistive
            technologies, ranging from custom, task-specific solutions to adaptive designs.
            Task-specific engineering shapes a solution around the person,
            the activity, and its practical demands.
          </p>
          <p>
            Some projects begin with an existing or publicly shared design that can be
            adapted to a specific need. Others involve modifying components, developing
            new features, or creating a more customized approach. Students draw on
            computer-aided design (CAD), 3D printing, prototyping, manufacturing,
            fabrication, and iterative testing, refining designs as they learn more
            about the problem, the person using the device, and the demands of the task.
          </p>
          <p>
            Not every HOPE project is a prosthetic or assistive device. The same design
            and manufacturing capabilities may also support service, training, outreach,
            fundraising, and other practical engineering work. Historical examples include
            student build activities and small-batch printing for community-service efforts,
            including Children&apos;s Miracle Network-related events. These projects help
            students build repeatable manufacturing, quality, teamwork, and
            production-logistics skills.
          </p>
          <p>
            HOPE considers assistive, adaptive, accessibility, and other practical
            engineering projects when they fit the mission, available capabilities, and
            current capacity.
          </p>
        </div>
      </div>
    </section>
  );
}

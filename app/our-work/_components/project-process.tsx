import styles from "../page.module.css";

const steps = [
  {
    title: "Listen and define",
    description:
      "Start with the person and the task. Understand the practical need, the activity the device should support, and the constraints that will guide the design.",
  },
  {
    title: "Design and iterate",
    description:
      "Develop CAD models, make prototypes, and print or fabricate components. Fit and test the design, gather feedback, and revise it as the team learns what needs to change.",
  },
  {
    title: "Build and document",
    description:
      "Assemble and evaluate the resulting solution. Document the design, build, and testing, preserving decisions and lessons learned to inform future work.",
  },
];

export default function ProjectProcess() {
  return (
    <section
      id="project-process"
      className={styles.process}
      aria-labelledby="project-process-title"
      tabIndex={-1}
    >
      <div className={styles.container}>
        <div className={styles.processHeading}>
          <div>
            <p className={styles.label}>How we work</p>
            <h2 id="project-process-title">Our project process</h2>
          </div>
          <p>
            Projects often move through these stages, connecting practical needs
            with hands-on learning from understanding a task to documenting a build.
          </p>
        </div>
        <ol className={styles.steps} role="list">
          {steps.map((step, index) => (
            <li className={styles.step} key={step.title}>
              <span className={styles.stepNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

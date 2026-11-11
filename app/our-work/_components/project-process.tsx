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
      className="scroll-mt-6 bg-[#faf8f5] px-6 py-14 sm:py-18 lg:py-22"
      aria-labelledby="project-process-title"
      tabIndex={-1}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#f7d06b]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
              How we work
            </span>
          </div>
          <h2
            id="project-process-title"
            className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl lg:text-[42px] leading-tight"
          >
            Our project process
          </h2>
        </div>

        <ol className="mt-8 list-none p-0" role="list">
          {steps.map((step, index) => (
            <li
              className="grid grid-cols-[48px_minmax(0,1fr)] gap-5 border-t border-slate-200 py-8 last:border-b lg:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-x-8 lg:py-10"
              key={step.title}
            >
              <span
                className="flex size-12 items-center justify-center rounded-xl bg-[#f7d06b] text-base font-bold text-[#12303f] shadow-sm"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="self-center text-xl font-bold text-[#1a273d]">
                {step.title}
              </h3>
              <p className="col-start-2 max-w-2xl text-base leading-relaxed text-[#1a273d] lg:col-start-3">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

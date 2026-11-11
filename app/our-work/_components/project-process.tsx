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
      className="scroll-mt-6 bg-[#fbf9f4] py-22 focus-visible:outline-[3px] focus-visible:-outline-offset-4 focus-visible:outline-[#102743] lg:py-24"
      aria-labelledby="project-process-title"
      tabIndex={-1}
    >
      <div className="mx-auto w-[calc(100%-48px)] max-w-[1280px]">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="w-fit rounded-[40px] bg-[#102743] px-4 py-1.5 text-xs leading-[1.3] font-bold tracking-[0.5px] text-white uppercase">How we work</p>
            <h2 id="project-process-title" className="mt-5 text-[clamp(32px,3.5vw,48px)] leading-[1.15] font-bold tracking-[-0.3px] text-[#102743]">Our project process</h2>
          </div>
        </div>
        <ol className="mt-10 list-none p-0 md:mt-12" role="list">
          {steps.map((step, index) => (
            <li className="grid grid-cols-[48px_minmax(0,1fr)] gap-5 border-t border-[#dce5ef] py-8 last:border-b lg:grid-cols-[64px_minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-x-8 lg:py-10" key={step.title}>
              <span className="flex size-12 items-center justify-center rounded-full bg-[#ffd84d] text-base leading-[1.6] font-extrabold text-[#102743]" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="self-center text-[clamp(20px,2.2vw,26px)] leading-[1.25] font-bold text-[#102743]">{step.title}</h3>
              <p className="col-start-2 max-w-[680px] leading-[1.6] text-[#475569] lg:col-start-3">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

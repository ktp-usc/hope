export default function WhatWeDo() {
  return (
    <section className="bg-[#faf8f5] px-6 py-14 sm:py-18 lg:py-22" aria-labelledby="what-we-do-title">
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-[1fr_1.25fr] md:gap-14">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#f7d06b]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
              What we do
            </span>
          </div>
          <h2
            id="what-we-do-title"
            className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl lg:text-[42px] leading-tight"
          >
            Engineering around a practical need.
          </h2>
        </div>
        <div className="space-y-4 text-base leading-relaxed text-[#1a273d]">
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

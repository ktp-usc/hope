export default function WhatWeDo() {
  return (
    <section className="bg-[#fbf9f4] py-20 lg:py-24" aria-labelledby="what-we-do-title">
      <div className="mx-auto w-[calc(100%-48px)] max-w-[1280px] grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-12">
        <div>
          <p className="w-fit rounded-[40px] bg-[#102743] px-4 py-1.5 text-xs leading-[1.3] font-bold tracking-[0.5px] text-white uppercase">What we do</p>
          <h2 id="what-we-do-title" className="mt-5 [font-family:var(--font-dm-serif),Georgia,serif] text-[clamp(32px,3.5vw,48px)] leading-[1.15] font-normal tracking-[-0.3px] text-[#102743]">Engineering around a practical need.</h2>
        </div>
        <div className="grid max-w-[680px] gap-5 text-base text-[#475569] [&_p]:leading-[1.7]">
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

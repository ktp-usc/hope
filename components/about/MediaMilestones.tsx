import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export type MediaMilestone = {
  yearOrDate: string;
  category: "Media Coverage" | "Milestone" | "Grant / Award" | "Partnership";
  title: string;
  description: string;
  image?: string | StaticImageData;
  /** Supply descriptive alt text with any informative approved image. */
  imageAlt?: string;
  /** Only supply an approved press or organizational source URL. */
  externalUrl?: string;
  /** Internal route for an existing historical story. */
  storyHref?: `/stories/${string}`;
};

export interface MediaMilestonesProps {
  milestones: readonly MediaMilestone[];
}

const CARD_ACCENTS = ["bg-[#1260d9]", "bg-[#f8cd53]", "bg-[#e94e26]"] as const;

export default function MediaMilestones({ milestones }: MediaMilestonesProps) {
  if (!milestones.length) return null;

  const baseLinkClasses =
    "inline-flex self-start items-center gap-3 max-[700px]:gap-2 text-[22px] max-[1100px]:text-[18px] max-[700px]:text-[17px] font-bold text-[#003d9e] underline underline-offset-4 hover:text-[#11182e] focus-visible:outline-3 focus-visible:outline-[#11182e] focus-visible:outline-offset-4 focus-visible:rounded-[3px]";

  return (
    <section
      id="media-milestones"
      aria-labelledby="media-milestones-title"
      className="bg-white text-[#080e32] pt-[44px] pb-[64px] max-[700px]:pt-[36px] max-[700px]:pb-[42px] scroll-mt-6 font-sans"
    >
      <div className="mx-auto max-w-[1400px] w-[91%] max-[700px]:w-[90%]">
        <header className="mb-[40px] max-[700px]:mb-[28px]">
          <h2
            id="media-milestones-title"
            className="text-[clamp(32px,3.3vw,50px)] leading-[1.12] tracking-[-1px] max-[700px]:tracking-[-0.6px] font-extrabold"
          >
            Media &amp; Milestones
          </h2>
          <p className="mt-2 text-[#293957] text-[clamp(18px,1.5vw,23px)] leading-[1.45]">
            HOPE&apos;s history is made up of projects, people, partnerships, and moments that helped move the organization forward.
          </p>
        </header>

        <div className="grid grid-cols-2 max-[700px]:grid-cols-1 items-stretch gap-x-[34px] gap-y-[30px] max-[1100px]:gap-6 max-[700px]:gap-5">
          {milestones.map((milestone, idx) => {
            const accentBg = CARD_ACCENTS[idx] ?? "bg-[#1260d9]";
            const hasStoryLink = Boolean(milestone.storyHref);

            return (
              <article
                key={`${milestone.category}-${milestone.title}`}
                className="relative flex flex-col min-w-0 border border-[#d4dbe7] rounded-[20px] overflow-hidden bg-white shadow-[0_5px_10px_rgb(17_24_46/0.06)]"
              >
                {/* 11px Accent bar matching .card::before */}
                <div
                  aria-hidden="true"
                  className={`absolute -top-px -bottom-px -left-px w-[11px] pointer-events-none z-[1] ${accentBg}`}
                />

                {milestone.image && (
                  <div className="relative aspect-[2] bg-[#f4f7fa]">
                    <Image
                      src={milestone.image}
                      alt={milestone.imageAlt ?? ""}
                      fill
                      sizes="(max-width: 700px) 90vw, (max-width: 1440px) 40vw, 550px"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col flex-1 pt-[28px] pr-[32px] pb-[32px] pl-[46px] max-[1100px]:pt-[26px] max-[1100px]:pr-[24px] max-[1100px]:pb-[28px] max-[1100px]:pl-[34px] max-[700px]:pt-[22px] max-[700px]:pr-[22px] max-[700px]:pb-[24px] max-[700px]:pl-[30px]">
                  <div className="flex justify-between items-baseline gap-x-[18px] gap-y-[10px] mb-5 max-[700px]:mb-4 text-[20px] max-[1100px]:text-[17px] max-[700px]:text-[16px] leading-[1.4]">
                    <span className="font-semibold">{milestone.category}</span>
                    <span className="shrink-0 border-b-[3px] border-[#f8cd53] pb-1 text-inherit font-bold">
                      {milestone.yearOrDate}
                    </span>
                  </div>

                  <h3 className="text-[clamp(26px,2.1vw,32px)] max-[700px]:text-[24px] leading-[1.18] tracking-[-0.5px] font-extrabold [overflow-wrap:anywhere]">
                    {milestone.title}
                  </h3>

                  <p className="mt-[18px] text-[20px] max-[1100px]:text-[18px] max-[700px]:text-[17px] leading-[1.4]">
                    {milestone.description}
                  </p>

                  {milestone.storyHref && (
                    <Link
                      href={milestone.storyHref}
                      className={`${baseLinkClasses} min-h-[68px] pt-6 mt-auto`}
                      aria-label={`Read the full story: ${milestone.title}`}
                    >
                      Read the full story <ArrowRight className="w-6 h-6 shrink-0" aria-hidden="true" />
                    </Link>
                  )}

                  {milestone.externalUrl && (
                    <a
                      href={milestone.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${baseLinkClasses} ${
                        hasStoryLink ? "min-h-[44px] pt-0 mt-[18px]" : "min-h-[68px] pt-6 mt-auto"
                      }`}
                      aria-label={`View source for ${milestone.title} (opens in a new tab)`}
                    >
                      View source <ArrowUpRight className="w-6 h-6 shrink-0" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

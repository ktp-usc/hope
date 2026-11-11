import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Partner } from "@/sanity/queries/partners";

/** Highlighted card for the primary-network partner, rendered from its Sanity record. */
export default function FeaturedAffiliation({ partner }: { partner: Partner }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-8">
      <div className="grid overflow-hidden rounded-2xl border border-[#d6e7f5] bg-[#ebf3fa] lg:grid-cols-[1.65fr_1fr]">
        {/* Left side: e-NABLE information */}
        <div className="p-8 sm:p-10 lg:p-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1260d6]">
              Our Global Affiliation
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#1a273d] shadow-sm">
              Certified Chapter
            </span>
          </div>

          {partner.logoUrl && (
            <div className="relative mb-5 h-16 w-32">
              <Image
                src={partner.logoUrl}
                alt={`${partner.name} logo`}
                fill
                sizes="128px"
                className="object-contain object-left"
              />
            </div>
          )}

          <h2 className="mb-3 text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl">
            {partner.name}
          </h2>

          <h3 className="mb-4 text-lg font-bold text-[#1a273d]">
            A global network. A local commitment.
          </h3>

          <p className="mb-6 max-w-xl text-base leading-relaxed text-slate-700">
            {partner.description}
          </p>

          {partner.websiteUrl && (
            <a
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-[#f7d06b] px-5 py-2.5 text-sm font-semibold text-[#12303f] shadow-sm transition hover:bg-[#f3c64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f]"
              aria-label={`Explore ${partner.name} (opens in a new tab)`}
            >
              Explore {partner.name}
              <ArrowUpRight className="ml-1.5 size-4" />
            </a>
          )}
        </div>

        {/* Right side: visual highlight card */}
        <div className="flex flex-col justify-center border-t border-[#d6e7f5] bg-white/60 p-8 sm:p-10 lg:border-t-0 lg:border-l lg:border-[#d6e7f5]">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#1260d6]">
            Shared Open-Source Roots
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            HOPE became an e-NABLE chapter to bring open-source 3D-printed assistive designs into hands-on student practice. Today, that connection continues through shared resources and knowledge exchange across the global community.
          </p>
        </div>
      </div>
    </section>
  );
}

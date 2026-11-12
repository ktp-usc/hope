import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PartnershipCTA() {
  return (
    <section className="bg-[#1a273d]">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Left side: heading and description */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#f7d06b]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f7d06b]">
                Let&apos;s Build Something Meaningful
              </span>
            </div>

            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              There&apos;s a place for your expertise.
            </h2>

            <p className="max-w-lg text-base leading-relaxed text-slate-300">
              Are you a clinician, educator, maker, or technology team? Let&apos;s explore how your perspective can support HOPE&apos;s hands-on engineering work.
            </p>
          </div>

          {/* Right side: CTA button */}
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#f7d06b] px-6 py-3 text-sm font-semibold text-[#12303f] transition-colors hover:bg-[#f3c64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7d06b] self-start md:self-center"
          >
            Start a conversation
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

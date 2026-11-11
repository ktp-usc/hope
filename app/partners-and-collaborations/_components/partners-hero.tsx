import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PartnersHero() {
  return (
    <section className="bg-[#f7d06b] px-6 py-12 sm:py-16 lg:py-20 text-[#1a273d]">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-16">
          {/* Left side: heading */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#1a273d]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
                Partners &amp; Collaborations
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-5xl lg:text-6xl leading-[1.12]">
              Better together.
              <br />
              Built for possibility.
            </h1>
          </div>

          {/* Right side: introduction & CTA */}
          <div className="pb-1">
            <p className="max-w-md text-base leading-relaxed text-[#1a273d]/85 sm:text-lg">
              Progress is a shared effort. We bring together a global maker network, clinical expertise, and local technology communities to put prosthetic engineering into practice.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg bg-[#1a273d] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#122038] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a273d]"
              >
                Explore Partnerships
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

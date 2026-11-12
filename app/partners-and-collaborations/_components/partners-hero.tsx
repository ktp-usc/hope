import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PartnersHero() {
  return (
    <section className="bg-[#f7d06b] px-6 py-10 sm:py-12 lg:py-14 text-[#1a273d]">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
          {/* Left side: heading */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#1a273d]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1a273d]">
                Partners &amp; Collaborations
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-5xl lg:text-[54px] leading-[1.1]">
              Better together.
              <br />
              Built for possibility.
            </h1>
          </div>

          {/* Right side: introduction & CTA */}
          <div className="pb-1">
            <p className="max-w-md text-base leading-relaxed text-[#1a273d]/90 sm:text-lg">
              Progress is a shared effort. We bring together a global maker network, clinical expertise, and local technology communities to put prosthetic engineering into practice.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#1260d9] px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-[#0f55bd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1260d9]"
              >
                Contact Us About Partnerships
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import hopeLogo from "@/app/about/about-images/hope-logo.jpg";
import uscLogo from "@/app/about/about-images/usc-logo.jpg";

export interface StudentOrgModuleProps {
  garnetGateUrl?: string;
}

export default function StudentOrgModule({
  garnetGateUrl = "https://garnetgate.sa.sc.edu/organization/hope",
}: StudentOrgModuleProps) {
  return (
    <section
      id="student-org"
      aria-labelledby="student-org-title"
      className="border-t border-slate-200/80 bg-white py-14 sm:py-18 lg:py-22"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-0.5 w-5 bg-[#f7d06b]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
            Organizational Structure
          </span>
        </div>
        <h2
          id="student-org-title"
          className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl lg:text-[42px] leading-tight"
        >
          Two organizations. One shared mission.
        </h2>
        <p className="mt-3.5 max-w-3xl text-base leading-relaxed text-slate-700">
          H.O.P.E. operates as two distinct but tightly coordinated entities. Each organization
          maintains its own governance and responsibilities while working in unison to turn
          engineering into real community solutions.
        </p>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-7 lg:grid-cols-2">
          {/* H.O.P.E. Inc. Card */}
          <article className="flex flex-col gap-6 rounded-2xl border border-[#d6e7f5] bg-[#ebf3fa] p-7 sm:flex-row sm:p-8 shadow-sm">
            <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-white p-2 shadow-sm border border-slate-100 flex items-center justify-center">
              <Image
                src={hopeLogo}
                alt="H.O.P.E. Inc. nonprofit logo"
                className="max-h-full max-w-full object-contain"
                width={80}
                height={96}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold text-[#1a273d]">H.O.P.E. Inc.</h3>
              <span className="mt-1 inline-block text-xs font-bold text-[#1260d6] uppercase tracking-wide">
                Independent 501(c)(3) Nonprofit
              </span>
              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-slate-700">
                <li>Incorporated in South Carolina in 2017 to provide durable multi-year continuity.</li>
                <li>Governed by an independent Board of Directors providing fiscal oversight and legal accountability.</li>
                <li>Coordinates institutional partnerships, grant funding, equipment procurement, and long-term resources.</li>
              </ul>
            </div>
          </article>

          {/* H.O.P.E. at USC Card */}
          <article className="flex flex-col gap-6 rounded-2xl border border-amber-200/70 bg-[#faf8f5] p-7 sm:flex-row sm:p-8 shadow-sm">
            <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-white p-2 shadow-sm border border-slate-100 flex items-center justify-center">
              <Image
                src={uscLogo}
                alt="H.O.P.E. student chapter logo"
                className="max-h-full max-w-full object-contain"
                width={80}
                height={96}
              />
            </div>
            <div className="min-w-0 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#1a273d]">H.O.P.E. at USC</h3>
                <span className="mt-1 inline-block text-xs font-bold text-[#1260d6] uppercase tracking-wide">
                  University Student Organization
                </span>
                <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-slate-700">
                  <li>Founded at the University of South Carolina in 2016 as a student engineering chapter.</li>
                  <li>Student members organize, recruit, train, and execute hands-on CAD design, 3D printing, and prototyping.</li>
                  <li>Led by elected student officers who balance technical project work with collegiate campus engagement.</li>
                </ul>
              </div>
              <div className="mt-6">
                <a
                  href={garnetGateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-[#f7d06b] px-5 py-2.5 text-sm font-semibold text-[#12303f] shadow-sm transition hover:bg-[#f3c64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f]"
                >
                  Join via Garnet Gate <ArrowUpRight size={15} className="ml-1.5" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

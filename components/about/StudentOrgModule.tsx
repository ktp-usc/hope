import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
      className="border-t border-[#e3e0d9] bg-white py-16 lg:py-22"
    >
      <div className="mx-auto w-[90%] max-w-[1296px]">
        <span className="inline-block rounded-full bg-[#f8cd53] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#121212] mb-3">
          Structure
        </span>
        <h2
          id="student-org-title"
          className="text-3xl font-bold tracking-tight text-[#121212] sm:text-4xl lg:text-[44px] leading-tight"
        >
          Two organizations. One shared mission.
        </h2>
        <p className="mt-3.5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-[17px]">
          H.O.P.E. operates as two distinct but tightly coordinated entities. Each organization
          maintains its own governance and responsibilities while working in unison to turn
          engineering into real community solutions.
        </p>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-7 lg:grid-cols-2">
          {/* H.O.P.E. Inc. Card */}
          <article className="flex flex-col gap-6 rounded-2xl border border-[#bcd9f8] bg-[#f0f7ff] p-7 sm:flex-row sm:p-8 shadow-sm">
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
              <h3 className="text-xl font-bold text-[#121212]">H.O.P.E. Inc.</h3>
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
          <article className="flex flex-col gap-6 rounded-2xl border border-[#ebdcb9] bg-[#fdfbf7] p-7 sm:flex-row sm:p-8 shadow-sm">
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
                <h3 className="text-xl font-bold text-[#121212]">H.O.P.E. at USC</h3>
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
                  className="inline-flex items-center gap-2 rounded-full bg-[#73000a] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition hover:bg-[#520007] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73000a]"
                >
                  Join via Garnet Gate <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}


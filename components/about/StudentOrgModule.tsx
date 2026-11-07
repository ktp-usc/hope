import Image from "next/image";
import { ArrowRight } from "lucide-react";
import hopeLogo from "@/app/about/about-images/hope-logo.jpg";
import uscLogo from "@/app/about/about-images/usc-logo.jpg";

export interface StudentOrgModuleProps {
  /** Supply verified destinations when approved. */
  garnetGateUrl?: `https://${string}`;
}

export default function StudentOrgModule({ garnetGateUrl }: StudentOrgModuleProps) {
  return (
    <section id="student-org" className="mx-auto w-[90%] max-w-[1240px] scroll-mt-[32px] border-t border-[#e2e8f0] bg-white py-[80px] text-[#0f172a] [font-family:var(--font-sans,system-ui,-apple-system,BlinkMacSystemFont,Segoe_UI,Roboto,Helvetica_Neue,sans-serif)] [@media(max-width:640px)]:py-[56px]" aria-labelledby="student-org-title">
      <h2 id="student-org-title" className="text-[clamp(30px,3.2vw,44px)]! leading-[1.18]! tracking-[-0.02em]! text-[#0e2a47]! font-bold! text-balance">Two organizations. One shared mission.</h2>
      <p className="mt-[14px]! max-w-[72ch] text-[18px] leading-[1.6] text-[#334155] text-pretty">
        H.O.P.E. operates as two distinct but tightly coordinated entities. Each organization maintains its own governance and responsibilities while working in unison to turn engineering into real community solutions.
      </p>

      <div className="mt-[40px] grid grid-cols-2 items-stretch gap-[28px] [@media(max-width:1024px)]:grid-cols-1 [@media(max-width:1024px)]:gap-[20px]">
        <article className="flex min-w-0 gap-[24px] rounded-[18px] border p-[32px] [@media(max-width:640px)]:flex-col [@media(max-width:640px)]:p-[24px] border-[#bcd9f8] bg-[#f0f7ff]">
          <Image src={hopeLogo} alt="H.O.P.E. Inc. nonprofit logo" className="h-[110px] w-[96px] shrink-0 rounded-[12px] bg-white p-[8px] object-contain shadow-[0_2px_8px_rgba(0,0,0,0.05)] [@media(max-width:640px)]:h-[90px] [@media(max-width:640px)]:w-[80px]" sizes="100px" />
          <div className="min-w-0">
            <h3 className="text-[22px]! leading-[1.25]! font-bold! text-[#0e2a47]!">H.O.P.E. Inc.</h3>
            <span className="mt-[6px] inline-block text-[13px] font-semibold text-[#1d70b8]">Independent 501(c)(3) Nonprofit</span>
            <ul className="mt-[16px] mb-0 list-disc pl-[20px] text-[15px] leading-[1.6] text-[#334155] [&_li+li]:mt-[8px]">
              <li>Incorporated in South Carolina in 2017 to provide durable multi-year continuity.</li>
              <li>Governed by an independent Board of Directors providing fiscal oversight and legal accountability.</li>
              <li>Coordinates institutional partnerships, grant funding, equipment procurement, and long-term resources.</li>
            </ul>
          </div>
        </article>

        <article className="flex min-w-0 gap-[24px] rounded-[18px] border p-[32px] [@media(max-width:640px)]:flex-col [@media(max-width:640px)]:p-[24px] border-[#ebdcb9] bg-[#fbfaf6]">
          <Image src={uscLogo} alt="H.O.P.E. student chapter logo" className="h-[110px] w-[96px] shrink-0 rounded-[12px] bg-white p-[8px] object-contain shadow-[0_2px_8px_rgba(0,0,0,0.05)] [@media(max-width:640px)]:h-[90px] [@media(max-width:640px)]:w-[80px]" sizes="100px" />
          <div className="min-w-0">
            <h3 className="text-[22px]! leading-[1.25]! font-bold! text-[#0e2a47]!">H.O.P.E. at USC</h3>
            <span className="mt-[6px] inline-block text-[13px] font-semibold text-[#1d70b8]">University Student Organization</span>
            <ul className="mt-[16px] mb-0 list-disc pl-[20px] text-[15px] leading-[1.6] text-[#334155] [&_li+li]:mt-[8px]">
              <li>Founded at the University of South Carolina in 2016 as a student engineering chapter.</li>
              <li>Student members organize, recruit, train, and execute hands-on CAD design, 3D printing, and prototyping.</li>
              <li>Led by elected student officers who balance technical project work with collegiate campus engagement.</li>
            </ul>
            <div className="mt-[24px] flex flex-wrap gap-[12px]">
              {garnetGateUrl ? (
                <a
                  className="inline-flex min-h-[44px] max-w-full items-center justify-center gap-[8px] rounded-[9999px] border border-[#73000a] bg-[#73000a] px-[20px] py-[10px] text-[14px] font-semibold text-white no-underline [transition:transform_0.15s_ease,background-color_0.15s_ease] [&_svg]:shrink-0 hover:[transform:translateY(-1px)] hover:border-[#520007] hover:bg-[#520007] focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[#1d70b8]! focus-visible:outline-offset-[4px]"
                  href={garnetGateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join via Garnet Gate <ArrowRight size={16} aria-hidden="true" />
                </a>
              ) : (
                <a
                  className="inline-flex min-h-[44px] max-w-full items-center justify-center gap-[8px] rounded-[9999px] border border-[#73000a] bg-[#73000a] px-[20px] py-[10px] text-[14px] font-semibold text-white no-underline [transition:transform_0.15s_ease,background-color_0.15s_ease] [&_svg]:shrink-0 hover:[transform:translateY(-1px)] hover:border-[#520007] hover:bg-[#520007] focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[#1d70b8]! focus-visible:outline-offset-[4px]"
                  href="https://garnetgate.sa.sc.edu/organization/hope"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join via Garnet Gate <ArrowRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

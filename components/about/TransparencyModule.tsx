import { ShieldCheck, Users, FileText, ChartNoAxesCombined } from "lucide-react";

const disclosures = [
  {
    title: "Nonprofit Status",
    Icon: ShieldCheck,
    paragraphs: [
      "H.O.P.E. Inc. is an independent 501(c)(3) tax-exempt nonprofit organization incorporated in South Carolina in 2017.",
      "All charitable activities directly support student education, assistive device fabrication, and community access.",
    ],
  },
  {
    title: "Governance & Oversight",
    Icon: Users,
    paragraphs: [
      "Governed by a dedicated Board of Directors responsible for fiduciary oversight, legal compliance, and strategic direction.",
      "Student executive officers coordinate operational workflows, maintaining close alignment between campus builds and nonprofit priorities.",
    ],
  },
  {
    title: "Corporate Records & Filings",
    Icon: FileText,
    paragraphs: [
      "Maintains active standing with the South Carolina Secretary of State and complies with all state and federal charitable reporting requirements.",
      "Corporate documentation including Articles of Incorporation and determination records are maintained in our central archive.",
    ],
  },
  {
    title: "Financial Responsibility",
    Icon: ChartNoAxesCombined,
    paragraphs: [
      "Committed to rigorous stewardship of every dollar, donation, and equipment grant.",
      "Resource allocations directly fund 3D printing filament, mechanical fasteners, adaptive hardware, and student workshop safety tools.",
    ],
  },
];

export default function TransparencyModule() {
  return (
    <section id="transparency" className="mx-auto w-[90%] max-w-[1240px] scroll-mt-[32px] border-t border-[#e2e8f0] bg-white py-[80px] text-[#0f172a] [font-family:var(--font-sans,system-ui,-apple-system,BlinkMacSystemFont,Segoe_UI,Roboto,Helvetica_Neue,sans-serif)] [@media(max-width:640px)]:py-[56px]" aria-labelledby="transparency-title">
      <h2 id="transparency-title" className="text-[clamp(30px,3.2vw,44px)]! leading-[1.18]! tracking-[-0.02em]! text-[#0e2a47]! font-bold! text-balance">Built on trust. Committed to transparency.</h2>
      <p className="mt-[14px]! max-w-[72ch] text-[18px] leading-[1.6] text-[#334155] text-pretty">
        H.O.P.E. Inc. adheres to sound nonprofit governance, accurate recordkeeping, and open communication about our organizational structure, funding, and impact.
      </p>
      <div className="mt-[40px] grid grid-cols-2 gap-[24px] [@media(max-width:1024px)]:grid-cols-1 [@media(max-width:1024px)]:gap-[20px]">
        {disclosures.map(({ title, Icon, paragraphs }) => (
          <article className="min-w-0 rounded-[16px] border border-[#e2e8f0] bg-white p-[30px] shadow-[0_2px_6px_rgba(0,0,0,0.02)] [@media(max-width:640px)]:p-[24px]" key={title}>
            <span className="mb-[18px] grid h-[44px] w-[44px] place-items-center rounded-[10px] bg-[#f0f7ff] text-[#1d70b8]" aria-hidden="true">
              <Icon size={26} strokeWidth={1.8} />
            </span>
            <h3 className="text-[22px]! leading-[1.25]! font-bold! text-[#0e2a47]!">{title}</h3>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-[10px]! text-[15px] leading-[1.6] text-[#334155] text-pretty">{paragraph}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

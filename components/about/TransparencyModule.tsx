import { ShieldCheck, Users, FileText, TrendingUp } from "lucide-react";

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
    Icon: TrendingUp,
    paragraphs: [
      "Committed to rigorous stewardship of every dollar, donation, and equipment grant.",
      "Resource allocations directly fund 3D printing filament, mechanical fasteners, adaptive hardware, and student workshop safety tools.",
    ],
  },
];

export default function TransparencyModule() {
  return (
    <section
      id="transparency"
      aria-labelledby="transparency-title"
      className="border-t border-slate-200/80 bg-white py-14 sm:py-18 lg:py-22"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-0.5 w-5 bg-[#f7d06b]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
            Transparency
          </span>
        </div>
        <h2
          id="transparency-title"
          className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-4xl lg:text-[42px] leading-tight"
        >
          Built on trust. Committed to transparency.
        </h2>
        <p className="mt-3.5 max-w-3xl text-base leading-relaxed text-slate-700">
          H.O.P.E. Inc. adheres to sound nonprofit governance, accurate recordkeeping, and open
          communication about our organizational structure, funding, and impact.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {disclosures.map(({ title, Icon, paragraphs }) => (
            <article
              key={title}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-sm transition hover:shadow-md"
            >
              <div>
                <span
                  className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-[#ebf3fa] text-[#1260d6]"
                  aria-hidden="true"
                >
                  <Icon size={22} strokeWidth={2} />
                </span>
                <h3 className="text-xl font-bold text-[#1a273d]">{title}</h3>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                  {paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

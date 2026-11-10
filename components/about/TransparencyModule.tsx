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
      className="border-t border-[#e3e0d9] bg-white py-16 lg:py-22"
    >
      <div className="mx-auto w-[90%] max-w-[1296px]">
        <span className="inline-block rounded-full bg-[#121212] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white mb-3">
          Transparency
        </span>
        <h2
          id="transparency-title"
          className="text-3xl font-bold tracking-tight text-[#121212] sm:text-4xl lg:text-[44px] leading-tight"
        >
          Built on trust. Committed to transparency.
        </h2>
        <p className="mt-3.5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-[17px]">
          H.O.P.E. Inc. adheres to sound nonprofit governance, accurate recordkeeping, and open
          communication about our organizational structure, funding, and impact.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {disclosures.map(({ title, Icon, paragraphs }) => (
            <article
              key={title}
              className="flex flex-col justify-between rounded-2xl border border-[#e3e0d9] bg-white p-7 sm:p-8 shadow-sm transition hover:shadow-md"
            >
              <div>
                <span
                  className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#d7eaf7] text-[#1260d9]"
                  aria-hidden="true"
                >
                  <Icon size={22} strokeWidth={2} />
                </span>
                <h3 className="text-xl font-bold text-[#121212]">{title}</h3>
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


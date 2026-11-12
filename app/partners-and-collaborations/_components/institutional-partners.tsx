import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Partner, PartnerCategory } from "@/sanity/queries/partners";

const CATEGORY_LABELS: Record<PartnerCategory, string> = {
  "primary-network": "Primary Network",
  institutional: "Institutional Partner",
  incubator: "Entrepreneurship & Innovation",
  community: "Community Partner",
};

/** Grid of institutional, incubator, and community partner cards. */
export default function InstitutionalPartners({ partners }: { partners: Partner[] }) {
  return (
    <section className="border-t border-slate-200/80 bg-[#faf8f5] py-14 sm:py-18 lg:py-22">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#f7d06b]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
                Our Institutional Partners
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#1a273d] sm:text-3xl lg:text-4xl">
              Different expertise. Shared purpose.
            </h2>
          </div>

          <p className="max-w-sm text-base leading-relaxed text-slate-600 md:justify-self-end">
            The relationships that connect our mission to healthcare education, learning, and technology.
          </p>
        </div>

        {/* Partners grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {partners.map((partner) => (
            <article
              key={partner._id}
              className="flex min-h-[300px] flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-sm transition hover:shadow-md"
            >
              <div>
                {/* Partner logo */}
                {partner.logoUrl && (
                  <div className={`relative mb-5 w-full max-w-[200px] ${partner.logoUrl.includes("the-mix-full") ? "h-28" : "h-14"}`}>
                    <Image
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      fill
                      sizes="200px"
                      className="object-contain object-left"
                    />
                  </div>
                )}

                {/* Partnership type */}
                <span className="inline-block text-xs font-bold uppercase tracking-wide text-[#1260d6]">
                  {partner.category ? CATEGORY_LABELS[partner.category] : null}
                </span>

                <h3 className="mt-2 text-xl font-bold text-[#1a273d]">
                  {partner.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {partner.description}
                </p>
              </div>

              {partner.websiteUrl && (
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-[#1a273d] hover:underline underline-offset-4"
                    aria-label={`Visit ${partner.name} website (opens in a new tab)`}
                  >
                    Visit website
                    <ArrowUpRight className="ml-1 size-3.5" />
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

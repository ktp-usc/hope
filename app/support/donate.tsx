import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import EmailContact from "@/components/contact/EmailContact";
import { contactMailto, type ContactEmail, type ContactEmails } from "@/lib/contact-email";
import type { SiteSettings, DonationMethod } from "@/sanity/lib/queries";

const supportWays = [
  {
    title: "Sponsor equipment",
    description:
      "Help fund 3D printers, scanners, tools, and fabrication equipment students use to design and prototype assistive solutions.",
  },
  {
    title: "Donate materials",
    description:
      "Contribute filament, fasteners, components, tools, and supplies our student teams use in the workshop.",
  },
  {
    title: "Offer your expertise",
    description:
      "Share your skills in engineering, healthcare, design, operations, or another professional field.",
  },
  {
    title: "Workplace giving",
    description:
      "Support HOPE through corporate matching gifts, payroll giving, or a team-led fundraising campaign.",
  },
  {
    title: "Alumni mentorship",
    description:
      "Alumni and experienced makers can mentor students through design reviews, fabrication guidance, and project leadership.",
  },
];

/**
 * Determines contrasting text color for custom hex background.
 */
function getContrastTextColor(hexColor?: string): string {
  if (!hexColor) return "text-white";
  const hex = hexColor.replace(/^#/, "");
  let r = 0;
  let g = 0;
  let b = 0;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    return "text-white";
  }
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return "text-white";
  }
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "text-[#1a273d]" : "text-white";
}

/**
 * Returns Tailwind class mappings for different brand color themes.
 */
function getThemeStyles(theme?: string, customColor?: string) {
  switch (theme) {
    case "venmo-blue":
      return {
        cardHover: "hover:border-[#008cff]/50",
        badge: "bg-sky-50 text-[#008cff]",
        button:
          "border-[#008cff] bg-[#008cff] text-white hover:border-[#0074de] hover:bg-[#0074de] focus-visible:outline-[#008cff]",
      };
    case "stripe-purple":
      return {
        cardHover: "hover:border-[#635bff]/50",
        badge: "bg-purple-50 text-[#635bff]",
        button:
          "border-[#635bff] bg-[#635bff] text-white hover:border-[#5346e0] hover:bg-[#5346e0] focus-visible:outline-[#635bff]",
      };
    case "emerald":
      return {
        cardHover: "hover:border-emerald-600/50",
        badge: "bg-emerald-50 text-emerald-700",
        button:
          "border-emerald-600 bg-emerald-600 text-white hover:border-emerald-700 hover:bg-emerald-700 focus-visible:outline-emerald-600",
      };
    case "charcoal":
      return {
        cardHover: "hover:border-[#1a273d]/50",
        badge: "bg-slate-100 text-[#1a273d]",
        button:
          "border-[#1a273d] bg-[#1a273d] text-white hover:border-[#0b1a2d] hover:bg-[#0b1a2d] focus-visible:outline-[#1a273d]",
      };
    case "amber":
      return {
        cardHover: "hover:border-[#f7d06b]/60",
        badge: "bg-amber-50 text-amber-900",
        button:
          "border-[#f7d06b] bg-[#f7d06b] text-[#12303f] hover:border-[#f3c64f] hover:bg-[#f3c64f] focus-visible:outline-[#f7d06b]",
      };
    case "custom":
      if (customColor) {
        const textColor = getContrastTextColor(customColor);
        return {
          cardHover: "hover:border-black/30",
          badge: "bg-slate-100 text-slate-800",
          button: `${textColor} focus-visible:outline-black`,
          buttonStyle: {
            backgroundColor: customColor,
            borderColor: customColor,
          },
        };
      }
      return {
        cardHover: "hover:border-hope/50",
        badge: "bg-blue-50 text-hope",
        button:
          "border-hope bg-hope text-white hover:border-hope-deep hover:bg-hope-deep focus-visible:outline-hope",
      };
    case "hope-blue":
    default:
      return {
        cardHover: "hover:border-hope/50",
        badge: "bg-blue-50 text-hope",
        button:
          "border-hope bg-hope text-white hover:border-hope-deep hover:bg-hope-deep focus-visible:outline-hope",
      };
  }
}

/**
 * Renders an individual payment card with consistent styling and customizable brand color themes.
 */
function PaymentCard({ method }: { method: DonationMethod }) {
  const styles = getThemeStyles(method.colorTheme, method.customColor);

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 transition-colors shadow-sm ${styles.cardHover}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-[#1a273d]">{method.title}</h3>
          {method.note && (
            <p className="mt-1 text-xs text-slate-600">{method.note}</p>
          )}
        </div>
        {method.badgeText && (
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${styles.badge}`}
          >
            {method.badgeText}
          </span>
        )}
      </div>

      <a
        href={method.url}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.buttonStyle}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${styles.button}`}
      >
        {method.buttonLabel || "Donate Now"}
        <ArrowUpRight aria-hidden className="size-4" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}

/**
 * Direct Giving section containing interchangeable and customizable payment cards.
 */
function DonationCards({ methods, email }: { methods: DonationMethod[]; email: ContactEmail }) {
  return (
    <section
      aria-labelledby="donation-heading"
      className="w-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="border-b border-slate-100 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1260d6]">
          Direct Giving
        </span>
        <h2
          id="donation-heading"
          className="mt-1 text-2xl font-bold tracking-tight text-[#1a273d] sm:text-3xl"
        >
          Make a Contribution
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        {methods && methods.length > 0 ? (
          methods.map((method, idx) => (
            <PaymentCard key={`${method.title}-${idx}`} method={method} />
          ))
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-base font-semibold text-[#1a273d]">
              No current ways to donate online.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Direct giving methods are currently being updated. Please reach out to{" "}
              <a
                href={contactMailto(email)}
                className="font-semibold text-[#1260d6] underline underline-offset-2 hover:text-[#0f55bd]"
              >
                {email.recipient}
              </a>{" "}
              to discuss ways to contribute.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Renders the Support & Donate page layout.
 * Pure Tailwind CSS implementation with zero external CSS modules.
 */
export default function Donate({
  settings,
  contactEmails,
}: {
  settings: SiteSettings;
  contactEmails: ContactEmails;
}) {
  const enabled = settings.donationsEnabled;

  return (
    <main className="min-h-screen bg-white text-[#1a273d]">
      {/* 1. Yellow Header Banner */}
      <section className="bg-[#f7d06b] px-6 py-12 sm:py-16 lg:py-20 text-[#1a273d]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#1a273d]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
              Support HOPE
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-5xl lg:text-6xl leading-[1.12]">
            Support Practical Engineering
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#1a273d]/85 sm:text-lg">
            Support HOPE can include more than direct donations. Equipment, materials, professional expertise, sponsorship, alumni involvement, and organizational partnerships all help students put engineering skills to work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#ways-to-support"
              className="inline-flex items-center rounded-lg bg-[#1a273d] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#122038] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a273d]"
            >
              Ways to Support
              <ArrowRight className="ml-1.5 size-4" />
            </a>
            <a
              href="#direct-giving"
              className="inline-flex items-center rounded-lg border border-[#1a273d]/20 bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#1a273d] shadow-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a273d]"
            >
              Direct Giving
            </a>
          </div>
        </div>
      </section>

      {/* 2. Direct Giving & Action Section */}
      <section id="direct-giving" className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#f7d06b]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
                Get In Touch
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1a273d] sm:text-3xl lg:text-4xl">
              Partner with our student engineers
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              You can support HOPE through equipment, materials, expertise, sponsorship, alumni involvement, and partnerships that help students put engineering skills to work. Contact us to discuss the kind of support you have in mind.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              HOPE Inc. is an independent 501(c)(3) tax-exempt nonprofit organization. Contributions support student project materials, tools, testing, and continuous organizational capacity.
            </p>
          </div>

          <div>
            {enabled ? (
              <DonationCards
                methods={settings.donationMethods}
                email={contactEmails["donation-inquiry"]}
              />
            ) : (
              <div className="w-full">
                <EmailContact
                  email={contactEmails.support}
                  title="Support HOPE Inquiry"
                  description="Direct online donations are temporarily paused, but there are many vital ways to help. Let us know how you can contribute equipment, materials, expertise, or workplace giving."
                  buttonLabel="Open support inquiry email"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Other Ways to Support Our Work */}
      <section id="ways-to-support" className="bg-[#ebf3fa] px-6 py-14 sm:py-18 lg:py-22">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#f7d06b]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
                Contribution Pathways
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1a273d] sm:text-3xl lg:text-4xl">
              Ways to support our work
            </h2>
            <p className="mt-3.5 text-base leading-relaxed text-slate-700">
              Every contribution helps students learn, build, and iterate. Find the way your resources, skills, or workplace can support practical engineering.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportWays.map((way) => (
              <article
                key={way.title}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#1a273d]">{way.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{way.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

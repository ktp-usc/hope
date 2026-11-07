import React from "react";
import { ArrowRight } from "lucide-react";
import SupportForm from "./support-form";
import type { SiteSettings, DonationMethod } from "@/sanity/lib/queries";

const supportWays = [
  {
    title: "Sponsor equipment",
    description:
      "Help fund the printers, scanners, tools, and fabrication equipment that bring each prosthetic to life.",
  },
  {
    title: "Donate materials",
    description:
      "Contribute approved components, printing materials, tools, and supplies our teams use every day.",
  },
  {
    title: "Offer your expertise",
    description:
      "Share your skills in engineering, healthcare, design, operations, or another professional field.",
  },
  {
    title: "Workplace giving",
    description:
      "Support H.O.P.E. through matching gifts, payroll giving, or a team-led fundraising campaign.",
  },
  {
    title: "Alumni mentorship",
    description:
      "Alumni and professionals can mentor the students who design and build each prosthetic.",
  },
];

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
        cardHover: "hover:border-[#102743]/50",
        badge: "bg-slate-100 text-[#102743]",
        button:
          "border-[#102743] bg-[#102743] text-white hover:border-[#0b1a2d] hover:bg-[#0b1a2d] focus-visible:outline-[#102743]",
      };
    case "amber":
      return {
        cardHover: "hover:border-[#ffd84d]/60",
        badge: "bg-amber-50 text-amber-900",
        button:
          "border-[#ffd84d] bg-[#ffd84d] text-[#102743] hover:border-[#f3c64f] hover:bg-[#f3c64f] focus-visible:outline-[#ffd84d]",
      };
    case "custom":
      if (customColor) {
        return {
          cardHover: "hover:border-black/30",
          badge: "bg-slate-100 text-slate-800",
          button: "text-white focus-visible:outline-black",
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
      className={`rounded-2xl border border-line bg-paper/60 p-5 transition-colors ${styles.cardHover}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-xl tracking-[-0.01em] text-ink">{method.title}</h3>
          {method.note && (
            <p className="mt-1 text-xs text-quiet">{method.note}</p>
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
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 px-6 py-3.5 text-sm font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${styles.button}`}
      >
        {method.buttonLabel || "Donate Now"}
        <ArrowRight aria-hidden className="size-4" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}

/**
 * Direct Giving section containing interchangeable and customizable payment cards.
 */
function DonationCards({ methods }: { methods: DonationMethod[] }) {
  return (
    <section
      aria-labelledby="donation-heading"
      className="w-full rounded-[28px] border border-line bg-white p-7 shadow-[0_2px_4px_rgba(16,39,67,0.04),0_24px_48px_-16px_rgba(16,39,67,0.14)] sm:p-9"
    >
      <div className="border-b border-line pb-5">
        <span className="text-xs font-bold uppercase tracking-wider text-hope">
          Direct Giving
        </span>
        <h2
          id="donation-heading"
          className="mt-1 font-display text-3xl leading-[1.1] tracking-[-0.02em] text-ink sm:text-4xl"
        >
          Make a Donation
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        {methods.length > 0 ? (
          methods.map((method, idx) => (
            <PaymentCard key={`${method.title}-${idx}`} method={method} />
          ))
        ) : (
          <div className="rounded-2xl border border-line bg-paper/60 p-6 text-center">
            <p className="font-display text-xl text-ink">
              No current ways to donate.
            </p>
            <p className="mt-2 text-sm leading-6 text-quiet">
              Direct giving methods are currently being updated. Please reach out to{" "}
              <a
                href="mailto:aturner@handsonhope.ngo?subject=HOPE%20Donation%20Inquiry"
                className="font-semibold text-hope underline underline-offset-2 hover:text-hope-deep"
              >
                aturner@handsonhope.ngo
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
export default function Donate({ settings }: { settings: SiteSettings }) {
  const enabled = settings.donationsEnabled;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <main>
        <section className="mx-auto grid max-w-[1240px] gap-14 px-6 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-16">
          <div className="max-w-[650px]">
            <h1 className="font-display text-[clamp(3.25rem,7vw,6rem)] leading-[0.92] tracking-[-0.03em] text-balance text-ink">
              Give hope.
              <br />
              <span className="relative inline-block text-hope">
                Change lives.
                <svg
                  aria-hidden
                  className="absolute -bottom-2 left-1 w-[96%]"
                  viewBox="0 0 490 18"
                  fill="none"
                >
                  <path
                    d="M4 12C118 2 302 3 486 9"
                    stroke="#FFD84D"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-10 max-w-[34rem] text-lg leading-8 text-quiet text-pretty">
              Your support is what allows us to provide life-changing prosthetics to those
              in need.
            </p>
          </div>

          {enabled ? (
            <DonationCards methods={settings.donationMethods} />
          ) : (
            <SupportForm />
          )}
        </section>

        <section
          aria-labelledby="support-heading"
          className="bg-wash px-6 py-16 lg:px-10 lg:py-24"
        >
          <div className="mx-auto max-w-[1000px]">
            <h2
              id="support-heading"
              className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-balance text-ink sm:text-5xl"
            >
              {enabled
                ? "Other ways to support our work."
                : "Ways to support our work."}
            </h2>
            <p className="mt-5 max-w-[34rem] leading-7 text-quiet text-pretty">
              Every contribution matters. Find the way your resources, skills, or
              workplace can help us create more life-changing prosthetics.
            </p>
            <ul className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
              {supportWays.map((way) => (
                <li
                  key={way.title}
                  className="grid gap-2 py-6 md:grid-cols-[2fr_3fr] md:gap-10"
                >
                  <h3 className="text-lg font-extrabold tracking-[-0.01em] text-ink">
                    {way.title}
                  </h3>
                  <p className="leading-7 text-quiet">{way.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

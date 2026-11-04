import Image from "next/image";
import Link from "next/link";

// Update the hrefs to match your real routes.
const EXPLORE_LINKS = [
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Partners & Collaborations", href: "/partners-and-collaborations" },
];

const NEXT_STEP_LINKS = [
  { label: "Get Help", href: "/get-help" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Accessibility", href: "/accessibility" },
];

const linkClass =
  "rounded text-sm text-[#12303f] hover:underline underline-offset-4 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[#12303f]";

const headingClass = "mb-4 text-xs font-semibold tracking-wide text-black";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="HOPE home" className="inline-block">
              <Image
                src="/hope-logo.png"
                alt="H.O.P.E. Hands on Prosthetic Engineering"
                width={120}
                height={80}
              />
            </Link>
            <p className="mt-6 max-w-xs text-sm text-[#12303f]">
              Hands On Prosthetic Engineering. People first. Possibilities next.
            </p>
          </div>

          {/* Explore */}
          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={headingClass}>
              EXPLORE HOPE
            </h2>
            <ul className="flex flex-col gap-4">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Next step */}
          <nav aria-labelledby="footer-next-step">
            <h2 id="footer-next-step" className={headingClass}>
              TAKE THE NEXT STEP
            </h2>
            <ul className="flex flex-col gap-4">
              {NEXT_STEP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support call to action */}
          <div>
            <h2 className={headingClass}>A HAND IN WHAT&rsquo;S NEXT</h2>
            <p className="max-w-[14rem] text-sm text-[#4a6572]">
              Help thoughtful engineering move forward.
            </p>
            <Link
              href="/support"
              className="mt-5 inline-flex items-center gap-3 rounded-lg bg-[#f7d06b] px-5 py-2.5 text-sm text-[#12303f] hover:bg-[#f3c64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f]"
            >
              Support HOPE
              <ArrowIcon />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-black/10 pt-5 text-xs text-[#4a6572] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} HOPE &middot; Hands On Prosthetic
            Engineering
          </p>
          <ul className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
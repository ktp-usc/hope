"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Update the hrefs to match your real routes.
const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Get Help", href: "/get-help" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Partners & Collaborations", href: "/partners-and-collaborations" },
];

const SUPPORT_LINK = { label: "Support HOPE", href: "/support" };
const CONTACT_LINK = { label: "Contact", href: "/contact" };

const linkClass =
  "rounded text-sm text-[#12303f] hover:underline underline-offset-4 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[#12303f]";

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

function SupportButton({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href={SUPPORT_LINK.href}
      onClick={onClick}
      className="inline-flex items-center gap-3 rounded-lg bg-[#f7d06b] px-5 py-2.5 text-sm text-[#12303f] hover:bg-[#f3c64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f]"
    >
      {SUPPORT_LINK.label}
      <ArrowIcon />
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo: links back to the homepage */}
        <Link href="/" aria-label="HOPE home" className="shrink-0">
          <Image
            src="/hope-logo.png"
            alt="H.O.P.E. Hands on Prosthetic Engineering"
            width={120}
            height={80}
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
          <SupportButton />
          <Link href={CONTACT_LINK.href} className={linkClass}>
            {CONTACT_LINK.label}
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="rounded p-2 text-[#12303f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f] md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="flex flex-col items-start gap-4 border-t border-black/10 px-6 py-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={linkClass}
            >
              {link.label}
            </Link>
          ))}
          <SupportButton onClick={closeMenu} />
          <Link
            href={CONTACT_LINK.href}
            onClick={closeMenu}
            className={linkClass}
          >
            {CONTACT_LINK.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
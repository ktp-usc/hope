"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { NavStory } from "@/lib/nav-stories";

type Child = { label: string; href: string; separated?: boolean };
type Leaf = { label: string; href: string };
type Group = { label: string; children: Child[] };
type NavItem = Leaf | Group;

// Update the hrefs to match your real routes.
/** Builds the nav; the Stories dropdown lists the latest `stories` (Sanity-backed) plus an "All stories" link. */
function buildNavItems(stories: NavStory[]): NavItem[] {
  return [
    {
      label: "Who We Are",
      children: [
        { label: "About HOPE", href: "/about" },
        { label: "History & Archive", href: "/history" },
        { label: "Alumni & Legacy", href: "/alumni" },
      ],
    },
    { label: "Our Work", href: "/our-work" },
    {
      label: "Stories",
      children: [...stories, { label: "All stories", href: "/our-work", separated: true }],
    },
    { label: "Get Help", href: "/get-help" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Partners & Collaborations", href: "/partners-and-collaborations" },
  ];
}

const SUPPORT_LINK = { label: "Support HOPE", href: "/support" };
const CONTACT_LINK = { label: "Contact", href: "/contact" };

const linkClass =
  "inline-flex min-h-11 items-center rounded text-sm text-[#12303f] hover:underline underline-offset-4 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[#12303f]";

const menuItemClass =
  "block rounded-md px-3 py-2.5 text-sm text-[#12303f] hover:bg-[#12303f]/[0.06] " +
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#12303f]";

/** Type guard: true when a nav item is a dropdown group rather than a plain link. */
const isGroup = (item: NavItem): item is Group => "children" in item;

/**
 * True when `href` is the page being viewed. Hash links can't be matched
 * against pathname, so they never read as current.
 */
const isCurrent = (href: string, pathname: string) => !href.includes("#") && href === pathname;

/** Small diagonal arrow shown on the Support HOPE button. Decorative (aria-hidden). */
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

/** Chevron for dropdown triggers: points up when `open`, down otherwise. Decorative (aria-hidden). */
function ChevronIcon({ open, size = 14 }: { open: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={open ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"} />
    </svg>
  );
}

/** Yellow "Support HOPE" call-to-action linking to /support; `onClick` lets the mobile menu close itself. */
function SupportButton({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href={SUPPORT_LINK.href}
      onClick={onClick}
      className="inline-flex min-h-11 items-center gap-3 rounded-lg bg-[#f7d06b] px-5 py-2.5 text-sm text-[#12303f] hover:bg-[#f3c64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f]"
    >
      {SUPPORT_LINK.label}
      <ArrowIcon />
    </Link>
  );
}

/** Plain nav link; sets `aria-current="page"` (no visual underline) when `href` matches `pathname`. */
function NavLink({
  href,
  pathname,
  onClick,
  className = "",
  children,
}: {
  href: string;
  pathname: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  const current = isCurrent(href, pathname);
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={`${linkClass} ${className}`}
    >
      {children}
    </Link>
  );
}

/**
 * Desktop dropdown: opens when a mouse hovers it, or on click/Enter/Space for
 * touch and keyboard users. Closes when the mouse leaves, on Escape (focus
 * returns to the button), on an outside click, or when tabbing out.
 */
function DropdownNav({ group, pathname }: { group: Group; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // True while the menu was opened by hover, so the click that follows keeps it open instead of toggling it shut.
  const openedByHover = useRef(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      // Mouse only: touch taps are handled by onClick below.
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        openedByHover.current = true;
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        openedByHover.current = false;
        setOpen(false);
      }}
      // relatedTarget is null when Safari doesn't focus a clicked link; ignore that case.
      onBlur={(e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
          } else {
            setOpen((o) => !o);
          }
        }}
        className={`${linkClass} inline-flex items-center gap-1 ${open ? "underline" : ""}`}
      >
        {group.label}
        <ChevronIcon open={open} />
      </button>
      {open && (
        // pt-2 (not margin) keeps the gap hoverable so the menu doesn't close on the way down.
        <div className="absolute -left-3 top-full z-50 pt-2">
          <ul
            id={panelId}
            className="w-[280px] rounded-lg border border-black/10 bg-white p-2 shadow-[0_8px_24px_rgba(18,48,63,0.14)]"
          >
            {group.children.map((child) => (
              <li
                key={child.href + child.label}
                className={child.separated ? "mt-1 border-t border-[#12303f]/10 pt-1" : undefined}
              >
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(child.href, pathname) ? "page" : undefined}
                  className={`${menuItemClass} ${isCurrent(child.href, pathname) ? "bg-[#12303f]/[0.06] font-semibold" : ""}`}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const mobileRowClass = `${linkClass} flex min-h-12 w-full items-center`;

/**
 * Site header: logo, desktop nav with Who we are/Stories dropdowns, and a mobile
 * menu whose groups are accordions (one open at a time, Escape closes it).
 * `stories` fills the Stories dropdown.
 */
export default function Header({ stories }: { stories: NavStory[] }) {
  const pathname = usePathname();
  const navItems = buildNavItems(stories);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="w-full border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo: links back to the homepage */}
        <Link href="/" aria-label="HOPE home" className="shrink-0">
          <Image
            src="/hope-logo.png"
            alt="H.O.P.E. Hands on Prosthetic Engineering"
            width={120}
            height={80}
            className="h-auto w-[120px]"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-8 xl:flex">
          {navItems.map((item) =>
            isGroup(item) ? (
              <DropdownNav key={item.label} group={item} pathname={pathname} />
            ) : (
              <NavLink key={item.href} href={item.href} pathname={pathname}>
                {item.label}
              </NavLink>
            ),
          )}
          <SupportButton />
          <NavLink href={CONTACT_LINK.href} pathname={pathname}>
            {CONTACT_LINK.label}
          </NavLink>
        </nav>

        {/* Mobile menu toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded text-[#12303f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f] xl:hidden"
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

      {/* Mobile navigation: groups are accordions, one open at a time */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!menuOpen}
        className={`${menuOpen ? "flex" : "hidden"} flex-col border-t border-black/10 px-4 py-2 sm:px-6 xl:hidden`}
      >
          {navItems.map((item) => {
            if (!isGroup(item)) {
              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  pathname={pathname}
                  onClick={closeMenu}
                  className="flex min-h-12 w-full items-center"
                >
                  {item.label}
                </NavLink>
              );
            }
            const open = openGroup === item.label;
            const listId = `mobile-group-${item.label.replace(/\s+/g, "-").toLowerCase()}`;
            return (
              <div key={item.label}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={listId}
                  onClick={() => setOpenGroup(open ? null : item.label)}
                  className={`${mobileRowClass} justify-between ${open ? "font-semibold" : ""}`}
                >
                  {item.label}
                  <ChevronIcon open={open} size={16} />
                </button>
                {open && (
                  <ul id={listId} className="-mx-6 bg-[#12303f]/[0.06] px-6">
                    {item.children.map((child) => (
                      <li key={child.href + child.label}>
                        <Link
                          href={child.href}
                          onClick={closeMenu}
                          aria-current={isCurrent(child.href, pathname) ? "page" : undefined}
                          className={`${linkClass} flex min-h-11 items-center pl-4 ${
                            isCurrent(child.href, pathname) ? "font-semibold" : ""
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
          <div className="py-3">
            <SupportButton onClick={closeMenu} />
          </div>
          <NavLink
            href={CONTACT_LINK.href}
            pathname={pathname}
            onClick={closeMenu}
            className="flex min-h-12 w-full items-center"
          >
            {CONTACT_LINK.label}
          </NavLink>
      </nav>
    </header>
  );
}

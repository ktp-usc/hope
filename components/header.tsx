"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

type Child = { label: string; href: string; separated?: boolean };
type Leaf = { label: string; href: string };
// activePaths: pathname prefixes that mark the group itself as the current section.
type Group = { label: string; children: Child[]; activePaths: string[] };
type NavItem = Leaf | Group;

// Update the hrefs to match your real routes.
const NAV_ITEMS: NavItem[] = [
  {
    label: "About",
    activePaths: ["/about", "/history", "/alumni"],
    children: [
      { label: "About HOPE", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "History & Archive", href: "/history" },
      { label: "Alumni & Legacy", href: "/alumni" },
    ],
  },
  { label: "Our Work", href: "/our-work" },
  {
    label: "Stories",
    activePaths: ["/stories/"],
    children: [
      { label: "Eli’s Bike Arm", href: "/stories/elis-bike-arm" },
      { label: "COVID-19 PPE Response", href: "/stories/ppe-response" },
      { label: "Early 3D-Printed Hands", href: "/stories/hands-on-beginnings" },
      { label: "All projects", href: "/our-work", separated: true },
    ],
  },
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
const currentClass = "underline decoration-2";

const menuItemClass =
  "block rounded-md px-3 py-2.5 text-sm text-[#12303f] hover:bg-[#12303f]/[0.06] " +
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#12303f]";

const isGroup = (item: NavItem): item is Group => "children" in item;
const isActiveGroup = (group: Group, pathname: string) =>
  group.activePaths.some((p) => pathname.startsWith(p));
// Hash links can't be matched against pathname, so they never read as current.
const isCurrent = (href: string, pathname: string) => !href.includes("#") && href === pathname;

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
      className={`${linkClass} ${className} ${current ? currentClass : ""}`}
    >
      {children}
    </Link>
  );
}

// Desktop dropdown: opens on click/Enter/Space (never hover only), closes on
// Escape (focus returns to the button), outside click, or tabbing out.
function DropdownNav({ group, pathname }: { group: Group; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
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
        onClick={() => setOpen((o) => !o)}
        className={`${linkClass} inline-flex items-center gap-1 ${
          open ? "underline" : isActiveGroup(group, pathname) ? currentClass : ""
        }`}
      >
        {group.label}
        <ChevronIcon open={open} />
      </button>
      {open && (
        <ul
          id={panelId}
          className="absolute -left-3 top-full z-50 mt-2 w-[280px] rounded-lg border border-black/10 bg-white p-2 shadow-[0_8px_24px_rgba(18,48,63,0.14)]"
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
      )}
    </div>
  );
}

const mobileRowClass = `${linkClass} flex min-h-12 w-full items-center`;

export default function Header() {
  const pathname = usePathname();
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
        <nav aria-label="Main" className="hidden items-center gap-8 xl:flex">
          {NAV_ITEMS.map((item) =>
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
          className="rounded p-2 text-[#12303f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f] xl:hidden"
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
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="flex flex-col border-t border-black/10 px-6 py-2 xl:hidden"
        >
          {NAV_ITEMS.map((item) => {
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
            const listId = `mobile-group-${item.label}`;
            return (
              <div key={item.label}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={listId}
                  onClick={() => setOpenGroup(open ? null : item.label)}
                  className={`${mobileRowClass} justify-between ${
                    open ? "font-semibold" : isActiveGroup(item, pathname) ? currentClass : ""
                  }`}
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
                            isCurrent(child.href, pathname) ? currentClass : ""
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
      )}
    </header>
  );
}

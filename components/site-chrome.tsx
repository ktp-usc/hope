"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import type { NavStory } from "@/lib/nav-stories";

interface SiteChromeProps {
  children: React.ReactNode;
  /** Stories listed in the header's Stories dropdown (fetched from Sanity in the root layout). */
  stories: NavStory[];
}

/**
 * Client chrome wrapper for main website layout.
 * When an editor accesses the embedded Sanity Studio (/studio),
 * Header and Footer are suppressed so the Studio authoring interface
 * can occupy the full viewport.
 */
export default function SiteChrome({ children, stories }: SiteChromeProps) {
  const pathname = usePathname();
  const isStudio = pathname === "/studio" || pathname?.startsWith("/studio/");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Header stories={stories} />
      {children}
      <Footer />
    </>
  );
}

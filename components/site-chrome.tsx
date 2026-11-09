"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";

interface SiteChromeProps {
  children: React.ReactNode;
}

/**
 * Client chrome wrapper for main website layout.
 * When an editor accesses the embedded Sanity Studio (/studio),
 * Header and Footer are suppressed so the Studio authoring interface
 * can occupy the full viewport.
 */
export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isStudio = pathname === "/studio" || pathname?.startsWith("/studio/");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { DM_Serif_Display, Manrope } from "next/font/google";
import SiteChrome from "@/components/site-chrome";

const display = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "HOPE Inc. | Hands On Prosthetic Engineering",
  description: "Turning practical needs into practical solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

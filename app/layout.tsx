import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { DM_Serif_Display, Manrope } from "next/font/google";
import SiteChrome from "@/components/site-chrome";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getNavStories } from "@/sanity/lib/nav-stories";

const display = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: DEFAULT_TITLE, template: "%s | HOPE Inc." },
    description: DEFAULT_DESCRIPTION,
    openGraph: { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, siteName: SITE_NAME, type: "website", locale: "en_US", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stories = await getNavStories();
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <SiteChrome stories={stories}>{children}</SiteChrome>
      </body>
    </html>
  );
}

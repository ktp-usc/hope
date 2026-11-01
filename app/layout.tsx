import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
    title: "Get Help | H.O.P.E.",
    description: "Reach out to H.O.P.E.'s student-powered support team."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body>
        { children }
        </body>
        </html>
    );
}

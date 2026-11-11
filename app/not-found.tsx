import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page Not Found", description: "The page you were looking for could not be found." };

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl text-[#1b2d4c]">Page not found</h1>
      <p className="mt-4 text-[#475569]">The page you were looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="mt-8 inline-block font-semibold text-[#1b2d4c] underline">Back to the homepage</Link>
    </main>
  );
}

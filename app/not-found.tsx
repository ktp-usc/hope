import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-[#1a273d]">Page not found</h1>
      <p className="mt-4 text-base text-slate-600">The page you were looking for doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-[#f7d06b] px-5 py-2.5 text-sm font-semibold text-[#12303f] shadow-sm transition hover:bg-[#f3c64f]"
      >
        Back to the homepage
      </Link>
    </main>
  );
}

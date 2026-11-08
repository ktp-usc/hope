import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b border-slate-200 bg-white">
            <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
                <Link className="text-xl font-bold tracking-tight text-slate-950" href="/">
                    H.O.P.E.
                </Link>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-700">
                    <Link className="transition hover:text-slate-950" href="/">Home</Link>
                    <Link className="transition hover:text-slate-950" href="/about">About</Link>
                    <Link className="transition hover:text-slate-950" href="/contact">Contact</Link>
                </div>
            </nav>
        </header>
    );
}
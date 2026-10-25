import Image from "next/image";
import Link from "next/link";

const links = ["About Us", "Partnerships", "Get Help"];

export default function Header() {
    return (
        <header className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 py-4 lg:px-10">
            <Link href="/" aria-label="H.O.P.E. home">
                <Image
                    src="/hope-logo.png"
                    alt="H.O.P.E. Hands On Prosthetic Engineering"
                    width={96}
                    height={96}
                    priority
                    className="mix-blend-multiply"
                />
            </Link>
            <nav aria-label="Main" className="flex items-center gap-7 text-sm font-semibold">
                {links.map((label) => (
                    <a key={label} href="#" className="hidden transition-colors hover:text-hope sm:block">
                        {label}
                    </a>
                ))}
                <Link href="/donate" className="transition-colors hover:text-hope">
                    Support HOPE
                </Link>
            </nav>
        </header>
    );
}

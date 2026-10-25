export default function Footer() {
    return (
        <footer className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-3 px-6 py-8 text-center text-sm text-quiet sm:flex-row sm:text-left lg:px-10">
            <p>H.O.P.E. is a registered nonprofit. Together, change is possible.</p>
            <div className="flex gap-6">
                <a href="#" className="transition-colors hover:text-hope">Privacy</a>
                <a href="#" className="transition-colors hover:text-hope">Contact</a>
            </div>
        </footer>
    );
}

"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Clock3,
  LockKeyhole,
  Mail,
  ShieldAlert,
} from "lucide-react";

const fieldClassName =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-700 focus:ring-4 focus:ring-sky-700/10";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fffef8] font-[450] text-slate-900">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="/"
          className="flex items-center gap-2.5 rounded-lg text-sm font-bold tracking-[0.16em] text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-800"
          aria-label="H.O.P.E. home"
        >
          <Image
            src="/hope-logo.png"
            alt=""
            aria-hidden="true"
            width={90}
            height={154}
            className="h-10 w-auto"
          />
          H.O.P.E.
        </a>
      </header>

      <section id="top" className="relative isolate">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-20">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.82fr)] lg:gap-20">
            <div className="pt-1">
              <h1 className="mt-7 max-w-2xl font-serif text-5xl leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
                Let’s figure out
                <br />
                <span>what you need.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Tell us a little about how we can help. A few basic details are
                enough for our team to point you in the right direction.
              </p>
              <aside className="mt-12 max-w-xl rounded-2xl border border-[#c6e2ef] bg-[#eff8fc] p-5 sm:p-6">
                <div className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-sky-800 shadow-sm">
                    <Clock3 aria-hidden="true" size={21} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      A student-powered team
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      H.O.P.E. is run by students, so replies may take a few
                      business days. Allow extra time during exams and university
                      breaks. We’ll get back to you as soon as we can.
                    </p>
                    <p className="mt-3 text-xs font-medium leading-5 text-slate-500">
                      We’re not an emergency service. If you need immediate
                      help, contact local emergency services.
                    </p>
                  </div>
                </div>
              </aside>
            </div>

            <div
              id="contact-form"
              className="scroll-mt-8 rounded-[1.75rem] border border-[#f0e2b4] bg-white p-5 shadow-[0_24px_70px_-35px_rgba(91,66,8,0.2)] sm:p-8"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-sky-800">
                <Mail aria-hidden="true" size={17} />
                Contact our team
              </div>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.03em] text-slate-950">
                How can we help?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Share only what you’re comfortable sharing. We’ll use these
                details to follow up with you.
              </p>

              <div
                role="note"
                className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4"
              >
                <div className="flex gap-3">
                  <ShieldAlert
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-amber-800"
                    size={20}
                    strokeWidth={2}
                  />
                  <div>
                    <p className="text-sm font-bold text-amber-950">
                      Please don’t share sensitive medical information
                    </p>
                    <p className="mt-1.5 text-sm leading-5 text-amber-900">
                      This isn’t a secure medical portal. Don’t include
                      diagnoses, medications, health records, insurance details,
                      or other private health information.
                    </p>
                  </div>
                </div>
              </div>

              <form
                className="mt-6 space-y-5"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-slate-800"
                    >
                      Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      required
                      className={fieldClassName}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-slate-800"
                    >
                      Email <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      className={fieldClassName}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Phone{" "}
                    <span className="font-normal text-slate-500">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(555) 555-5555"
                    className={fieldClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="need"
                    className="text-sm font-semibold text-slate-800"
                  >
                    What do you need help with?{" "}
                    <span className="text-red-700">*</span>
                  </label>
                  <textarea
                    id="need"
                    name="need"
                    rows={4}
                    required
                    placeholder="A brief, general description is plenty."
                    aria-describedby="need-guidance"
                    className={`${fieldClassName} resize-y`}
                  />
                  <p
                    id="need-guidance"
                    className="mt-2 flex items-start gap-2 text-xs leading-5 text-slate-500"
                  >
                    <LockKeyhole
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                      size={14}
                    />
                    Keep it general. Please don’t include personal health
                    details or identifying information about anyone else.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600">
                  <p className="font-semibold text-slate-800">
                    This form is not accepting submissions yet.
                  </p>
                  <p className="mt-0.5">
                    Your entries will not be sent or stored by this page.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled
                  className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-sky-800 px-5 py-3.5 text-sm font-semibold text-white/80 shadow-sm disabled:opacity-70"
                >
                  Intake opening soon
                  <ArrowUpRight aria-hidden="true" size={16} />
                </button>
              </form>

              <p className="mt-5 text-center text-xs leading-5 text-slate-500">
                Please only provide contact details you’re comfortable sharing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

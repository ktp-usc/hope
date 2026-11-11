import type { Metadata } from "next";
import { Clock3, ArrowRight, CheckCircle } from "lucide-react";
import GetHelpForm from "@/components/forms/GetHelpForm";

export const metadata: Metadata = {
  title: "Get Help | H.O.P.E. - Hands on Prosthetic Engineering",
  description:
    "Connect with HOPE to discuss prosthetic, assistive, adaptive, and accessibility engineering needs.",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="h-0.5 w-5 bg-hope" />
      <span className="text-[11px] font-bold uppercase tracking-wider text-ink">
        {children}
      </span>
    </div>
  );
}

export default function GetHelpPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <header className="bg-sun px-6 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div>
            <Eyebrow>Get Help</Eyebrow>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Have a need HOPE may be able to help with?
            </h1>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="mt-5 text-base leading-relaxed text-quiet">
              HOPE works with individuals, families, organizations, and community
              partners on prosthetic, assistive, adaptive, accessibility, and other
              practical engineering needs.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-quiet">
              Every project is different. Some needs may be addressed by an existing
              or adaptable design, while others may require a customized solution. The
              first step is simply to tell us what you are trying to accomplish.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-quiet">
              You do not need to provide detailed medical information in your initial
              request. A short description of the need, task, or challenge is enough
              to begin the conversation.
            </p>

            {/* Student-Powered Expectation Callout Card */}
            <aside
              aria-label="Student-Powered Timeline Expectation"
              className="mt-8 rounded-2xl border border-line bg-wash p-5 sm:p-6"
            >
              <div className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-hope-deep shadow-sm">
                  <Clock3 aria-hidden="true" size={22} strokeWidth={1.8} />
                </span>
                <div>
                  <h2 className="text-base font-bold text-ink">
                    A student-powered team
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-quiet sm:text-sm">
                    HOPE’s project work is largely carried out by students who balance
                    their HOPE responsibilities with classes, exams, jobs, and other
                    commitments. As a result, projects may take longer than they might
                    in a commercial setting.
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-quiet">
                    Each project’s timeline depends on its complexity, technical
                    requirements, student availability, and HOPE’s capacity at the time.
                  </p>
                  <p className="mt-3 border-t border-line pt-2.5 text-[11px] font-medium leading-normal text-quiet">
                    We are not an emergency service. If you need immediate assistance,
                    please contact local emergency or crisis services.
                  </p>
                </div>
              </div>
            </aside>

            {/* What Happens Next Card */}
            <div className="mt-8 rounded-2xl border border-line bg-paper p-5 sm:p-6">
              <h2 className="text-base font-bold text-ink">
                What happens next
              </h2>
              <ul className="mt-3 space-y-2.5 text-xs text-quiet sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-hope" />
                  <span>A HOPE representative will review your request and follow up with you.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-hope" />
                  <span>If the project appears to be a good fit, the next step is usually to better understand the need, technical requirements, and possible path forward.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight size={16} className="mt-0.5 shrink-0 text-slate-400" />
                  <span>Submitting a request does not guarantee that HOPE can take on the project. If a request is not a good fit, HOPE may be able to point you toward another organization, resource, or community.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            <GetHelpForm />
          </div>
        </div>
      </section>
    </main>
  );
}

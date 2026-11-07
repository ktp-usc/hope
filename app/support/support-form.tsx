"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const interestOptions = [
    { value: "equipment", label: "Sponsor equipment" },
    { value: "materials", label: "Donate materials" },
    { value: "expertise", label: "Offer expertise" },
    { value: "workplace", label: "Workplace giving" },
    { value: "other", label: "Other inquiry" },
] as const;

/**
 * Inquiry form allowing users to submit interest in supporting HOPE through
 * equipment, materials, expertise, or workplace giving.
 * To be connected to the email intake API in a subsequent ticket.
 */
export default function SupportForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [interest, setInterest] = useState<string>("equipment");
    const [message, setMessage] = useState("");
    const [done, setDone] = useState(false);

    const valid = name.trim().length > 0 && email.trim().includes("@") && message.trim().length > 0;

    /**
     * Handles support form submission and displays the confirmation state when valid.
     *
     * @param e - Form submission event.
     */
    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (valid) {
            setDone(true);
        }
    }

    /**
     * Resets form values and returns the form to the entry state.
     */
    function onReset() {
        setName("");
        setEmail("");
        setInterest("equipment");
        setMessage("");
        setDone(false);
    }

    return (
        <form
            onSubmit={onSubmit}
            className="mx-auto w-full max-w-[460px] rounded-3xl border border-line bg-white p-6 shadow-[0_2px_4px_rgba(16,39,67,0.04),0_24px_48px_-16px_rgba(16,39,67,0.14)] sm:p-8"
        >
            {done ? (
                <div role="status" className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <h2 className="font-display text-4xl tracking-[-0.02em] text-ink">Thank you.</h2>
                    <p className="mt-3 max-w-[20rem] leading-7 text-quiet text-pretty">
                        We appreciate your willingness to support H.O.P.E. Our team will review your message and reach out shortly.
                    </p>
                    <button
                        type="button"
                        onClick={onReset}
                        className="mt-8 text-sm font-bold text-hope underline decoration-2 underline-offset-4 hover:text-hope-deep"
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="font-display text-3xl tracking-[-0.02em] text-ink sm:text-4xl">Support H.O.P.E.</h2>
                    <p className="mt-2 text-sm text-quiet">
                        Direct donations are temporarily paused, but there are many vital ways to help. Let us know how you can contribute.
                    </p>

                    <div className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="support-name" className="block text-xs font-bold uppercase tracking-wider text-quiet">
                                Full Name
                            </label>
                            <input
                                id="support-name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition-colors placeholder:text-quiet focus:border-hope focus:ring-4 focus:ring-hope/10"
                            />
                        </div>

                        <div>
                            <label htmlFor="support-email" className="block text-xs font-bold uppercase tracking-wider text-quiet">
                                Email Address
                            </label>
                            <input
                                id="support-email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition-colors placeholder:text-quiet focus:border-hope focus:ring-4 focus:ring-hope/10"
                            />
                        </div>

                        <div>
                            <label htmlFor="support-interest" className="block text-xs font-bold uppercase tracking-wider text-quiet">
                                Area of Interest
                            </label>
                            <select
                                id="support-interest"
                                value={interest}
                                onChange={(e) => setInterest(e.target.value)}
                                className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-hope focus:ring-4 focus:ring-hope/10"
                            >
                                {interestOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="support-message" className="block text-xs font-bold uppercase tracking-wider text-quiet">
                                Message
                            </label>
                            <textarea
                                id="support-message"
                                rows={4}
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell us how you would like to help or collaborate..."
                                className="mt-1.5 w-full resize-none rounded-xl border border-line p-4 text-sm outline-none transition-colors placeholder:text-quiet focus:border-hope focus:ring-4 focus:ring-hope/10"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={!valid}
                        className="mt-6 h-12 w-full rounded-xl bg-hope text-base font-bold text-white hover:bg-hope-deep"
                    >
                        Send support inquiry
                    </Button>

                    <p className="mt-4 text-center text-xs text-quiet">
                        Prefer direct email? Reach our Logistics lead at{" "}
                        <a
                            href="mailto:aturner@handsonhope.ngo?subject=Supporting%20HOPE%20Inquiry"
                            className="text-quiet transition-colors hover:text-hope hover:underline decoration-1 underline-offset-2"
                        >
                            aturner@handsonhope.ngo
                        </a>
                    </p>
                </>
            )}
        </form>
    );
}

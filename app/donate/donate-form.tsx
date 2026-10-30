"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const amounts = [25, 50, 100, 250];
const frequencies = [
    { value: "once", label: "Give once" },
    { value: "monthly", label: "Give monthly" },
] as const;

export default function DonateForm() {
    const [frequency, setFrequency] = useState<"once" | "monthly">("monthly");
    const [preset, setPreset] = useState(50);
    const [custom, setCustom] = useState("");
    const [done, setDone] = useState(false);

    const amount = custom ? Number(custom) : preset;
    const valid = Number.isFinite(amount) && amount >= 1;
    const monthly = frequency === "monthly";

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (valid) setDone(true); // shortcut: no payment processor wired up, add one before launch
    }

    return (
        <form onSubmit={onSubmit} className="w-full rounded-[28px] border border-line bg-white p-6 shadow-[0_2px_4px_rgba(16,39,67,0.04),0_24px_48px_-16px_rgba(16,39,67,0.14)] sm:p-10">
            {done ? (
                <div role="status" className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <h2 className="font-display text-4xl tracking-[-0.02em]">Thank you.</h2>
                    <p className="mt-3 max-w-[18rem] leading-7 text-quiet text-pretty">
                        Your {monthly ? "monthly " : ""}gift of ${amount} is a real act of hope.
                    </p>
                    <button type="button" onClick={() => setDone(false)} className="mt-8 text-sm font-bold text-hope underline decoration-2 underline-offset-4 hover:text-hope-deep">
                        Make another gift
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="font-display text-4xl tracking-[-0.02em]">Choose your gift</h2>

                    <div role="group" aria-label="Frequency" className="mt-7 grid grid-cols-2 rounded-xl bg-[#f0f4f8] p-1">
                        {frequencies.map(({ value, label }) => (
                            <button
                                key={value}
                                type="button"
                                aria-pressed={frequency === value}
                                onClick={() => setFrequency(value)}
                                className={cn(
                                    "rounded-lg px-4 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-hope",
                                    frequency === value ? "bg-white text-hope shadow-sm" : "text-quiet hover:text-ink",
                                )}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div role="group" aria-label="Amount" className="mt-6 grid grid-cols-4 gap-2.5">
                        {amounts.map((value) => {
                            const active = preset === value && !custom;
                            return (
                                <button
                                    key={value}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => {
                                        setPreset(value);
                                        setCustom("");
                                    }}
                                    className={cn(
                                        "rounded-xl border py-3.5 text-sm font-bold tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-hope",
                                        active ? "border-hope bg-wash text-hope" : "border-line hover:border-hope/50",
                                    )}
                                >
                                    ${value}
                                </button>
                            );
                        })}
                    </div>

                    <label className="relative mt-3 block">
                        <span className="sr-only">Custom donation amount in dollars</span>
                        <span aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-quiet">$</span>
                        <input
                            type="number"
                            inputMode="decimal"
                            min="1"
                            step="0.01"
                            value={custom}
                            onChange={(e) => setCustom(e.target.value)}
                            placeholder="Other amount"
                            aria-invalid={custom !== "" && !valid}
                            className="w-full rounded-xl border border-line py-3.5 pl-9 pr-4 tabular-nums outline-none transition-colors placeholder:text-quiet focus:border-hope focus:ring-4 focus:ring-hope/10 aria-invalid:border-red-600"
                        />
                    </label>
                    {custom !== "" && !valid && (
                        <p role="alert" className="mt-2 text-sm text-red-700">Enter an amount of $1 or more.</p>
                    )}

                    <Button
                        type="submit"
                        disabled={!valid}
                        className="mt-6 h-14 w-full rounded-xl bg-hope text-[17px] font-extrabold text-white hover:bg-hope-deep"
                    >
                        {monthly ? "Donate monthly" : "Donate now"}{valid ? ` · $${amount}` : ""}
                    </Button>
                    <p className="mt-4 text-center text-sm text-quiet">Secure, encrypted donation</p>
                </>
            )}
        </form>
    );
}

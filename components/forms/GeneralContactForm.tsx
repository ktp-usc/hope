"use client";

import type { FormEvent } from "react";

const inquiryTypes = [
    "General Question",
    "Partnership / Collaboration",
    "Student at Another University",
    "In-Kind / Material Support",
    "Media / Press Inquiry",
    "Other",
];

export default function GeneralContactForm() {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        if (formData.get("website")) return;

        const name = String(formData.get("name") ?? "");
        const email = String(formData.get("email") ?? "");
        const phone = String(formData.get("phone") ?? "");
        const inquiryType = String(formData.get("inquiryType") ?? "");
        const message = String(formData.get("message") ?? "");
        const body = [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || "Not provided"}`,
            `Inquiry type: ${inquiryType}`,
            "",
            message,
        ].join("\n");

        window.location.href = `mailto:aturner@handsonhope.ngo?subject=${encodeURIComponent(inquiryType)}&body=${encodeURIComponent(body)}`;
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-800" htmlFor="name">Name</label>
                    <input className="w-full rounded-xl border border-[#121212]/20 bg-white px-4 py-3 text-[#121212] outline-none transition placeholder:text-[#121212]/40 focus:border-[#458fd2] focus:ring-2 focus:ring-[#458fd2]/30" id="name" name="name" type="text" autoComplete="name" required />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-800" htmlFor="email">Email</label>
                    <input className="w-full rounded-xl border border-[#121212]/20 bg-white px-4 py-3 text-[#121212] outline-none transition placeholder:text-[#121212]/40 focus:border-[#458fd2] focus:ring-2 focus:ring-[#458fd2]/30" id="email" name="email" type="email" autoComplete="email" required />
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-800" htmlFor="phone">Phone <span className="font-normal text-slate-500">(optional)</span></label>
                    <input className="w-full rounded-xl border border-[#121212]/20 bg-white px-4 py-3 text-[#121212] outline-none transition placeholder:text-[#121212]/40 focus:border-[#458fd2] focus:ring-2 focus:ring-[#458fd2]/30" id="phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-800" htmlFor="inquiryType">What is your inquiry about?</label>
                    <select className="w-full rounded-xl border border-[#121212]/20 bg-white px-4 py-3 text-[#121212] outline-none transition focus:border-[#458fd2] focus:ring-2 focus:ring-[#458fd2]/30" id="inquiryType" name="inquiryType" defaultValue="" required>
                        <option value="" disabled>Select an inquiry type</option>
                        {inquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-800" htmlFor="message">Message</label>
                <textarea className="min-h-36 w-full resize-y rounded-xl border border-[#121212]/20 bg-white px-4 py-3 text-[#121212] outline-none transition placeholder:text-[#121212]/40 focus:border-[#458fd2] focus:ring-2 focus:ring-[#458fd2]/30" id="message" name="message" rows={5} required />
            </div>

            <p className="rounded-xl bg-white px-4 py-3 text-sm leading-6 text-[#121212]">
                Please keep your message general. Do not include sensitive personal information or medical information.
            </p>

            <button className="inline-flex items-center justify-center rounded-full bg-[#f8cd53] px-6 py-3 font-semibold text-[#121212] transition hover:bg-[#e95c36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212]" type="submit">
                Open email draft
            </button>
            <p className="text-xs leading-5 text-[#121212]/60">This form opens a draft in your email app; it does not send or store your message on this website.</p>
        </form>
    );
}

"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  contactingFor: string;
  lookingFor: string;
  description: string;
  bestContactMethod: string;
  honeypot: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  contactingFor: "",
  lookingFor: "",
  description: "",
  bestContactMethod: "Email",
  honeypot: "",
};

const CONTACTING_FOR_OPTIONS = [
  "Myself",
  "Family member",
  "Organization",
  "Someone else",
] as const;

const LOOKING_FOR_OPTIONS = [
  "Prosthetic",
  "Assistive or adaptive",
  "Accessibility",
  "Task-specific",
  "Other or not sure",
] as const;

const BEST_CONTACT_OPTIONS = ["Email", "Phone"] as const;

export default function GetHelpForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (name === "bestContactMethod" && value !== "Phone" && fieldErrors.phone) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot anti-spam check: bots fill hidden inputs
    if (formData.honeypot) {
      // Silently simulate success for bots
      setIsSubmitted(true);
      return;
    }

    // Client-side field-specific validation
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Please enter your name.";
    }

    const emailTrim = formData.email.trim();
    if (!emailTrim) {
      errors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
      errors.email = "Please enter a valid email address.";
    }

    if (formData.bestContactMethod === "Phone" && !formData.phone.trim()) {
      errors.phone = "Please enter your phone number.";
    }

    if (!formData.contactingFor) {
      errors.contactingFor = "Please select who you are contacting HOPE for.";
    }

    if (!formData.lookingFor) {
      errors.lookingFor = "Please select what you are looking for.";
    }

    if (!formData.description.trim()) {
      errors.description = "Please describe what you want help accomplishing.";
    }

    if (!formData.bestContactMethod) {
      errors.bestContactMethod = "Please select your preferred contact method.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Please complete all required fields correctly before submitting.");
      return;
    }

    setIsSubmitting(true);

    // Simulate clean dispatch / preparation for future backend intake routing
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSubmitted(true);
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setErrorMessage("");
    setFieldErrors({});
  };

  if (isSubmitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-3xl border border-[#d6e7f5] bg-white p-8 sm:p-10 shadow-[0_2px_4px_rgba(16,39,67,0.04),0_24px_48px_-16px_rgba(16,39,67,0.12)] text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eff8fc] text-[#1260d6]">
          <CheckCircle2 size={32} className="text-[#0f55bd]" />
        </div>
        <h3 className="mt-5 text-2xl font-bold tracking-tight text-[#1b2d4c] sm:text-3xl">
          Thank you for reaching out.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base max-w-md mx-auto">
          A HOPE representative will review your request and follow up with you.
          Because our project work is powered by full-time students balancing classes
          and exams, please allow a few business days for our initial reply.
        </p>
        <div className="mt-8">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-lg bg-[#f7d06b] px-6 py-2.5 text-sm font-semibold text-[#12303f] shadow-sm transition hover:bg-[#f3c64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f]"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  const getInputClass = (hasError?: boolean) =>
    `mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1b2d4c] shadow-sm transition outline-none placeholder:text-slate-400 ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
        : "border-slate-200 focus:border-[#1260d6] focus:ring-4 focus:ring-[#1260d6]/10"
    }`;
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-700";

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_2px_4px_rgba(16,39,67,0.04),0_24px_48px_-16px_rgba(16,39,67,0.12)]">
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-[#1b2d4c]">
          Intake Form
        </h2>
        <p className="mt-1.5 text-sm text-slate-600">
          Tell us about the need, task, or challenge you are hoping to address.
        </p>
      </div>

      {/* Non-HIPAA / Privacy Notice: Tasteful, reassuring, not jarring */}
      <div
        role="note"
        aria-label="Privacy and Non-HIPAA Notice"
        className="mt-6 rounded-xl border border-amber-200/80 bg-[#fffdf5] p-4 text-slate-700"
      >
        <div className="flex items-start gap-3">
          <div className="text-xs leading-relaxed">
            <span className="font-semibold text-amber-950">
              Non-Medical Privacy Notice:{" "}
            </span>
            Please do not include medical records, diagnoses, or sensitive
            personal information in this initial request. If additional details are
            needed later, HOPE will work with you on the appropriate next step.
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        {/* Error notification if validation fails */}
        {errorMessage && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-800"
          >
            {errorMessage}
          </div>
        )}

        {/* Hidden Honeypot Field */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
        >
          <label htmlFor="hp_security_field">Do not fill this field</label>
          <input
            id="hp_security_field"
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Row 1: Name and Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              className={getInputClass(!!fieldErrors.name)}
            />
            {fieldErrors.name && (
              <p id="name-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={getInputClass(!!fieldErrors.email)}
            />
            {fieldErrors.email && (
              <p id="email-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone{" "}
            {formData.bestContactMethod === "Phone" ? (
              <span className="text-red-600">*</span>
            ) : (
              <span className="text-xs font-normal lowercase tracking-normal text-slate-500">(optional)</span>
            )}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required={formData.bestContactMethod === "Phone"}
            autoComplete="tel"
            placeholder="(555) 555-5555"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            className={getInputClass(!!fieldErrors.phone)}
          />
          {fieldErrors.phone && (
            <p id="phone-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
              {fieldErrors.phone}
            </p>
          )}
        </div>

        {/* Row 3: Contacting For & Looking For */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contactingFor" className={labelClass}>
              Who are you contacting HOPE for? <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <select
                id="contactingFor"
                name="contactingFor"
                required
                value={formData.contactingFor}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.contactingFor}
                aria-describedby={fieldErrors.contactingFor ? "contactingFor-error" : undefined}
                className={`${getInputClass(!!fieldErrors.contactingFor)} appearance-none pr-8 bg-white cursor-pointer`}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {CONTACTING_FOR_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                ▼
              </div>
            </div>
            {fieldErrors.contactingFor && (
              <p id="contactingFor-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
                {fieldErrors.contactingFor}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lookingFor" className={labelClass}>
              What are you looking for? <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <select
                id="lookingFor"
                name="lookingFor"
                required
                value={formData.lookingFor}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.lookingFor}
                aria-describedby={fieldErrors.lookingFor ? "lookingFor-error" : undefined}
                className={`${getInputClass(!!fieldErrors.lookingFor)} appearance-none pr-8 bg-white cursor-pointer`}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {LOOKING_FOR_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                ▼
              </div>
            </div>
            {fieldErrors.lookingFor && (
              <p id="lookingFor-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
                {fieldErrors.lookingFor}
              </p>
            )}
          </div>
        </div>

        {/* Row 4: Description */}
        <div>
          <label htmlFor="description" className={labelClass}>
            Briefly describe what you want help accomplishing <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            placeholder="A brief, general description of the need, task, or challenge is plenty to begin."
            value={formData.description}
            onChange={handleChange}
            aria-invalid={!!fieldErrors.description}
            aria-describedby={
              fieldErrors.description
                ? "description-error description-hint"
                : "description-hint"
            }
            className={`${getInputClass(!!fieldErrors.description)} resize-y`}
          />
          {fieldErrors.description && (
            <p id="description-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
              {fieldErrors.description}
            </p>
          )}
          <p id="description-hint" className="mt-1.5 text-xs text-slate-500">
            A short description of the need or challenge is enough. Please keep it general.
          </p>
        </div>

        {/* Row 5: Best Contact Method */}
        <fieldset className="border-0 p-0 m-0">
          <legend className={labelClass}>
            Best contact method <span className="text-red-600">*</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-4">
            {BEST_CONTACT_OPTIONS.map((method) => (
              <label
                key={method}
                className="inline-flex items-center gap-2 text-sm text-[#1b2d4c] cursor-pointer"
              >
                <input
                  type="radio"
                  name="bestContactMethod"
                  value={method}
                  checked={formData.bestContactMethod === method}
                  onChange={handleChange}
                  aria-describedby={fieldErrors.bestContactMethod ? "bestContactMethod-error" : undefined}
                  aria-invalid={!!fieldErrors.bestContactMethod}
                  className="h-4 w-4 border-slate-300 text-[#1260d6] focus:ring-[#1260d6]"
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
          {fieldErrors.bestContactMethod && (
            <p id="bestContactMethod-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
              {fieldErrors.bestContactMethod}
            </p>
          )}
        </fieldset>

        {/* Primary CTA Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f7d06b] px-6 py-3.5 text-sm font-semibold text-[#12303f] shadow-sm transition hover:bg-[#f3c64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12303f] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Submitting..." : "Tell Us What You Need"}
            <ArrowUpRight aria-hidden="true" size={17} />
          </button>
        </div>
      </form>
    </div>
  );
}

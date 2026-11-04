"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { reconnectFields, validateReconnect, type ReconnectErrors } from "@/lib/alumni-reconnect";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export default function AlumniReconnectForm() {
  const [errors, setErrors] = useState<ReconnectErrors>({});
  const [feedback, setFeedback] = useState("");
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const feedbackRef = useRef<HTMLParagraphElement>(null);

  // A disabled native submit button prevents fallback GET submission before hydration
  // or when JavaScript is unavailable, keeping contact values out of the URL.

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validateReconnect(new FormData(form));
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setFeedback("Please review the form. Nothing has been sent.");
      const first = Object.keys(nextErrors).find((key) => key !== "website");
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      else feedbackRef.current?.focus();
      return;
    }
    // No approved backend exists. Never send, persist, log, or claim receipt of these values.
    setFeedback("Your entries passed the form checks, but sending is unavailable. Nothing has been sent or saved. Your entries remain here while this page stays open.");
    feedbackRef.current?.focus();
  }

  function fields(start: number, end: number) {
    return reconnectFields.slice(start, end).map((field) => {
      const id = `alumni-${field.name}`;
      const props = {
        id, name: field.name, required: field.required, maxLength: field.maxLength,
        "aria-invalid": Boolean(errors[field.name]),
        "aria-describedby": errors[field.name] ? `${id}-error` : undefined,
        className: "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hope",
      };
      return <div key={field.name}>
        <label htmlFor={id} className="text-sm font-semibold">{field.label}{field.required ? " (required)" : ""}</label>
        {field.type === "textarea" ? <textarea {...props} rows={4} /> : <input {...props} type={field.type} autoComplete={"autoComplete" in field ? field.autoComplete : "off"} />}
        {errors[field.name] && <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-red-800">{errors[field.name]}</p>}
      </div>;
    });
  }

  return <form onSubmit={onSubmit} noValidate aria-label="Alumni reconnect form" aria-describedby="alumni-intake-notice" className="space-y-8 rounded-3xl border border-line bg-white p-5 sm:p-8">
    <div id="alumni-intake-notice" className="rounded-2xl bg-wash p-5 text-sm leading-6">
      <p className="font-bold">Sending is not available yet.</p>
      <p>This form is ready for reconnecting once our submission service is connected. You can check your entries below, but nothing will be sent or saved. Please wait until sending is available before entering personal information.</p>
    </div>
    <fieldset className="space-y-5">
      <legend className="mb-3 text-xl font-semibold">Private contact details</legend>
      <p className="text-sm leading-6 text-quiet">These details are for private follow-up and will never appear in the alumni directory.</p>
      {fields(0, 3)}
    </fieldset>
    <fieldset className="space-y-5 border-t border-line pt-6">
      <legend className="pr-3 text-xl font-semibold">Your time with HOPE</legend>
      <p className="text-sm leading-6 text-quiet">Help us reconstruct the record. Include source references where possible. All information requires review; please avoid private details about other people.</p>
      {fields(3, 7)}
    </fieldset>
    <fieldset className="space-y-5 border-t border-line pt-6">
      <legend className="pr-3 text-xl font-semibold">Stay involved</legend>
      <label className="flex items-start gap-3 text-sm leading-6"><input className="mt-1 size-5 shrink-0 accent-hope" type="checkbox" name="interestedInMentoring" />I am interested in mentoring. This preference is private.</label>
      <label className="flex items-start gap-3 text-sm leading-6"><input className="mt-1 size-5 shrink-0 accent-hope" type="checkbox" name="consentToPublicListing" />I consent to publication of my name, graduation year or years involved, roles or projects, and current field or organization in the alumni directory after verification and staff approval. My contact details and historical corrections or stories are excluded.</label>
      <p className="text-sm leading-6 text-quiet">Public listing is optional. You can reconnect without consenting. Submissions are never published automatically; stories and other materials need separate permission.</p>
    </fieldset>
    <div hidden aria-hidden="true"><label htmlFor="alumni-website">Leave this field empty</label><input id="alumni-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
    <noscript><p>Checking entries requires JavaScript. Sending is currently unavailable.</p></noscript>
    <Button type="submit" disabled={!ready} className="h-auto min-h-12 w-full whitespace-normal rounded-xl bg-hope px-5 py-3 text-white hover:bg-hope-deep">Check entries — sending unavailable</Button>
    <p ref={feedbackRef} tabIndex={-1} role="status" aria-live="polite" className="text-sm leading-6 focus-visible:outline-2 focus-visible:outline-hope">{feedback}</p>
  </form>;
}

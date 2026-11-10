'use client';

import { useState } from 'react';
import { contactMailto, type ContactEmail } from '@/lib/contact-email';

export default function EmailContact({ email, title, description, buttonLabel = 'Open email draft', compact = false }: {
  email: ContactEmail; title: string; description?: string; buttonLabel?: string; compact?: boolean;
}) {
  const [status, setStatus] = useState('');
  async function copy(value: string, label: string) {
    try { await navigator.clipboard.writeText(value); setStatus(`${label} copied.`); }
    catch { setStatus('Copy is unavailable. Select and copy the address or template below.'); }
  }
  return <div className="h-full rounded-3xl border border-line bg-white p-6 sm:p-8">
    <h2 className={`text-2xl font-bold text-ink ${compact ? 'sm:min-h-16' : ''}`}>{title}</h2>
    {description && <p className="mt-3 leading-7 text-quiet">{description}</p>}
    {!compact && <p className="mt-4 text-sm leading-6 text-quiet">Please do not include sensitive personal or medical information in your initial email.</p>}
    <a href={contactMailto(email)} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-hope px-6 py-3 text-center font-bold text-white hover:bg-hope-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hope">{buttonLabel}</a>
    {!compact && <p className="mt-3 text-sm leading-6 text-quiet">Opens your email app. Review the placeholders and send the email yourself. Nothing is submitted or saved by this website.</p>}
    <p className="mt-4 break-all text-sm text-ink">{email.recipient}</p>
    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-hope">
      <button type="button" onClick={() => copy(email.recipient, 'Email address')} className="min-h-11 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Copy email address</button>
      <button type="button" onClick={() => copy(`To: ${email.recipient}\nSubject: ${email.subject}\n\n${email.body}`, 'Email template')} className="min-h-11 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Copy email template</button>
    </div>
    <details className="mt-3 text-sm text-quiet"><summary className="cursor-pointer py-2 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">No email app? View template</summary><p className="mt-3 break-words font-semibold">Subject: {email.subject}</p><pre className="mt-3 whitespace-pre-wrap break-words [font-family:inherit] leading-6">{email.body}</pre></details>
    <p role="status" aria-live="polite" className="mt-2 text-sm text-quiet">{status}</p>
  </div>;
}

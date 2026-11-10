'use client';

import { useState, useSyncExternalStore } from 'react';
import { Select } from 'radix-ui';
import { Check, ChevronDown, Mail } from 'lucide-react';
import { contactLabels, contactMailto, type ContactEmails, type ContactPurpose } from '@/lib/contact-email';

const purposes: ContactPurpose[] = ['general', 'partnerships', 'students-outside-usc', 'support', 'media', 'other'];
const subscribe = (notify: () => void) => {
  window.addEventListener('hashchange', notify);
  return () => window.removeEventListener('hashchange', notify);
};
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => '';

export default function ContactCard({ emails }: { emails: ContactEmails }) {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  const [selection, setSelection] = useState<{ hash: string; purpose: ContactPurpose } | null>(null);
  const [status, setStatus] = useState('');
  const purpose = selection?.hash === hash ? selection.purpose
    : purposes.find(value => value === hash) ?? 'general';
  const email = emails[purpose];

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(email.recipient);
      setStatus('Email address copied.');
    } catch {
      setStatus('Copy is unavailable. Select and copy the email address below.');
    }
  }

  return <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 xl:p-10">
    <h2 id="contact-card-title" className="text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl">Send us an email</h2>
    <p className="mt-3 text-base leading-7 text-quiet sm:text-lg">What can we help you with?</p>
    <div className="mt-8 grid items-end gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
      <div className="min-w-0">
        <label id="contact-inquiry-label" htmlFor="contact-inquiry" className="block text-sm font-semibold text-ink">Inquiry type</label>
        <Select.Root value={purpose} onValueChange={value => {
          setSelection({ hash, purpose: value as ContactPurpose });
          setStatus('');
        }}>
          <Select.Trigger id="contact-inquiry" aria-labelledby="contact-inquiry-label" className="mt-2 flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 text-left text-[16px] leading-6 text-ink hover:border-quiet focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hope">
            <Select.Value />
            <Select.Icon><ChevronDown size={18} aria-hidden="true" className="shrink-0 text-quiet" /></Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content position="popper" align="start" sideOffset={6} className="z-50 max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-line bg-white p-1.5 text-ink shadow-[0_8px_24px_rgba(16,39,67,0.14)]">
              <Select.Viewport>
                {purposes.map(value => <Select.Item key={value} value={value} className="relative flex min-h-11 cursor-default items-center rounded-lg py-2 pl-3 pr-9 text-[16px] leading-6 outline-none data-[highlighted]:bg-wash data-[highlighted]:text-ink data-[state=checked]:font-semibold">
                  <Select.ItemText>{contactLabels[value]}</Select.ItemText>
                  <Select.ItemIndicator className="absolute right-3"><Check size={16} aria-hidden="true" /></Select.ItemIndicator>
                </Select.Item>)}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <a href={contactMailto(email)} className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-hope px-6 py-3 font-bold text-white hover:bg-hope-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hope"><Mail size={18} aria-hidden="true" />Compose Email</a>
    </div>
    <p className="mt-4 max-w-xl text-sm leading-6 text-quiet">This opens your email app with a prefilled message. Review and send it when you&apos;re ready.</p>
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
      <span className="min-w-0 break-all text-sm text-ink">{email.recipient}</span>
      <button type="button" onClick={copyAddress} className="min-h-11 text-sm font-semibold text-hope underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Copy email address</button>
    </div>
    <p role="status" aria-live="polite" className="text-sm text-quiet">{status}</p>
    <div className="mt-6 border-t border-line pt-5 text-sm leading-6 text-quiet">
      <p>Please do not include sensitive personal or medical information in your initial email.</p>
    </div>
  </div>;
}

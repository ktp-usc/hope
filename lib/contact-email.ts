export const contactPurposes = ['general', 'get-help', 'partnerships', 'support', 'alumni', 'students-outside-usc', 'media', 'other', 'donation-inquiry'] as const;
export type ContactPurpose = typeof contactPurposes[number];
export type ContactEmail = { recipient: string; subject: string; body: string };
export type ContactEmails = Record<ContactPurpose, ContactEmail>;

export const contactLabels: Record<ContactPurpose, string> = {
  general: 'General Question', 'get-help': 'Assistive Engineering Inquiry',
  partnerships: 'Partnership / Collaboration', support: 'In-Kind / Material Support',
  alumni: 'Alumni Reconnection', 'students-outside-usc': 'Student at Another University',
  media: 'Media / Press Inquiry', other: 'Other', 'donation-inquiry': 'Donation Inquiry',
};

const prompts: Record<ContactPurpose, string[]> = {
  general: ['Inquiry Type: General Question', 'Message:\n[ENTER YOUR MESSAGE]'],
  'get-help': ['Contacting HOPE for: [MYSELF / FAMILY MEMBER / ORGANIZATION / SOMEONE ELSE]', 'Type of assistance: [PROSTHETIC / ASSISTIVE OR ADAPTIVE / ACCESSIBILITY / TASK-SPECIFIC / OTHER]', 'Brief description of the need:\n[DESCRIBE THE NEED OR TASK]', 'Preferred contact method: [EMAIL / PHONE]'],
  partnerships: ['Inquiry Type: Partnership / Collaboration', 'Organization (optional): [ENTER ORGANIZATION OR REMOVE]', 'Collaboration idea:\n[ENTER YOUR MESSAGE]'],
  support: ['Inquiry Type: In-Kind / Material Support', 'How I can contribute: [EQUIPMENT / MATERIALS / EXPERTISE / WORKPLACE GIVING / OTHER]', 'Message:\n[ENTER YOUR MESSAGE]'],
  alumni: ['Graduation year or years involved (optional): [ENTER OR REMOVE]', 'Roles or projects (optional): [ENTER OR REMOVE]', 'Current field or organization (optional): [ENTER OR REMOVE]', 'Historical corrections or stories (optional): [ENTER OR REMOVE; AVOID PRIVATE DETAILS ABOUT OTHERS]', 'Interested in mentoring (optional): [YES / NO / REMOVE]', 'Message:\n[ENTER YOUR MESSAGE]', 'This email does not authorize public listing. Please discuss verification and publication permission with me separately.'],
  'students-outside-usc': ['Inquiry Type: Student at Another University', 'Institution: [ENTER INSTITUTION]', 'Interests or proposed involvement:\n[ENTER YOUR MESSAGE]'],
  media: ['Inquiry Type: Media / Press Inquiry', 'Outlet or organization (optional): [ENTER OR REMOVE]', 'Topic: [ENTER TOPIC]', 'Deadline (optional): [ENTER OR REMOVE]', 'Message:\n[ENTER YOUR MESSAGE]'],
  other: ['Inquiry Type: [ENTER INQUIRY TYPE]', 'Message:\n[ENTER YOUR MESSAGE]'],
  'donation-inquiry': ['Question about giving:\n[ENTER YOUR MESSAGE; DO NOT INCLUDE PAYMENT DETAILS]'],
};

export const fallbackContactEmails = Object.fromEntries(contactPurposes.map(purpose => [purpose, {
  recipient: 'aturner@handsonhope.ngo', subject: `H.O.P.E. — ${contactLabels[purpose]}`,
  body: ['Name: [ENTER NAME]', 'Email: [ENTER EMAIL]', 'Phone Number (optional): [ENTER PHONE NUMBER OR REMOVE]', '', ...prompts[purpose], '', 'Please do not include sensitive personal or medical information in your initial email.'].join('\n'),
}])) as ContactEmails;

/** One plain mailbox only; reject URI/header delimiters and control characters. */
export function isContactRecipient(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 254 && /^[A-Za-z0-9.!$'*+_~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}$/.test(value);
}

/** Validate each published override independently, preserving working defaults for missing fields. */
export function resolveContactEmails(value: unknown): ContactEmails {
  const result = Object.fromEntries(contactPurposes.map(p => [p, { ...fallbackContactEmails[p] }])) as ContactEmails;
  if (!Array.isArray(value)) return result;
  const seen = new Set<string>();
  for (const item of value) {
    if (!item || !contactPurposes.includes(item.purpose) || seen.has(item.purpose)) continue;
    seen.add(item.purpose);
    const target = result[item.purpose as ContactPurpose];
    if (isContactRecipient(item.recipient)) target.recipient = item.recipient;
    if (typeof item.subject === 'string' && item.subject.trim() && item.subject.length <= 200 && !/[\r\n\x00-\x1f\x7f]/.test(item.subject)) target.subject = item.subject;
    if (typeof item.body === 'string' && item.body.trim() && item.body.length <= 2000 && !/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(item.body)) target.body = item.body;
  }
  return result;
}

/** Encode only subject/body; CRLF line endings preserve email-template formatting. */
export function contactMailto(email: ContactEmail): string {
  const recipient = email.recipient.split('@').map(encodeURIComponent).join('@');
  return `mailto:${recipient}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body.replace(/\r?\n/g, '\r\n'))}`;
}

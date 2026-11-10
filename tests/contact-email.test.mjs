import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, writeFileSync } from 'node:fs';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as helpers from '../lib/contact-email.ts';

function load(path, imports = {}) {
  const file = new URL(path, import.meta.url);
  const filename = file.pathname.replace(/^\/(\w:)/, '$1');
  const { outputText } = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  const require = createRequire(import.meta.url), mod = new Module(filename);
  mod.require = name => Object.hasOwn(imports, name) ? imports[name] : require(name);
  mod._compile(outputText, filename);
  return mod.exports;
}

test('all nine purposes work without CMS configuration and preserve required prompts', () => {
  for (const value of [null, [], {}, 'invalid']) {
    const emails = helpers.resolveContactEmails(value);
    assert.equal(Object.keys(emails).length, 9);
    for (const email of Object.values(emails)) {
      assert.equal(email.recipient, 'aturner@handsonhope.ngo');
      const uri = new URL(helpers.contactMailto(email));
      assert.equal(uri.protocol, 'mailto:');
      assert.equal(uri.searchParams.get('subject'), email.subject);
      assert.equal(uri.searchParams.get('body'), email.body.replace(/\r?\n/g, '\r\n'));
      assert(email.body.includes('Name: [ENTER NAME]'));
    }
    for (const prompt of ['Contacting HOPE for:', 'Type of assistance:', 'Brief description', 'Preferred contact method:']) assert(emails['get-help'].body.includes(prompt));
    assert(emails.alumni.body.includes('does not authorize public listing'));
  }
});

test('CMS overrides recipient, subject and body independently for each purpose', () => {
  const input = helpers.contactPurposes.map(purpose => ({ purpose, recipient: 'approved+test@example.org', subject: `${purpose} & question? #1`, body: 'Name: [NAME]\nMessage: a+b & 50% / café' }));
  const emails = helpers.resolveContactEmails(input);
  for (const purpose of helpers.contactPurposes) {
    const uri = new URL(helpers.contactMailto(emails[purpose]));
    assert.equal(decodeURIComponent(uri.pathname), 'approved+test@example.org');
    assert.equal(uri.searchParams.get('subject'), `${purpose} & question? #1`);
    assert.equal(uri.searchParams.get('body'), input[0].body.replace('\n', '\r\n'));
  }
  emails.general.recipient = 'mutated@example.org';
  assert.equal(helpers.fallbackContactEmails.general.recipient, 'aturner@handsonhope.ngo');
});

test('malformed configuration and header injection cannot break working email defaults', () => {
  for (const recipient of ['a@example.org?bcc=bad@example.org', 'a@example.org\r\nBcc:x@y.org', 'mailto:a@example.org', 'one@example.org,two@example.org', 'a@example.org%0a', 'https://example.org']) assert.equal(helpers.isContactRecipient(recipient), false);
  const emails = helpers.resolveContactEmails([
    { purpose: 'general', recipient: 'bad', subject: 'hello\r\nBcc:bad', body: 'bad\u0000' },
    { purpose: 'unknown', recipient: 'someone@example.org' },
    { purpose: 'support', recipient: 'valid@example.org' },
    { purpose: 'support', recipient: 'duplicate@example.org' },
  ]);
  assert.deepEqual(emails.general, helpers.fallbackContactEmails.general);
  assert.equal(emails.support.recipient, 'valid@example.org');
  assert.equal(emails.support.body, helpers.fallbackContactEmails.support.body);
});

test('loader reads only published singleton configuration and survives an outage', async () => {
  for (const failed of [false, true]) {
    const { getContactEmails } = load('../sanity/lib/contact-emails.ts', {
      'server-only': {}, '@/lib/contact-email': helpers,
      './client': { client: { fetch: async (query, params, options) => {
        assert(query.includes('_id == "siteSettings"')); assert(!query.includes('drafts.siteSettings'));
        assert.equal(options.perspective, 'published'); assert.equal(options.next.revalidate, 60);
        assert(options.signal instanceof AbortSignal); assert.deepEqual(params, {});
        if (failed) throw new Error('Mock outage');
        return [{ purpose: 'general', recipient: 'configured@example.org', subject: 'Configured subject', body: 'Configured body' }];
      } } },
    });
    assert.equal((await getContactEmails()).general.recipient, failed ? 'aturner@handsonhope.ngo' : 'configured@example.org');
  }
});

test('email component renders a working link and manual fallback without intake fields', () => {
  const Component = load('../components/contact/EmailContact.tsx', { '@/lib/contact-email': helpers }).default;
  const html = renderToStaticMarkup(createElement(Component, { email: helpers.fallbackContactEmails.general, title: 'General Question' }));
  assert(html.includes('href="mailto:aturner%40') === false);
  assert(html.includes('href="mailto:aturner@handsonhope.ngo?subject='));
  assert(html.includes('Copy email template')); assert(html.includes('<details'));
  assert(!/<form|<input|<textarea|<select/.test(html));
});

test('payment cards, URLs and donation toggle still render independently of contact templates', () => {
  const Donate = load('../app/support/donate.tsx', {
    '@/lib/contact-email': helpers, '@/components/contact/EmailContact': () => createElement('div', null, 'Support email fixture'),
  }).default;
  const settings = { donationsEnabled: true, donationMethods: [{ title: 'Approved payment fixture', url: 'https://example.org/approved-payment', enabled: true }] };
  const enabled = renderToStaticMarkup(createElement(Donate, { settings, contactEmails: helpers.fallbackContactEmails }));
  assert(enabled.includes('href="https://example.org/approved-payment"')); assert(!enabled.includes('Support email fixture'));
  const disabled = renderToStaticMarkup(createElement(Donate, { settings: { ...settings, donationsEnabled: false }, contactEmails: helpers.fallbackContactEmails }));
  assert(disabled.includes('Support email fixture')); assert(!disabled.includes('href="https://example.org/approved-payment"'));
  const unavailable = renderToStaticMarkup(createElement(Donate, { settings: { donationsEnabled: true, donationMethods: [] }, contactEmails: helpers.fallbackContactEmails }));
  assert(unavailable.includes(helpers.contactMailto(helpers.fallbackContactEmails['donation-inquiry']).replaceAll('&', '&amp;')));
});

test('Studio exposes editable email fields, rejects duplicate purposes, and retains donation controls', () => {
  const { siteSettings } = load('../sanity/schemaTypes/siteSettings.ts', {
    '../../lib/contact-email': helpers,
    sanity: { defineType: x => x, defineField: x => x, defineArrayMember: x => x },
  });
  assert(siteSettings.fields.some(x => x.name === 'donationsEnabled'));
  assert(siteSettings.fields.some(x => x.name === 'donationMethods'));
  const field = siteSettings.fields.find(x => x.name === 'contactEmails');
  assert.deepEqual(field.of[0].fields.map(x => x.name), ['purpose', 'recipient', 'subject', 'body']);
  let validate;
  field.validation({ custom: fn => { validate = fn; } });
  assert.equal(validate([{ purpose: 'general' }, { purpose: 'support' }]), true);
  assert.equal(typeof validate([{ purpose: 'general' }, { purpose: 'general' }]), 'string');
});

test('Contact page offers six configured purposes in one card and preserves the three approved pathways', async () => {
  const emails = helpers.resolveContactEmails([{ purpose: 'partnerships', recipient: 'partnership-fixture@example.org', subject: 'Fixture & collaboration', body: 'Fixture template\nMessage: [ENTER MESSAGE]' }]);
  const Component = load('../app/contact/_components/contact-card.tsx', { '@/lib/contact-email': helpers }).default;
  const Page = load('../app/contact/page.tsx', {
    './_components/contact-card': Component, '@/lib/contact-email': helpers,
    '@/sanity/lib/contact-emails': { getContactEmails: async () => emails },
    // Page metadata is outside what this test renders.
    '@/lib/seo': { pageMetadata: () => ({}) },
  }).default;
  const html = renderToStaticMarkup(await Page());
  assert(!/<form|<input|<textarea/.test(html));
  assert.equal((html.match(/<select/g) ?? []).length, 1);
  assert(html.includes('role="combobox"')); // Radix options mount when the menu opens; browser tests check all six.
  assert.equal((html.match(/href="mailto:/g) ?? []).length, 1);
  for (const path of ['/get-help', '/get-involved', '/alumni', 'https://garnetgate.sa.sc.edu/organization/hope']) assert(html.includes(`href="${path}"`));
  const cardSource = readFileSync(new URL('../app/contact/_components/contact-card.tsx', import.meta.url), 'utf8');
  for (const purpose of ['general', 'partnerships', 'students-outside-usc', 'support', 'media', 'other']) assert(cardSource.includes(`'${purpose}'`));
  assert(html.includes('Send us an email'));
  assert(html.includes('Have something else in mind?'));
  assert(html.includes('mailto:aturner@handsonhope.ngo'));
  assert(!html.includes('<pre'));
  const customGeneral = { ...emails, general: { recipient: 'configured@example.org', subject: 'Fixture & question', body: 'Configured body\n[ENTER NAME]' } };
  const customHtml = renderToStaticMarkup(createElement(Component, { emails: customGeneral }));
  assert(customHtml.includes('mailto:configured@example.org?subject=Fixture%20%26%20question'));
  assert(customHtml.includes('Configured%20body%0D%0A%5BENTER%20NAME%5D'));
  if (process.env.KAN38_REVIEW_HTML) writeFileSync(process.env.KAN38_REVIEW_HTML, html);
});

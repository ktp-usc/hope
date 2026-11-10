// Use a temporary Playwright installation; no project dependency or email delivery is needed.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fallbackContactEmails, contactMailto, contactLabels } from '../lib/contact-email.ts';
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(import.meta.url)(process.env.HOPE_PLAYWRIGHT_PATH ? path.join(process.env.HOPE_PLAYWRIGHT_PATH, 'index.js') : 'playwright');

const base = process.env.HOPE_REVIEW_URL || 'http://localhost:3000';
const output = process.env.HOPE_REVIEW_OUTPUT || '.next/contact-review';
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage(), errors = [], posts = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', r => { if (r.method() === 'POST' && r.url().startsWith(base)) posts.push(r.url()); });
  for (const width of [1440, 768, 375, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ['/contact', '/get-help', '/alumni', '/support']) {
      assert.equal((await page.goto(base + path)).status(), 200);
      await page.locator('h1').waitFor();
      assert.equal(await page.locator('main form, main input, main textarea').count(), 0);
      assert.equal(await page.locator('main select').count(), path === '/contact' ? 1 : 0);
      const links = await page.locator('main a[href^="mailto:"]').evaluateAll(a => a.map(x => x.href));
      assert(links.length > 0 || path === '/support'); // Active payments need not show an email option.
      for (const href of links) {
        const url = new URL(href);
        assert(url.searchParams.get('subject')); assert(url.searchParams.get('body'));
        assert.equal(decodeURIComponent(url.pathname), 'aturner@handsonhope.ngo');
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} overflow at ${width}`);
      if (path === '/contact') {
        for (const href of ['/get-help', '/get-involved', '/alumni', 'https://garnetgate.sa.sc.edu/organization/hope']) assert(await page.locator(`main a[href="${href}"]`).count());
        const link = page.getByRole('link', { name: 'Compose Email', exact: true }).first();
        await link.focus(); assert(await link.evaluate(a => a === document.activeElement));
        // Inspect the draft target without opening an external mail application.
        await link.evaluate(a => a.addEventListener('click', e => e.preventDefault()));
        await page.keyboard.press('Enter');
        await page.getByRole('button', { name: 'Copy email address', exact: true }).first().click();
        assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'aturner@handsonhope.ngo');
        const select = page.getByRole('combobox', { name: 'Inquiry type', exact: true });
        for (const purpose of ['general', 'partnerships', 'students-outside-usc', 'support', 'media', 'other']) {
          await select.click();
          await page.getByRole('option', { name: contactLabels[purpose], exact: true }).click();
          assert.equal(await link.getAttribute('href'), contactMailto(fallbackContactEmails[purpose]));
        }
        await select.focus(); assert(await select.evaluate(a => a === document.activeElement));
        await select.click();
        await page.getByRole('option', { name: 'General Question', exact: true }).click();
        await page.screenshot({ path: `${output}/contact-${width}.png`, fullPage: true });
      }
    }
    console.log(`PASS contact, Get Help, Alumni and Support at ${width}px`);
  }
  await page.goto(base + '/get-involved');
  assert(await page.locator('a[href="/contact#students-outside-usc"]').count());
  await page.goto(base + '/partners-and-collaborations');
  assert(await page.locator('a[href="/contact#partnerships"]').count());
  await page.goto(base + '/contact');
  await page.setViewportSize({ width: 1440, height: 1000 });
  assert(await page.getByRole('navigation', { name: 'Main', exact: true }).getByRole('link', { name: 'Contact', exact: true }).isVisible());
  await page.setViewportSize({ width: 375, height: 1000 });
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await page.getByRole('navigation', { name: 'Mobile', exact: true }).getByRole('link', { name: 'Contact', exact: true }).click();
  assert.equal(await page.locator('#mobile-nav').count(), 0);
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const fallback = await noJs.newPage();
  await fallback.goto(base + '/contact');
  assert((await fallback.getByRole('link', { name: 'Compose Email', exact: true }).first().getAttribute('href')).startsWith('mailto:'));
  assert.equal(await fallback.locator('main a[href^="mailto:"]').count(), 1);
  assert.equal(await fallback.locator('pre').count(), 0);
  await noJs.close();
  assert.deepEqual(posts, []); assert.deepEqual(errors, []);
  console.log('PASS keyboard, clipboard, manual fallback, navigation, no-JS and no intake POSTs');
} finally { await browser.close(); }

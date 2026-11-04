// Run with HOPE_PLAYWRIGHT_PATH pointing to a temporary Playwright installation.
// Uses the locally installed Edge browser; does not add project dependencies.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(process.env.HOPE_PLAYWRIGHT_PATH
  ? pathToFileURL(`${process.env.HOPE_PLAYWRIGHT_PATH}/index.mjs`).href : 'playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  const base = process.env.HOPE_REVIEW_URL || 'http://localhost:3100';
  const output = process.env.HOPE_REVIEW_OUTPUT || '.next/alumni-review';
  fs.mkdirSync(output, { recursive: true });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    for (const width of [1440, 768, 375]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal((await page.goto(`${base}/alumni`)).status(), 200);
      await page.locator('h1').waitFor();
      await page.getByRole('form').getByRole('button').waitFor();
      await page.waitForFunction(() => !document.querySelector('form button[type="submit"]').disabled);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `${output}/alumni-${width}.png`, fullPage: true });
      const metrics = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      console.log('Viewport', width, metrics);
      assert.ok(metrics.scroll <= width, `Horizontal overflow at ${width}px`);
      for (const heading of ['Former Presidents', 'People Who Helped Build HOPE', 'Reconnect with HOPE']) assert.equal(await page.getByRole('heading', { name: heading, exact: true }).count(), 1);
      assert.equal(await page.getByText('★ Indicates a former executive or senior organizational leader.', { exact: true }).count(), 1);
      assert.equal(await page.locator('footer a[href="/alumni"]').count(), 1);
      assert.equal(await page.locator('input[name="website"]').isVisible(), false);
      const andrew = page.locator('#contributors li').filter({ has: page.getByRole('heading', { name: 'Andrew Super', exact: true }) });
      assert.equal(await andrew.count(), 1);
      assert.equal(await andrew.getByText('Vice Chair, HOPE Inc. Board', { exact: true }).count(), 1);
      const headshot = andrew.getByRole('img', { name: 'Andrew Super', exact: true });
      await headshot.scrollIntoViewIfNeeded();
      await headshot.evaluate(image => image.decode());
      assert.ok(await headshot.evaluate(image => image.complete && image.naturalWidth > 0));
      assert.ok(!(await andrew.innerText()).includes('★'));
      await andrew.screenshot({ path: `${output}/andrew-super-${width}.png` });
      if (width < 1280) {
        await page.getByRole('button', { name: 'Open menu' }).click();
        assert.equal(await page.getByRole('navigation', { name: 'Mobile', exact: true }).isVisible(), true);
        await page.getByRole('button', { name: 'Close menu' }).click();
      }
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${base}/about`);
    await page.screenshot({ path: `${output}/about-1440.png`, fullPage: true });
    console.log('Our Work response', (await page.goto(`${base}/our-work`)).status());
    await page.goto(`${base}/alumni`);
    const form = page.getByRole('form', { name: 'Alumni reconnect form' });
    const submit = form.getByRole('button');
    await submit.click();
    assert.equal(await page.locator(':focus').getAttribute('name'), 'name');
    assert.equal(await form.locator('[aria-invalid="true"]').count(), 2);
    await form.locator('[name="name"]').fill('Browser test fixture');
    await form.locator('[name="email"]').fill('invalid@');
    await form.locator('[name="phone"]').fill('abc');
    await submit.click();
    assert.equal(await page.locator(':focus').getAttribute('name'), 'email');
    assert.equal(await form.locator('[aria-invalid="true"]').count(), 2);
    await form.locator('[name="email"]').fill('fixture@example.org');
    await form.locator('[name="phone"]').fill('+1 (803) 555-0100');
    for (const name of ['graduationYearOrYearsInvolved', 'rolesOrProjects', 'currentFieldOrg', 'historicalCorrections']) await form.locator(`[name="${name}"]`).fill('Browser test fixture');
    await form.locator('[name="name"]').focus();
    for (const name of ['email', 'phone', 'graduationYearOrYearsInvolved', 'rolesOrProjects', 'currentFieldOrg', 'historicalCorrections', 'interestedInMentoring', 'consentToPublicListing']) {
      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').getAttribute('name'), name);
    }
    for (const name of ['interestedInMentoring', 'consentToPublicListing']) {
      const checkbox = form.locator(`[name="${name}"]`);
      assert.equal(await checkbox.isChecked(), false);
      await checkbox.focus();
      await page.keyboard.press('Space');
      assert.equal(await checkbox.isChecked(), true);
      await page.keyboard.press('Space');
      assert.equal(await checkbox.isChecked(), false);
    }
    const requests = [];
    page.on('request', request => { if (request.method() === 'POST') requests.push(request.url()); });
    await submit.click();
    assert.match(await form.getByRole('status').innerText(), /Nothing has been sent or saved/);
    assert.equal(await form.locator('[name="name"]').inputValue(), 'Browser test fixture');
    assert.deepEqual(requests, []);
    await form.locator('[name="website"]').evaluate(input => { input.value = 'spam'; });
    await submit.click();
    assert.match(await form.getByRole('status').innerText(), /Nothing has been sent/);
    assert.deepEqual(requests, []);
    assert.deepEqual(errors, []);
    const noJsContext = await browser.newContext({ javaScriptEnabled: false });
    const noJs = await noJsContext.newPage();
    await noJs.goto(`${base}/alumni`);
    const noJsForm = noJs.getByRole('form', { name: 'Alumni reconnect form' });
    assert.equal(await noJsForm.getByRole('button').isDisabled(), true);
    await noJsForm.locator('[name="name"]').fill('No JavaScript fixture');
    await noJsForm.locator('[name="name"]').press('Enter');
    assert.equal(new URL(noJs.url()).search, '');
    await noJsContext.close();
    console.log('Browser form, keyboard, checkbox, honeypot, no-send and runtime checks passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

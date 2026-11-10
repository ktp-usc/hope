// Run with HOPE_PLAYWRIGHT_PATH pointing to a temporary Playwright installation.
// Uses the locally installed Edge browser; does not add project dependencies.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(import.meta.url)(process.env.HOPE_PLAYWRIGHT_PATH ? path.join(process.env.HOPE_PLAYWRIGHT_PATH, 'index.js') : 'playwright');

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
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `${output}/alumni-${width}.png`, fullPage: true });
      const metrics = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      console.log('Viewport', width, metrics);
      assert.ok(metrics.scroll <= width, `Horizontal overflow at ${width}px`);
      for (const heading of ['Former Presidents', 'People Who Helped Build HOPE', 'Reconnect with HOPE']) assert.equal(await page.getByRole('heading', { name: heading, exact: true }).count(), 1);
      assert.equal(await page.getByText('★ Indicates a former executive or senior organizational leader.', { exact: true }).count(), 1);
      assert.equal(await page.locator('footer a[href="/alumni"]').count(), 1);
      assert.equal(await page.locator('form, input, textarea, select').count(), 0);
      assert(await page.getByRole('link', { name: 'Open alumni reconnection email' }).getAttribute('href').then(href => href.startsWith('mailto:')));
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
    const noJsContext = await browser.newContext({ javaScriptEnabled: false });
    const noJs = await noJsContext.newPage();
    await noJs.goto(`${base}/alumni`);
    assert.equal(await noJs.locator('form, input, textarea, select').count(), 0);
    assert((await noJs.getByRole('link', { name: 'Open alumni reconnection email' }).getAttribute('href')).startsWith('mailto:'));
    await noJsContext.close();
    assert.deepEqual(errors, []);
    console.log('Browser directory, form-free email, no-JavaScript and runtime checks passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

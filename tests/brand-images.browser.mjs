import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(process.env.HOPE_PLAYWRIGHT_PATH ? pathToFileURL(`${process.env.HOPE_PLAYWRIGHT_PATH}/index.mjs`).href : 'playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const base = process.env.HOPE_REVIEW_URL || 'http://localhost:3100';
const output = '.next/brand-review';
fs.mkdirSync(output, { recursive: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
try {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/', '/about', '/alumni', '/history', '/our-work', '/partners-and-collaborations', '/stories/elis-bike-arm', '/stories/ppe-response', '/stories/hands-on-beginnings']) {
      assert.equal((await page.goto(base + route)).status(), 200, route);
      await page.locator('h1').waitFor();
      for (const img of await page.locator('img').all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(async el => { await el.decode(); });
        assert.ok(await img.evaluate(el => el.naturalWidth > 0 && el.hasAttribute('alt')), `${route}: image missing`);
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: overflow at ${width}`);
      await page.screenshot({ path: `${output}/${route.replaceAll('/', '_') || 'home'}-${width}.png`, fullPage: true });
      console.log('PASS', width, route);
    }
  }
  for (const file of ['01_Eli_Bike_Arm_Detail.jpg', '09_HOPE_Face_Shield_Frames.png']) {
    const response = await page.request.get(`${base}/_next/image?url=${encodeURIComponent('/images/projects/' + file)}&w=640&q=75`);
    assert.equal(response.status(), 200, file);
    assert.match(response.headers()['content-type'], /^image\//);
    console.log('OPTIMIZER PASS', file);
  }
  assert.deepEqual(errors, []);
} finally { await browser.close(); }

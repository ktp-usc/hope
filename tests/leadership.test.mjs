import assert from 'node:assert/strict';
import test from 'node:test';
import { fallbackLeaders, normalizeLeaders, resolveLeadership } from '../lib/leadership.ts';

test('approved fallback preserves five people, order and organization boundaries', () => {
  assert.deepEqual(fallbackLeaders.map(({ name }) => name), ['Abby Herschman', 'Andrew Super', 'Ashley Turner', 'Matthew Yvon', 'Trinity Oglesby']);
  assert.equal(fallbackLeaders.filter(({ affiliation }) => affiliation === 'hope-student-org').length, 1);
  assert.equal(fallbackLeaders.find(({ name }) => name === 'Matthew Yvon').affiliation, 'hope-inc-executive');
  assert(fallbackLeaders.every(({ headshotUrl }) => !headshotUrl));
});

test('empty results, malformed responses and failed requests use the original fallback', async () => {
  for (const result of [[], null, [{ name: 'Incomplete', title: 'Incomplete' }]]) {
    assert.equal(await resolveLeadership(async () => result), fallbackLeaders);
  }
  assert.equal(await resolveLeadership(async () => { throw new Error('CMS outage'); }), fallbackLeaders);
});

test('CMS values replace fallback, preserve affiliation, and sort by display order', async () => {
  const records = [
    { ...fallbackLeaders[4], order: 0, bio: 'Reviewed updated student bio' },
    { ...fallbackLeaders[0], order: 10, bio: 'Reviewed updated board bio' },
    { ...fallbackLeaders[1], order: 5 },
  ];
  const result = await resolveLeadership(async () => records);
  assert.deepEqual(result.map(({ name }) => name), ['Trinity Oglesby', 'Andrew Super', 'Abby Herschman']);
  assert.equal(result[0].affiliation, 'hope-student-org');
  assert.equal(result[0].bio, 'Reviewed updated student bio');
  assert.equal(records[0].order, 0);
});

test('invalid entries are excluded, invalid images omitted, and no bios are invented', () => {
  const valid = { ...fallbackLeaders[0] };
  const result = normalizeLeaders([
    { ...valid, bio: null, headshotUrl: 'javascript:alert(1)' },
    { ...valid, _id: 'invalid', affiliation: 'unknown' },
    { ...valid, _id: 'blank', name: ' ' },
    { ...valid, _id: 'photo', order: 2, headshotUrl: 'https://cdn.sanity.io/images/project/production/approved.jpg' },
  ]);
  assert.equal(result.length, 2);
  assert.equal(result[0].bio, '');
  assert.equal(result[0].headshotUrl, undefined);
  assert(result[1].headshotUrl.startsWith('https://cdn.sanity.io/images/'));
});


import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as leadership from '../lib/leadership.ts';

function loadModule(path, imports = {}) {
  const file = new URL(path, import.meta.url);
  const filename = file.pathname.replace(/^\/(\w:)/, '$1');
  const { outputText } = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  const require = createRequire(import.meta.url);
  const compiled = new Module(filename);
  compiled.require = name => Object.hasOwn(imports, name) ? imports[name] : require(name);
  compiled._compile(outputText, filename);
  return compiled.exports;
}
const require = createRequire(import.meta.url);
const { evaluate, parse } = createRequire(require.resolve('sanity/package.json'))('groq-js');
const { leadersQuery } = loadModule('../sanity/lib/queries.ts', { './client': {} });

async function renderPage(getLeadership) {
  const page = loadModule('../app/about/page.tsx', {
    '@/sanity/lib/leadership': { getLeadership },
    './about-images/13_Creativibe_Display_Team.jpg': { src: '/fixture-hero.jpg', width: 1000, height: 800 },
    './about-images/11_First_HOPE_Printer_Build.jpg': { src: '/fixture-present.jpg', width: 1000, height: 800 },
    '@/components/about/StudentOrgModule': () => createElement('section', { id: 'student-org-fixture' }, 'Existing organization module'),
    '@/components/about/TransparencyModule': () => createElement('section', { id: 'transparency-fixture' }, 'Existing transparency module'),
  });
  assert.equal(page.revalidate, 60);
  const { ImageConfigContext } = require('next/dist/shared/lib/image-config-context.shared-runtime');
  const { imageConfigDefault } = require('next/dist/shared/lib/image-config');
  return renderToStaticMarkup(createElement(ImageConfigContext.Provider, {
    value: { ...imageConfigDefault, remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }] },
  }, await page.default()));
}

function loadServer(fetch, urlFor = () => { throw new Error('Mock incomplete image'); }) {
  return loadModule('../sanity/lib/leadership.ts', {
    'server-only': {}, '@/lib/leadership': leadership, './queries': { leadersQuery },
    './client': { client: { fetch } }, './image': { urlFor },
  });
}

test('published records travel through actual query, loader and About with photos, ordering and affiliation grouping', async () => {
  const assetUrl = 'https://cdn.sanity.io/images/a1pyoa63/production/fixture-640x640.jpg';
  const dataset = [
    { ...fallbackLeaders[0], _type: 'leader', order: 10 },
    { ...fallbackLeaders[1], _type: 'leader', order: 0,
      headshot: { asset: { _ref: 'asset-fixture' }, hotspot: { x: 0.4, y: 0.5 } } },
    { ...fallbackLeaders[4], _type: 'leader', order: 1 },
    { ...fallbackLeaders[2], _type: 'leader', _id: 'drafts.hidden' },
    { ...fallbackLeaders[3], _type: 'leader', _id: 'versions.release.hidden' },
    { _id: 'asset-fixture', _type: 'sanity.imageAsset', url: assetUrl },
  ];
  const urlFor = source => {
    assert.equal(source.hotspot.x, 0.4);
    const builder = { width: n => { assert.equal(n, 640); return builder; },
      height: n => { assert.equal(n, 640); return builder; },
      fit: v => { assert.equal(v, 'crop'); return builder; }, auto: v => { assert.equal(v, 'format'); return builder; },
      url: () => assetUrl };
    return builder;
  };
  const { getLeadership } = loadServer(async (query, params, options) => {
    assert.equal(query, leadersQuery); assert.deepEqual(params, {});
    assert.equal(options.perspective, 'published'); assert.equal(options.next.revalidate, 60);
    assert.deepEqual(options.next.tags, ['leaders']); assert(options.signal instanceof AbortSignal);
    return (await evaluate(parse(query), { dataset })).get();
  }, urlFor);
  const data = await getLeadership();
  assert.deepEqual(data.map(x => x.name), ['Andrew Super', 'Trinity Oglesby', 'Abby Herschman']);
  const html = await renderPage(getLeadership);
  const section = html.slice(html.indexOf('id="leadership"'), html.indexOf('id="transparency-fixture"'));
  const nonprofit = section.slice(0, section.indexOf('id="student-leadership-title"'));
  assert(nonprofit.indexOf('Andrew Super') < nonprofit.indexOf('Abby Herschman'));
  assert(!nonprofit.includes('Trinity Oglesby')); assert(section.includes('Trinity Oglesby'));
  assert(section.includes('Portrait of Andrew Super')); assert(section.includes(encodeURIComponent(assetUrl)));
  assert(section.includes('Photo Pending')); assert(!section.includes('Ashley Turner')); assert(!section.includes('Matthew Yvon'));
  if (process.env.KAN11_REVIEW_HTML) writeFileSync(process.env.KAN11_REVIEW_HTML, html);
});

test('empty, malformed, failed CMS reads and incomplete images preserve approved fallbacks', async () => {
  for (const result of [[], null, [{ name: 'invalid' }]]) {
    const { getLeadership } = loadServer(async () => result);
    assert.equal(await getLeadership(), fallbackLeaders);
    const html = await renderPage(getLeadership);
    for (const person of fallbackLeaders) assert(html.includes(person.name));
  }
  const failed = loadServer(async () => { throw new Error('Mock outage'); });
  assert.equal(await failed.getLeadership(), fallbackLeaders);
  const incomplete = loadServer(async () => [{ ...fallbackLeaders[0], headshot: { assetUrl: 'invalid' } }]);
  assert.equal((await incomplete.getLeadership())[0].headshotUrl, undefined);
});

test('Studio preserves main schemas and registers leader with headshot and display order', () => {
  const registry = loadModule('../sanity/schemaTypes/index.ts', {
    './siteSettings': { siteSettings: { name: 'siteSettings' } }, './partner': { partner: { name: 'partner' } },
    '../schemas/leader': { leader: { name: 'leader' } },
    '../schemas/alumniMember': { alumniMember: { name: 'alumniMember' } },
  });
  assert.deepEqual(registry.schema.types.map(x => x.name), ['siteSettings', 'partner', 'leader', 'alumniMember']);
  const { leader } = loadModule('../sanity/schemas/leader.ts', { sanity: { defineType: x => x, defineField: x => x } });
  assert.deepEqual(leader.fields.map(x => x.name), ['name','title','affiliation','bio','headshot','order']);
  assert.equal(leader.fields.find(x => x.name === 'headshot').options.hotspot, true);
  assert.equal(leader.preview.select.media, 'headshot');
});

test('main About markup and Tailwind outside leadership remain exactly unchanged', () => {
  const main = execFileSync('git', ['show', 'origin/main:app/about/page.tsx'], { encoding: 'utf8' }).replace(/\r\n/g,'\n');
  const current = readFileSync(new URL('../app/about/page.tsx', import.meta.url),'utf8').replace(/\r\n/g,'\n');
  const before = s => s.slice(s.indexOf('<main '), s.indexOf('<section id="leadership"'));
  const after = s => s.slice(s.indexOf('{/* Transparency Module */}'));
  assert.equal(before(current), before(main)); assert.equal(after(current), after(main));
  const classes = s => [...s.slice(s.indexOf('<section id="leadership"')).matchAll(/className="([^"]+)"/g)].map(x=>x[1]);
  const updatedClasses = new Set(classes(current));
  for (const cls of classes(main)) assert(updatedClasses.has(cls) || updatedClasses.has('relative overflow-hidden '+cls));
});

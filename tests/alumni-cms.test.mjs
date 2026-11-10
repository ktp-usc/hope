import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, writeFileSync } from 'node:fs';
import Module, { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
// GROQ evaluator is supplied by the project's declared Sanity dependency.
const { evaluate, parse } = createRequire(createRequire(import.meta.url).resolve('sanity/package.json'))('groq-js');
const { alumniMembersQuery } = loadModule('../sanity/lib/queries.ts', { './client': {} });
import * as alumniHelpers from '../lib/alumni.ts';
import {
  alumniContributors, formerPresidents, fallbackAlumniDirectory,
  normalizeAlumniMembers, alumniDirectoryFromMembers, resolveAlumniDirectory,
  parsePresidentTerm, isLinkedInUrl,
} from '../lib/alumni.ts';

const fixture = (overrides = {}) => ({
  _id: 'fixture', name: 'Fixture Contributor', isFormerPresident: false,
  isExecutiveLeader: false, ...overrides,
});

// Compile the real server modules with a mock at the Sanity transport boundary.
// No real client or token is loaded, and no request reaches Sanity.
function loadModule(relativePath, imports) {
  const file = new URL(relativePath, import.meta.url);
  const filename = file.pathname.replace(/^\/(\w:)/, '$1');
  const { outputText } = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  const require = createRequire(import.meta.url);
  const compiled = new Module(filename);
  compiled.require = (name) => {
    if (Object.hasOwn(imports, name)) {
      if (imports[name] instanceof Error) throw imports[name];
      return imports[name];
    }
    return require(name);
  };
  compiled._compile(outputText, filename);
  return compiled.exports;
}

function loadAlumniServer(clientModule, imageModule = { urlFor: () => { throw new Error('No test image builder provided'); } }) {
  return loadModule('../sanity/lib/alumni.ts', {
    'server-only': {}, '@/lib/alumni': alumniHelpers,
    './queries': { alumniMembersQuery }, './client': clientModule, './image': imageModule,
  });
}

async function renderAlumniPage(getAlumniDirectory) {
  const rosters = loadModule('../app/alumni/_components/alumni-rosters.tsx', { '@/lib/alumni': alumniHelpers });
  const page = loadModule('../app/alumni/page.tsx', {
    '@/sanity/lib/alumni': { getAlumniDirectory }, './_components/alumni-rosters': rosters,
    // Unrelated form and button internals are outside this integration test.
    '@/components/forms/AlumniReconnectForm': () => createElement('form', { 'aria-label': 'Alumni reconnect form' }),
    '@/components/ui/button': { Button: ({ children }) => createElement('div', null, children) },
    '@/public/images/campus-community.jpg': { src: '/images/campus-community.jpg', width: 1200, height: 800 },
  });
  assert.equal(page.revalidate, 60);
  // Standalone server rendering must supply the same image config as Next's app renderer.
  const require = createRequire(import.meta.url);
  const { ImageConfigContext } = require('next/dist/shared/lib/image-config-context.shared-runtime');
  const { imageConfigDefault } = require('next/dist/shared/lib/image-config');
  return renderToStaticMarkup(createElement(ImageConfigContext.Provider, {
    value: { ...imageConfigDefault, remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }] },
  }, await page.default()));
}

test('published executive travels through actual GROQ, server fetch and /alumni page in alphabetical position with a star', async () => {
  const dataset = [
    { ...fixture({ _id: 'published-z', name: 'Zulu Fixture' }), _type: 'alumniMember' },
    { ...fixture({ _id: 'published-m', name: 'Middle Fixture', isExecutiveLeader: true,
      isFormerPresident: true, presidentTerm: '2017–2018', yearsActive: '2016–2019',
      roleOrContribution: 'Test-only contribution', linkedInUrl: 'https://www.linkedin.com/in/test-fixture' }), _type: 'alumniMember' },
    { ...fixture({ _id: 'published-a', name: 'Alpha Fixture', isFormerPresident: true, presidentTerm: '2020–2021' }), _type: 'alumniMember' },
    { ...fixture({ _id: 'drafts.unpublished', name: 'Draft Fixture', isExecutiveLeader: true }), _type: 'alumniMember' },
    { ...fixture({ _id: 'versions.release.unpublished', name: 'Release Fixture' }), _type: 'alumniMember' },
    { _id: 'other-type', _type: 'leader', name: 'Other Document Fixture' },
  ];
  let calls = 0;
  const { getAlumniDirectory } = loadAlumniServer({ client: { fetch: async (query, params, options) => {
    calls++;
    assert.equal(query, alumniMembersQuery);
    assert.deepEqual(params, {});
    assert.equal(options.perspective, 'published');
    assert.deepEqual(options.next, { revalidate: 60, tags: ['alumni-members'] });
    assert(options.signal instanceof AbortSignal);
    return (await evaluate(parse(query), { dataset })).get();
  } } });
  const html = await renderAlumniPage(getAlumniDirectory);
  assert.equal(calls, 1);
  const directory = html.split('<section id="contributors"')[1].split('</section>')[0];
  const cards = [...directory.matchAll(/<li\b[^>]*>(.*?)<\/li>/g)].map((match) => match[1]);
  assert.deepEqual(cards.map((card) => card.match(/<h3[^>]*>([^<]+)/)[1]), ['Alpha Fixture', 'Middle Fixture', 'Zulu Fixture']);
  const star = /aria-hidden="true"[^>]*>★<\/span>/;
  assert(!star.test(cards[0]));
  assert(star.test(cards[1]));
  assert(cards[1].includes('Former executive or senior organizational leader'));
  assert(!star.test(cards[2]));
  assert.match(cards[1], /href="https:\/\/www.linkedin.com\/in\/test-fixture" target="_blank" rel="noopener noreferrer"/);
  assert(cards[1].includes('2016–2019'));
  assert(cards[1].includes('Test-only contribution'));
  for (const excluded of ['Draft Fixture', 'Release Fixture', 'Other Document Fixture', 'Andrew Super']) assert(!directory.includes(excluded));
  const timeline = html.split('<section id="former-presidents"')[1].split('</section>')[0];
  assert(timeline.indexOf('Middle Fixture') < timeline.indexOf('Alpha Fixture'));
});

test('actual server fetch and /alumni page preserve fallback for empty CMS, outage and missing configuration', async () => {
  for (const clientModule of [
    { client: { fetch: async () => [] } },
    { client: { fetch: async () => { throw new Error('Mock CMS outage'); } } },
    new Error('Mock missing configuration'),
  ]) {
    const { getAlumniDirectory } = loadAlumniServer(clientModule);
    assert.equal(await getAlumniDirectory(), fallbackAlumniDirectory);
    const html = await renderAlumniPage(getAlumniDirectory);
    assert(html.includes('Andrew Super'));
    const imagePath = '/images/alumni/andrew-super.jpg';
    assert(html.includes(imagePath) || html.includes(encodeURIComponent(imagePath)));
    assert(html.includes('No former-president records with verified service years are ready to publish yet.'));
    const card = html.split('<section id="contributors"')[1].match(/<li\b[^>]*>(.*?)<\/li>/)[1];
    assert(!card.includes('aria-hidden="true"'));
  }
});

test('Studio registry retains main schemas and includes alumniMember', () => {
  const studio = loadModule('../sanity/schemaTypes/index.ts', {
    './siteSettings': { siteSettings: { name: 'siteSettings' } },
    './partner': { partner: { name: 'partner' } },
    './projectStory': { projectStory: { name: 'projectStory' } },
    '../schemas/leader': { leader: { name: 'leader' } },
    '../schemas/alumniMember': { alumniMember: { name: 'alumniMember' } },
  });
  assert.deepEqual(studio.schema.types.map(({ name }) => name), ['siteSettings', 'partner', 'projectStory', 'leader', 'alumniMember']);
});

test('empty, invalid and unavailable CMS results preserve original approved fallback', async () => {
  for (const records of [[], null, [{ _id: 'invalid', name: ' ' }]]) {
    assert.equal(await resolveAlumniDirectory(async () => records), fallbackAlumniDirectory);
  }
  assert.equal(await resolveAlumniDirectory(async () => { throw new Error('Outage'); }), fallbackAlumniDirectory);
  assert.equal(fallbackAlumniDirectory.presidents, formerPresidents);
  assert.equal(fallbackAlumniDirectory.contributors, alumniContributors);
  assert.equal(alumniContributors[0].name, 'Andrew Super');
  assert.equal(alumniContributors[0].formerSeniorLeader, false);
});

test('CMS presidents sort chronologically by explicit term, independent of yearsActive', () => {
  const records = normalizeAlumniMembers([
    fixture({ _id: 'later', name: 'Fixture Later', isFormerPresident: true, presidentTerm: '2020–2022', yearsActive: '2010–2022' }),
    fixture({ _id: 'earlier', name: 'Fixture Earlier', isFormerPresident: true, presidentTerm: '2017–2018' }),
    fixture({ _id: 'same-start', name: 'Fixture Same', isFormerPresident: true, presidentTerm: '2017' }),
    fixture({ _id: 'not-president', isFormerPresident: false, presidentTerm: '2000–2001' }),
    fixture({ _id: 'unverified-term', isFormerPresident: true, yearsActive: '2001' }),
  ]);
  const directory = alumniDirectoryFromMembers(records);
  assert.deepEqual(directory.presidents.map(({ id }) => id), ['same-start', 'earlier', 'later']);
  assert.equal(directory.presidents[2].displayTerm, '2020–2022');
  assert.equal(directory.contributors.length, 5);
  assert.equal(records[0]._id, 'later');
});

test('contributors sort alphabetically by approved full display name and preserve badge flag', async () => {
  const directory = await resolveAlumniDirectory(async () => [
    fixture({ _id: 'z', name: 'Zulu Fixture', isExecutiveLeader: true, roleOrContribution: 'Approved fixture contribution', yearsActive: '2017–2018' }),
    fixture({ _id: 'a', name: 'Alpha Fixture' }),
  ]);
  assert.deepEqual(directory.contributors.map(({ id }) => id), ['a', 'z']);
  assert.equal(directory.contributors[0].formerSeniorLeader, false);
  assert.equal(directory.contributors[1].formerSeniorLeader, true);
  assert.equal(directory.contributors[1].contribution, 'Approved fixture contribution');
  assert.equal(directory.contributors[1].yearsActive, '2017–2018');
  assert.equal(directory.contributors.length, 2); // No silent merge of static people.
});

test('known local photo is preserved without inventing photos or missing fields', () => {
  const directory = alumniDirectoryFromMembers(normalizeAlumniMembers([
    fixture({ _id: 'cms-andrew', name: 'Andrew Super', roleOrContribution: 'Vice Chair, HOPE Inc. Board' }),
    fixture({ _id: 'other', name: 'Fixture Without Photo' }),
  ]));
  assert.equal(directory.contributors[0].headshot, alumniContributors[0].headshot);
  assert.equal(directory.contributors[1].headshot, undefined);
  assert.equal(directory.contributors[0].yearsActive, undefined);
});

test('president terms validate ranges; LinkedIn URLs reject unsafe and unrelated destinations', () => {
  assert.deepEqual(parsePresidentTerm('2017—2018'), { start: 2017, end: 2018 });
  assert.deepEqual(parsePresidentTerm('2020–Present'), { start: 2020, end: Infinity });
  for (const term of ['', 'unknown', '2022–2020', '2018 followed by 2019']) assert.equal(parsePresidentTerm(term), null);
  assert(isLinkedInUrl('https://www.linkedin.com/in/fixture'));
  for (const url of ['javascript:alert(1)', 'https://linkedin.com.evil.example/in/test', 'http://linkedin.com/in/test', 'https://example.org', 'https://name:password@linkedin.com/in/test']) assert.equal(isLinkedInUrl(url), false);
  const [record] = normalizeAlumniMembers([fixture({ linkedInUrl: 'javascript:alert(1)', isExecutiveLeader: 'true' })]);
  assert.equal(record.linkedInUrl, undefined);
  assert.equal(record.isExecutiveLeader, false);
});

test('actual schema hides presidentTerm unless selected and conditionally validates it', async () => {
  const require = createRequire(import.meta.url);
  const source = readFileSync(new URL('../sanity/schemas/alumniMember.ts', import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  const output = outputText.replace("from 'sanity'", `from ${JSON.stringify(pathToFileURL(require.resolve('sanity')).href)}`)
    .replace("from '../../lib/alumni'", `from ${JSON.stringify(new URL('../lib/alumni.ts', import.meta.url).href)}`);
  const { alumniMember } = await import(`data:text/javascript;base64,${Buffer.from(output).toString('base64')}`);
  assert.deepEqual(alumniMember.fields.map(({ name }) => name), ['name', 'headshot', 'yearsActive', 'isFormerPresident', 'presidentTerm', 'isExecutiveLeader', 'roleOrContribution', 'linkedInUrl']);
  const photo = alumniMember.fields.find(({ name }) => name === 'headshot');
  assert.equal(photo.type, 'image'); assert.equal(photo.options.hotspot, true);
  assert.equal(photo.fields[0].name, 'alt'); assert.equal(alumniMember.preview.select.media, 'headshot');
  const field = alumniMember.fields.find(({ name }) => name === 'presidentTerm');
  assert.equal(field.hidden({ document: { isFormerPresident: false } }), true);
  assert.equal(field.hidden({ document: { isFormerPresident: true } }), false);
  let validate;
  field.validation({ custom: (callback) => { validate = callback; } });
  assert.equal(validate(undefined, { document: { isFormerPresident: false } }), true);
  assert.equal(validate('2017–2018', { document: { isFormerPresident: true } }), true);
  assert.equal(typeof validate(undefined, { document: { isFormerPresident: true } }), 'string');
});

test('existing roster components render sorted CMS entries, optional LinkedIn links and only flagged badges', () => {
  const filename = new URL('../app/alumni/_components/alumni-rosters.tsx', import.meta.url).pathname.replace(/^\/(\w:)/, '$1');
  const source = readFileSync(new URL('../app/alumni/_components/alumni-rosters.tsx', import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } });
  const require = createRequire(import.meta.url);
  const compiled = new Module(filename);
  compiled.require = (name) => name === '@/lib/alumni' ? alumniHelpers : require(name);
  compiled._compile(outputText, filename);
  const directory = alumniDirectoryFromMembers(normalizeAlumniMembers([
    fixture({ _id: 'z', name: 'Zulu Fixture', isExecutiveLeader: true, isFormerPresident: true, presidentTerm: '2020–2021', linkedInUrl: 'https://www.linkedin.com/in/fixture' }),
    fixture({ _id: 'a', name: 'Alpha Fixture', isFormerPresident: true, presidentTerm: '2016–2017' }),
  ]));
  const html = renderToStaticMarkup(createElement(compiled.exports.ContributorDirectory, { records: directory.contributors }));
  assert(html.indexOf('Alpha Fixture') < html.indexOf('Zulu Fixture'));
  assert.equal((html.match(/class="sr-only"/g) ?? []).length, 1);
  assert.match(html, /href="https:\/\/www.linkedin.com\/in\/fixture" target="_blank" rel="noopener noreferrer"/);
  assert.equal((html.match(/>LinkedIn<\/a>/g) ?? []).length, 1);
  const timeline = renderToStaticMarkup(createElement(compiled.exports.FormerPresidents, { records: directory.presidents }));
  assert(timeline.indexOf('2016–2017') < timeline.indexOf('2020–2021'));
});


test('selected CMS headshots and labels render through the real query, fetcher and page; absent or malformed images fall back', async () => {
  const assetUrl = 'https://cdn.sanity.io/images/a1pyoa63/production/fixture-640x800.jpg';
  const dataset = [
    { ...fixture({ _id: 'z', name: 'Zulu Fixture', yearsActive: '4' }), _type: 'alumniMember' },
    { ...fixture({ _id: 'a', name: 'Alpha Fixture', yearsActive: '3', roleOrContribution: 'Member',
      isExecutiveLeader: true, isFormerPresident: true, presidentTerm: '2017-2018',
      headshot: { asset: { _ref: 'image-asset' }, alt: 'Approved fixture portrait', hotspot: { x: 0.3, y: 0.4 } } }), _type: 'alumniMember' },
    { _id: 'image-asset', _type: 'sanity.imageAsset', url: assetUrl },
  ];
  let built = 0;
  const imageModule = { urlFor: (source) => {
    built++; assert.equal(source.assetUrl, assetUrl); assert.equal(source.hotspot.x, 0.3);
    const builder = { width: n => { assert.equal(n, 640); return builder; },
      height: n => { assert.equal(n, 800); return builder; }, fit: v => { assert.equal(v, 'crop'); return builder; },
      auto: v => { assert.equal(v, 'format'); return builder; }, url: () => assetUrl };
    return builder;
  } };
  const { getAlumniDirectory } = loadAlumniServer({ client: { fetch: async () => (await evaluate(parse(alumniMembersQuery), { dataset })).get() } }, imageModule);
  const records = await getAlumniDirectory();
  assert.equal(built, 1); assert.equal(records.contributors[0].headshot.alt, 'Approved fixture portrait');
  assert.equal(records.presidents[0].headshot.src, assetUrl);
  const html = await renderAlumniPage(getAlumniDirectory);
  assert(html.includes('Years active: ')); assert(html.includes('Role or contribution: '));
  assert(html.includes('Approved fixture portrait')); assert(html.includes(encodeURIComponent(assetUrl)));
  assert(html.includes('No headshot available for Zulu Fixture'));
  const [defaultAlt, unsafe] = normalizeAlumniMembers([
    fixture({ headshotUrl: assetUrl }), fixture({ headshotUrl: 'https://evil.example/portrait.jpg' }),
  ]);
  assert.equal(defaultAlt.headshot.alt, 'Portrait of Fixture Contributor'); assert.equal(unsafe.headshot, undefined);
  const malformed = loadAlumniServer({ client: { fetch: async () => [{ ...dataset[1], headshot: { assetUrl } }] } });
  assert.equal((await malformed.getAlumniDirectory()).contributors[0].headshot, undefined);
  if (process.env.KAN27_REVIEW_HTML) writeFileSync(process.env.KAN27_REVIEW_HTML, html);
});

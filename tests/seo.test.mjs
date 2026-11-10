import assert from 'node:assert/strict';
import test from 'node:test';
import { pageMetadata, truncateDescription } from '../lib/seo.ts';

test('descriptions within the limit are only whitespace-normalised', () => {
  assert.equal(truncateDescription('  Short   description. '), 'Short description.');
  const exact = 'a'.repeat(160);
  assert.equal(truncateDescription(exact), exact);
});

test('long descriptions end on a whole word with an ellipsis and never exceed the limit', () => {
  const long = 'Eli started a custom engineering challenge, adding an arm to a bicycle that he could press against for counterforce while riding, researched in 2017 and fitted in spring 2018.';
  const result = truncateDescription(long);
  assert(result.length <= 160, `length ${result.length}`);
  assert(result.endsWith('…'));
  assert(long.startsWith(result.slice(0, -1)));
  assert(!/[\s,;:.]…$/.test(result), 'no dangling punctuation before the ellipsis');
  assert(long.charAt(result.length - 1) === ' ' || long.charAt(result.length - 1) === ',', 'cut on a word boundary');
});

test('a single very long word is still cut to the limit', () => {
  assert.equal(truncateDescription('x'.repeat(300)).length, 160);
});

test('pageMetadata applies the limit to description, Open Graph and Twitter text', () => {
  const meta = pageMetadata('Page', 'word '.repeat(80), '/page');
  for (const text of [meta.description, meta.openGraph.description, meta.twitter.description]) assert(text.length <= 160);
  assert.equal(meta.alternates.canonical, '/page');
});

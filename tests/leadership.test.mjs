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

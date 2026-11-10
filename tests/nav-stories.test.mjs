import assert from 'node:assert/strict';
import test from 'node:test';
import { fallbackNavStories, MAX_NAV_STORIES, mergeNavStories } from '../lib/nav-stories.ts';

test('empty, malformed or missing CMS results keep the three foundational stories', () => {
  for (const input of [[], null, undefined, 'nope', [null, 5, {}]]) {
    assert.deepEqual(mergeNavStories(input), [...fallbackNavStories]);
  }
  assert.equal(fallbackNavStories.length, 3);
});

test('new CMS stories come first, in the newest-first order given, then the foundational stories', () => {
  const result = mergeNavStories([
    { title: '  Hand Grip Study ', slug: 'hand-grip-study' },
    { title: 'Older Story', slug: 'older-story' },
  ]);
  assert.deepEqual(result[0], { label: 'Hand Grip Study', href: '/stories/hand-grip-study' });
  assert.deepEqual(result[1], { label: 'Older Story', href: '/stories/older-story' });
  assert.deepEqual(result.slice(2), [...fallbackNavStories]);
});

test('the dropdown never lists more than the maximum, dropping the oldest', () => {
  const many = Array.from({ length: 9 }, (_, i) => ({ title: `Story ${i}`, slug: `story-${i}` }));
  const result = mergeNavStories(many);
  assert.equal(result.length, MAX_NAV_STORIES);
  assert.deepEqual(result.map(({ href }) => href), many.slice(0, MAX_NAV_STORIES).map(({ slug }) => `/stories/${slug}`));
});

test('CMS copies of foundational stories and repeated slugs are not duplicated, keeping the short nav name', () => {
  const result = mergeNavStories([
    { title: 'Eli’s Bike Arm — Designing for the Ride', slug: 'elis-bike-arm' },
    { title: 'New', slug: 'new-story' },
    { title: 'New again', slug: 'new-story' },
  ]);
  assert.deepEqual(result.map(({ label }) => label), ['New', ...fallbackNavStories.map(({ label }) => label)]);
});

test('records without a usable title or URL-safe slug are skipped', () => {
  const result = mergeNavStories([
    { title: '', slug: 'blank-title' },
    { title: 'Bad slug', slug: '../admin' },
    { title: 'Uppercase', slug: 'Has-Caps' },
    { title: 'No slug' },
  ]);
  assert.deepEqual(result, [...fallbackNavStories]);
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

function loadTypeScript(relPath, mocks = {}) {
  const fileUrl = new URL(relPath, import.meta.url);
  const source = readFileSync(fileUrl, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  });
  const customRequire = createRequire(fileUrl);
  const wrappedRequire = (id) => {
    if (mocks[id]) {
      return mocks[id];
    }
    return customRequire(id);
  };
  const exports = {};
  const mod = { exports };
  const fn = new Function("require", "exports", "module", outputText);
  fn(wrappedRequire, exports, mod);
  return mod.exports;
}

const { projectStory } = loadTypeScript("../sanity/schemas/projectStory.ts");
const {
  FALLBACK_PROJECT_STORIES,
  FALLBACK_CARD_LIST,
  projectStoriesQuery,
  projectStoryBySlugQuery,
  getProjectStories,
  getProjectStoryBySlug,
} = loadTypeScript("../sanity/lib/queries.ts", {
  "./client": { client: { fetch: async () => [] } },
});

test("projectStory schema defines all required ticket fields", () => {
  assert.equal(projectStory.name, "projectStory");
  assert.equal(projectStory.title, "Project Story");
  assert.equal(projectStory.type, "document");

  const fields = projectStory.fields.map((f) => f.name);
  assert.ok(fields.includes("title"), "Missing title field");
  assert.ok(fields.includes("slug"), "Missing slug field");
  assert.ok(fields.includes("subtitle"), "Missing subtitle field");
  assert.ok(fields.includes("summary"), "Missing summary field");
  assert.ok(fields.includes("projectStatus"), "Missing projectStatus field");
  assert.ok(fields.includes("heroImage"), "Missing heroImage field");
  assert.ok(fields.includes("body"), "Missing body field");
  assert.ok(fields.includes("featuredOnHome"), "Missing featuredOnHome field");
  assert.ok(fields.includes("order"), "Missing order field");

  // Validate title rule
  const titleField = projectStory.fields.find((f) => f.name === "title");
  assert.equal(titleField.type, "string");

  // Validate slug rule
  const slugField = projectStory.fields.find((f) => f.name === "slug");
  assert.equal(slugField.type, "slug");

  // Validate body rule (Portable Text blocks and images)
  const bodyField = projectStory.fields.find((f) => f.name === "body");
  assert.equal(bodyField.type, "array");
  const bodyTypes = bodyField.of.map((member) => member.type);
  assert.ok(bodyTypes.includes("block"), "Body must contain block type");
  assert.ok(bodyTypes.includes("image"), "Body must contain image type");

  // Validate heroImage hotspot
  const heroImageField = projectStory.fields.find((f) => f.name === "heroImage");
  assert.equal(heroImageField.type, "image");
  assert.equal(heroImageField.options?.hotspot, true);
});

test("GROQ queries project necessary fields and conditions", () => {
  assert.ok(projectStoriesQuery.includes('_type == "projectStory"'));
  assert.ok(projectStoriesQuery.includes('"slug": slug.current'));
  assert.ok(projectStoriesQuery.includes("heroImage"));
  assert.ok(projectStoriesQuery.includes("featuredOnHome"));

  assert.ok(projectStoryBySlugQuery.includes('_type == "projectStory"'));
  assert.ok(projectStoryBySlugQuery.includes("slug.current == $slug"));
  assert.ok(projectStoryBySlugQuery.includes("body"));
});

test("FALLBACK_PROJECT_STORIES contains all 3 foundational stories", () => {
  assert.ok(FALLBACK_PROJECT_STORIES["elis-bike-arm"], "Missing elis-bike-arm fallback");
  assert.ok(FALLBACK_PROJECT_STORIES["ppe-response"], "Missing ppe-response fallback");
  assert.ok(FALLBACK_PROJECT_STORIES["hands-on-beginnings"], "Missing hands-on-beginnings fallback");

  assert.equal(FALLBACK_CARD_LIST.length, 3);
  const slugs = FALLBACK_CARD_LIST.map((c) => c.slug);
  assert.ok(slugs.includes("elis-bike-arm"));
  assert.ok(slugs.includes("ppe-response"));
  assert.ok(slugs.includes("hands-on-beginnings"));
});

test("getProjectStories returns fallback stories when Sanity is empty or offline", async () => {
  const stories = await getProjectStories();
  assert.equal(stories.length, 3);
  assert.equal(stories[0].slug, "elis-bike-arm");
  assert.equal(stories[1].slug, "ppe-response");
  assert.equal(stories[2].slug, "hands-on-beginnings");
});

test("getProjectStories merges dynamic Sanity stories while preserving foundational stories", async () => {
  const { getProjectStories: getMockStories } = loadTypeScript("../sanity/lib/queries.ts", {
    "./client": {
      client: {
        fetch: async () => [
          {
            _id: "story-1",
            title: "New Experimental Bionic Hand",
            slug: "new-bionic-hand",
            subtitle: "Research Build",
            summary: "A cutting-edge new design.",
            projectStatus: "Active",
            imageUrl: "https://cdn.sanity.io/new-bionic-hand.jpg",
            order: 1,
          },
        ],
      },
    },
  });

  const stories = await getMockStories();
  assert.equal(stories.length, 4, "Should contain 1 dynamic story + 3 preserved foundational stories");
  assert.equal(stories[0].slug, "new-bionic-hand");
  assert.equal(stories[0].imageUrl, "https://cdn.sanity.io/new-bionic-hand.jpg");

  // Verify the 3 foundational stories are preserved
  const slugs = stories.map((s) => s.slug);
  assert.ok(slugs.includes("elis-bike-arm"));
  assert.ok(slugs.includes("ppe-response"));
  assert.ok(slugs.includes("hands-on-beginnings"));
});

test("getProjectStoryBySlug returns static fallback data for foundational slugs when not in Sanity", async () => {
  const eliStory = await getProjectStoryBySlug("elis-bike-arm");
  assert.ok(eliStory, "eliStory should not be null");
  assert.equal(eliStory.isFallback, true);
  assert.equal(eliStory.slug, "elis-bike-arm");
  assert.ok(eliStory.title.includes("Eli’s Bike Arm"));
  assert.ok(Array.isArray(eliStory.paragraphs));
  assert.ok(eliStory.paragraphs.length > 0);

  const ppeStory = await getProjectStoryBySlug("ppe-response");
  assert.ok(ppeStory, "ppeStory should not be null");
  assert.equal(ppeStory.slug, "ppe-response");

  const handStory = await getProjectStoryBySlug("hands-on-beginnings");
  assert.ok(handStory, "handStory should not be null");
  assert.equal(handStory.slug, "hands-on-beginnings");
});

test("getProjectStoryBySlug returns null for completely non-existent slugs", async () => {
  const nonExistent = await getProjectStoryBySlug("unknown-non-existent-story");
  assert.equal(nonExistent, null);
});

test("getProjectStoryBySlug prioritizes Sanity dynamic content over static fallback", async () => {
  const { getProjectStoryBySlug: getMockStoryBySlug } = loadTypeScript("../sanity/lib/queries.ts", {
    "./client": {
      client: {
        fetch: async () => ({
          _id: "sanity-eli-arm",
          title: "Eli’s Bike Arm — Updated Sanity Case Study",
          slug: "elis-bike-arm",
          subtitle: "Client Updated Category",
          summary: "Updated introduction from Sanity CMS.",
          projectStatus: "Completed",
          heroImage: { alt: "Custom Eli photo" },
          imageUrl: "https://cdn.sanity.io/updated-eli.jpg",
          body: [{ _type: "block", children: [{ _type: "span", text: "Sanity rich text body content." }] }],
        }),
      },
    },
  });

  const story = await getMockStoryBySlug("elis-bike-arm");
  assert.ok(story);
  assert.equal(story.isFallback, false);
  assert.equal(story.title, "Eli’s Bike Arm — Updated Sanity Case Study");
  assert.equal(story.subtitle, "Client Updated Category");
  assert.equal(story.projectStatus, "Completed");
  assert.equal(story.heroImage.src, "https://cdn.sanity.io/updated-eli.jpg");
  assert.ok(Array.isArray(story.body));
  assert.equal(story.body.length, 1);
});

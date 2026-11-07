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

const { siteSettings } = loadTypeScript("../sanity/schemaTypes/siteSettings.ts");
const {
  DEFAULT_SITE_SETTINGS,
  siteSettingsQuery,
  getSiteSettings,
} = loadTypeScript("../sanity/lib/queries.ts", {
  "./client": { client: { fetch: async () => null } },
});

test("siteSettings schema defines donationsToggle and donationMethods array", () => {
  assert.equal(siteSettings.name, "siteSettings");
  assert.equal(siteSettings.type, "document");
  assert.equal(siteSettings.title, "Site Settings");

  const donationsField = siteSettings.fields.find((f) => f.name === "donationsEnabled");
  assert.ok(donationsField, "Missing donationsEnabled field");
  assert.equal(donationsField.title, "Donations Toggle");
  assert.equal(donationsField.description, "Toggles whether donations will show or not.");
  assert.equal(donationsField.initialValue, false);

  const methodsField = siteSettings.fields.find((f) => f.name === "donationMethods");
  assert.ok(methodsField, "Missing donationMethods field");
  assert.equal(methodsField.type, "array");
  assert.equal(methodsField.title, "Donation Methods");

  // Verify announcement banner and legacy fields are removed
  const fieldNames = siteSettings.fields.map((f) => f.name);
  assert.ok(!fieldNames.includes("announcementBannerEnabled"));
  assert.ok(!fieldNames.includes("announcementBannerText"));
  assert.ok(!fieldNames.includes("paypalGivingFundUrl"));
  assert.ok(!fieldNames.includes("venmoHandle"));
});

test("DEFAULT_SITE_SETTINGS defaults to empty donationMethods array", () => {
  assert.equal(DEFAULT_SITE_SETTINGS.donationsEnabled, false);
  assert.deepEqual(DEFAULT_SITE_SETTINGS.donationMethods, []);
});

test("GROQ query projects donations toggle, donationMethods, and orders by _updatedAt desc", () => {
  assert.ok(siteSettingsQuery.includes('_type == "siteSettings"'));
  assert.ok(siteSettingsQuery.includes("donationsEnabled"));
  assert.ok(siteSettingsQuery.includes("donationMethods"));
  assert.ok(siteSettingsQuery.includes("order(_updatedAt desc)"));
  assert.ok(!siteSettingsQuery.includes("announcementBannerEnabled"));
});

test("getSiteSettings falls back to empty donationMethods when dataset is empty or offline", async () => {
  const settings = await getSiteSettings();
  assert.equal(settings.donationsEnabled, false);
  assert.deepEqual(settings.donationMethods, []);
});

test("getSiteSettings preserves active donation methods from Sanity while excluding inactive ones", async () => {
  const { getSiteSettings: getMockSettings } = loadTypeScript("../sanity/lib/queries.ts", {
    "./client": {
      client: {
        fetch: async () => ({
          donationsEnabled: true,
          donationMethods: [
            {
              title: "PayPal Giving Fund",
              url: "https://www.paypal.com/us/fundraiser/charity/2442369",
              enabled: true,
            },
            {
              title: "Disabled Method",
              url: "https://example.com",
              enabled: false,
            },
          ],
        }),
      },
    },
  });

  const settings = await getMockSettings();
  assert.equal(settings.donationsEnabled, true);
  assert.equal(settings.donationMethods.length, 1);
  assert.equal(settings.donationMethods[0].title, "PayPal Giving Fund");
});

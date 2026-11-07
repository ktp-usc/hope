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
  INITIAL_DEFAULT_METHODS,
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

  // Verify announcement banner fields are removed
  const fieldNames = siteSettings.fields.map((f) => f.name);
  assert.ok(!fieldNames.includes("announcementBannerEnabled"));
  assert.ok(!fieldNames.includes("announcementBannerText"));
  assert.ok(!fieldNames.includes("paypalGivingFundUrl"));
  assert.ok(!fieldNames.includes("venmoHandle"));
});

test("initial default donation methods configure PayPal Giving Fund and Venmo Charity", () => {
  assert.equal(INITIAL_DEFAULT_METHODS.length, 2);

  const [paypal, venmo] = INITIAL_DEFAULT_METHODS;
  assert.equal(paypal.title, "PayPal Giving Fund");
  assert.equal(paypal.url, "https://www.paypal.com/us/fundraiser/charity/2442369");
  assert.equal(paypal.buttonLabel, "Donate with PayPal");
  assert.equal(paypal.badgeText, "0% charity fees");
  assert.equal(paypal.colorTheme, "hope-blue");

  assert.equal(venmo.title, "Venmo Charity");
  assert.equal(venmo.url, "https://account.venmo.com/u/HandsOnHOPENGO");
  assert.equal(venmo.buttonLabel, "Donate with Venmo");
  assert.equal(venmo.badgeText, "@HandsOnHOPENGO");
  assert.equal(venmo.colorTheme, "venmo-blue");
});

test("GROQ query projects donations toggle and donationMethods fields", () => {
  assert.ok(siteSettingsQuery.includes('_type == "siteSettings"'));
  assert.ok(siteSettingsQuery.includes("donationsEnabled"));
  assert.ok(siteSettingsQuery.includes("donationMethods"));
  assert.ok(!siteSettingsQuery.includes("announcementBannerEnabled"));
});

test("getSiteSettings falls back safely when dataset is empty or offline", async () => {
  const settings = await getSiteSettings();
  assert.equal(settings.donationsEnabled, false);
  assert.equal(settings.donationMethods.length, 2);
  assert.equal(settings.donationMethods[0].title, "PayPal Giving Fund");
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

async function loadTypeScript(path) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}
const { sortContributors, sortPresidents, formerPresidents, alumniContributors } = await loadTypeScript("../lib/alumni.ts");

test("only the approved contributor is listed without unverified former leadership", () => {
  assert.deepEqual(formerPresidents, []);
  assert.equal(alumniContributors.length, 1);
  const andrew = alumniContributors[0];
  assert.equal(andrew.name, "Andrew Super");
  assert.equal(andrew.currentRole, "Vice Chair, HOPE Inc. Board");
  assert.equal(andrew.formerSeniorLeader, false);
  assert.equal(andrew.contribution, undefined);
  assert.equal(andrew.headshot.src, "/images/alumni/andrew-super.jpg");
  const image = readFileSync(new URL(`../public${andrew.headshot.src}`, import.meta.url));
  assert.equal(image.readUInt16BE(0), 0xffd8);
});
test("presidents sort chronologically without mutating source", () => {
  const fixtures = [{ id: "late", name: "Fixture B", serviceStart: 2020, serviceEnd: 2021 }, { id: "early", name: "Fixture A", serviceStart: 2018, serviceEnd: 2019 }];
  assert.deepEqual(sortPresidents(fixtures).map(({ id }) => id), ["early", "late"]);
  assert.equal(fixtures[0].id, "late");
});
test("contributors sort by family and given names and honor reviewed sort keys", () => {
  const fixtures = [
    { id: "z", familyName: "Zulu", givenName: "A" },
    { id: "b", familyName: "Alpha", givenName: "B" },
    { id: "a", familyName: "alpha", givenName: "A" },
    { id: "override", familyName: "Zulu", givenName: "B", sortKey: "Aaron" },
  ];
  assert.deepEqual(sortContributors(fixtures).map(({ id }) => id), ["override", "a", "b", "z"]);
  assert.equal(fixtures[0].id, "z");
});

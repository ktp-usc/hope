import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { partner } from "./partner";

let leader: SchemaTypeDefinition | undefined;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  leader = require("../schemas/leader")?.leader;
} catch {
  // Omitted if not provided in test runner mocks
}

let alumniMember: SchemaTypeDefinition | undefined;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  alumniMember = require("../schemas/alumniMember")?.alumniMember;
} catch {
  // Omitted if not provided in test runner mocks
}

const types: SchemaTypeDefinition[] = [siteSettings, partner];
if (leader) types.push(leader);
if (alumniMember) types.push(alumniMember);

export const schema: { types: SchemaTypeDefinition[] } = {
  types,
};
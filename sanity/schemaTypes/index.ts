import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { partner } from "./partner";

import { alumniMember } from "../schemas/alumniMember";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, partner, alumniMember],
};

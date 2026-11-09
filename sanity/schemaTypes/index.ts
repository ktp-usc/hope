import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { partner } from "./partner";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, partner],
};

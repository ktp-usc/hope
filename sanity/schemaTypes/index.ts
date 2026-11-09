import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { partner } from "./partner";
import { projectStory } from "./projectStory";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, partner, projectStory],
};

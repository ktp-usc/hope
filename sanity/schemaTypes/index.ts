import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { partner } from "./partner";
import { projectStory } from "./projectStory";
import { leader } from "../schemas/leader";
import { alumniMember } from "../schemas/alumniMember";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, partner, projectStory, leader, alumniMember],
};

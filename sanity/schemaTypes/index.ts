import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { partner } from "./partner";

import { leader } from "../schemas/leader";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, partner, leader],
};

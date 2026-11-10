import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singleton for Global Site Settings
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.divider(),
      // Filter out siteSettings from general document lists
      ...S.documentTypeListItems().filter(
        (listItem) => !["siteSettings"].includes(listItem.getId() ?? "")
      ),
    ]);

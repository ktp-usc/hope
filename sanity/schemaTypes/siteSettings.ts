import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Site Settings singleton schema.
 * Governs global donation controls (required for SC Secretary of State solicitation compliance)
 * and customizable donation methods.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "donationsEnabled",
      title: "Donations Toggle",
      description: "Toggles whether donations will show or not.",
      type: "boolean",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "donationMethods",
      title: "Donation Methods",
      description:
        "Add, remove, reorder, and customize payment methods (e.g. PayPal, Venmo, Stripe).",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "donationMethod",
          title: "Donation Method",
          fields: [
            defineField({
              name: "title",
              title: "Method Title",
              type: "string",
              description: "e.g., 'PayPal Giving Fund', 'Venmo Charity', 'Stripe'",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "note",
              title: "Subtitle / Note",
              type: "string",
              description:
                "e.g., 'Hands On Prosthetic Engineering - HOPE' or 'Direct app or web profile donation'",
            }),
            defineField({
              name: "url",
              title: "Redirect URL",
              type: "url",
              description: "Destination URL where users complete their gift.",
              validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
            }),
            defineField({
              name: "buttonLabel",
              title: "Button Label",
              type: "string",
              description: "e.g., 'Donate with PayPal', 'Donate with Venmo', 'Donate with Stripe'",
              initialValue: "Donate Now",
            }),
            defineField({
              name: "badgeText",
              title: "Badge Text",
              type: "string",
              description: "e.g., '0% charity fees', '@HandsOnHOPENGO', 'Instant'",
            }),
            defineField({
              name: "colorTheme",
              title: "Button & Accent Color Theme",
              type: "string",
              description: "Choose a brand color theme for this card's button and hover accents.",
              initialValue: "hope-blue",
              options: {
                list: [
                  { title: "HOPE Blue (Brand)", value: "hope-blue" },
                  { title: "Venmo Sky Blue", value: "venmo-blue" },
                  { title: "Stripe Purple", value: "stripe-purple" },
                  { title: "Emerald Green", value: "emerald" },
                  { title: "Charcoal / Ink", value: "charcoal" },
                  { title: "Amber / Sun", value: "amber" },
                  { title: "Custom Hex Color", value: "custom" },
                ],
                layout: "radio",
              },
            }),
            defineField({
              name: "customColor",
              title: "Custom Hex Color",
              type: "string",
              description: "Required only if 'Custom Hex Color' theme is selected (e.g., #635bff).",
              hidden: ({ parent }) => parent?.colorTheme !== "custom",
            }),
            defineField({
              name: "enabled",
              title: "Active",
              type: "boolean",
              description: "Toggle this specific payment method on or off.",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: "title",
              note: "note",
              badge: "badgeText",
              theme: "colorTheme",
              enabled: "enabled",
            },
            prepare({ title, note, badge, theme, enabled }) {
              return {
                title: `${title || "Donation Method"} ${enabled === false ? "(Inactive)" : ""}`,
                subtitle: `${note || ""} [Theme: ${theme || "hope-blue"}]${
                  badge ? ` • ${badge}` : ""
                }`,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      donationsEnabled: "donationsEnabled",
    },
    prepare({ donationsEnabled }) {
      return {
        title: "Site Settings",
        subtitle: `Donations: ${donationsEnabled ? "ON" : "OFF"}`,
      };
    },
  },
});

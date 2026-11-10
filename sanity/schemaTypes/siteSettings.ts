import { contactPurposes, contactLabels, isContactRecipient } from "../../lib/contact-email";
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
    defineField({ name: 'contactEmails', title: 'Contact Email Templates', type: 'array',
      description: 'Optional. Missing purposes use approved website defaults. Changes take effect after publishing.',
      validation: rule => rule.custom(items => {
        const purposes = (items ?? []).map(item => (item as { purpose?: string }).purpose);
        return new Set(purposes).size === purposes.length || 'Each contact purpose may appear only once.';
      }),
      of: [defineArrayMember({ type: 'object', name: 'contactEmail', title: 'Email Template',
        fields: [
          defineField({ name: 'purpose', title: 'Contact Purpose', type: 'string',
            options: { list: contactPurposes.map(value => ({ value, title: contactLabels[value] })) },
            validation: rule => rule.required().custom(value => !value || contactPurposes.includes(value as typeof contactPurposes[number]) || 'Choose a listed contact purpose.') }),
          defineField({ name: 'recipient', title: 'Recipient Email', type: 'string',
            validation: rule => rule.required().custom(value => isContactRecipient(value) || 'Enter one plain email address, without a mailto prefix or extra headers.') }),
          defineField({ name: 'subject', title: 'Email Subject', type: 'string',
            validation: rule => rule.required().max(200).custom(value => !value || !/[\r\n\x00-\x1f\x7f]/.test(value) || 'Use a single line without control characters.') }),
          defineField({ name: 'body', title: 'Prefilled Email Body', type: 'text', rows: 8,
            description: 'Use prompts such as [ENTER NAME]. Do not enter personal information here.',
            validation: rule => rule.required().max(2000).custom(value => !value || !/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value) || 'Remove unsupported control characters.') }),
        ], preview: { select: { title: 'purpose', subtitle: 'recipient' } },
      })],
    }),
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
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { colorTheme?: string } | undefined;
                  if (parent?.colorTheme === "custom") {
                    if (!value) {
                      return "Custom color is required when 'Custom Hex Color' is selected.";
                    }
                    if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)) {
                      return "Must be a valid hex color code (e.g. #635bff).";
                    }
                  }
                  return true;
                }),
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

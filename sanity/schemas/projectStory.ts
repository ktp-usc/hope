import { defineField, defineType } from "sanity";

export const projectStory = defineType({
  name: "projectStory",
  title: "Project Story",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Category",
      type: "string",
      description: "e.g., 'Adaptive Device', 'Community Response', 'Prosthetic Exploration'",
    }),
    defineField({
      name: "summary",
      title: "Summary / Introduction",
      type: "text",
      rows: 4,
      description: "Introductory summary displayed on project cards and the story hero.",
    }),
    defineField({
      name: "projectStatus",
      title: "Project Status",
      type: "string",
      description: "e.g., 'Iterative Engineering', 'Small-Batch Fabrication', 'Foundational Roots', 'Active'",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for accessibility and SEO.",
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
              description: "Important for accessibility and SEO.",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Display priority on /our-work. Lower numbers appear first (e.g. 1, 2, 3). Baseline foundational stories use 1, 2, and 3.",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "heroImage",
    },
  },
});

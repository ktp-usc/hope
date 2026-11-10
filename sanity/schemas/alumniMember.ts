import { defineField, defineType } from 'sanity'
import { isLinkedInUrl, parsePresidentTerm } from '../../lib/alumni'

export const alumniMember = defineType({
  name: 'alumniMember',
  title: 'Alumni & Legacy Directory',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'headshot', title: 'Approved Headshot', type: 'image',
      options: { hotspot: true },
      description: 'Upload or select an approved photograph of this person.',
      fields: [defineField({ name: 'alt', title: 'Alternative Text', type: 'string',
        description: 'Describe the person in the photograph. If omitted, the website uses their name.' })],
    }),
    defineField({ name: 'yearsActive', title: 'Years Active', type: 'string',
      description: 'Verified years only. Leave empty when the record is not yet confirmed.' }),
    defineField({ name: 'isFormerPresident', title: 'Former President', type: 'boolean', initialValue: false }),
    defineField({ name: 'presidentTerm', title: 'President Term', type: 'string',
      description: 'Use YYYY, YYYY–YYYY, or YYYY–Present. Only enter verified service years.',
      hidden: ({ document }) => document?.isFormerPresident !== true,
      validation: (rule) => rule.custom((value, context) => {
        if (context.document?.isFormerPresident !== true) return true
        return parsePresidentTerm(value) ? true : 'A verified president term is required (YYYY, YYYY–YYYY, or YYYY–Present).'
      }),
    }),
    defineField({ name: 'isExecutiveLeader', title: 'Former Executive / Senior Leader (★)', type: 'boolean',
      description: 'Controls the existing star badge. Current leadership alone does not establish former leadership.',
      initialValue: false }),
    defineField({ name: 'roleOrContribution', title: 'Role or Contribution', type: 'string' }),
    defineField({ name: 'linkedInUrl', title: 'LinkedIn URL', type: 'url',
      validation: (rule) => rule.uri({ scheme: ['https'] }).custom((value) =>
        !value || isLinkedInUrl(value) ? true : 'Use an HTTPS LinkedIn URL.'),
    }),
  ],
  orderings: [{ title: 'Name (A–Z)', name: 'nameAscending', by: [{ field: 'name', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'roleOrContribution', media: 'headshot' } },
})

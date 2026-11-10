import { defineField, defineType } from 'sanity'

export const leader = defineType({
  name: 'leader',
  title: 'Leadership & Board Bio',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'affiliation', title: 'Affiliation', type: 'string',
      options: { list: [
        { title: 'H.O.P.E. Inc. Board', value: 'hope-inc-board' },
        { title: 'H.O.P.E. Inc. Executive Leadership', value: 'hope-inc-executive' },
        { title: 'H.O.P.E. Student Organization', value: 'hope-student-org' },
      ], layout: 'radio' },
      validation: (rule) => rule.required().custom((value) =>
        !value || ['hope-inc-board', 'hope-inc-executive', 'hope-student-org'].includes(value)
          ? true : 'Choose a listed organization affiliation.'),
    }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
    defineField({ name: 'headshot', title: 'Approved Headshot', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0,
      validation: (rule) => rule.integer().min(0) }),
  ],
  orderings: [{ title: 'Display Order', name: 'displayOrder', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'title', media: 'headshot' } },
})

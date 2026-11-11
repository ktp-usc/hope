import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'

export const timelineEventType = defineType({
  name: 'timelineEvent',
  title: 'History Timeline Event',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'period',
      title: 'Year or period',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'story',
      title: 'Related story',
      type: 'reference',
      to: [{type: 'story'}],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'period', media: 'image'},
    prepare({title, subtitle, media}) {
      return {title, subtitle, media}
    },
  },
})

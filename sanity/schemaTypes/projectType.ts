import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project & Impact',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Project status',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Project image',
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
    select: {title: 'title', media: 'mainImage', subtitle: 'category'},
  },
})

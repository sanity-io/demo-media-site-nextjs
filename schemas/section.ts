import { FiHash } from 'react-icons/fi'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'section',
  title: 'Section',
  icon: FiHash,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ type: 'brand', name: 'brand' }),
  ],
})

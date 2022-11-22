import { FiHash } from 'react-icons/fi'
import { defineType } from 'sanity'

export default defineType({
  name: 'section',
  title: 'Section',
  icon: FiHash,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    },
    { type: 'brand', name: 'brand' },
  ],
})

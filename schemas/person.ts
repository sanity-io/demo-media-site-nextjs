import { FiUser } from 'react-icons/fi'
import { defineType } from 'sanity'

export default defineType({
  name: 'person',
  title: 'People',
  icon: FiUser,
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      type: 'minimalPortableText',
    },
    {
      name: 'isStaff',
      type: 'boolean',
    },
    { type: 'brand', name: 'brand' },
  ],
  preview: {
    select: {
      title: 'name',
      isStaff: 'isStaff',
      media: 'image',
    },
    prepare({ title, isStaff, media }) {
      return {
        title: `${title}`,
        subtitle: isStaff ? 'Staff' : 'Contributor',
        media,
      }
    },
  },
})

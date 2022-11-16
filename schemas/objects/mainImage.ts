import { FiImage } from 'react-icons/fi'
import { defineType } from 'sanity'

export default defineType({
  name: 'mainImage',
  title: 'Image',
  type: 'object',
  icon: FiImage,
  fieldsets: [
    {
      name: 'text',
      title: 'Text',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['exif', 'location', 'lqip', 'palette'],
      },
    },
    {
      name: 'alt',
      type: 'string',
      validation: (Rule) => Rule.required(),
      fieldset: 'text',
    },
    { name: 'caption', type: 'string', fieldset: 'text' },
  ],
  preview: {
    select: {
      media: 'image',
      alt: 'alt',
      caption: 'caption',
    },
    prepare({ media, alt, caption }) {
      return {
        title: alt || caption || 'No alt text or caption',
        media,
      }
    },
  },
})

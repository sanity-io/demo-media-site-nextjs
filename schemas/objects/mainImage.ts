import {FiImage} from 'react-icons/fi'
import {defineField, defineType} from 'sanity'

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
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['exif', 'location', 'lqip', 'palette'],
      },
    }),
    defineField({
      name: 'alt',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const {parent} = context as any

          // Alt text only required if an image is set in the parent
          if (!parent?.image) {
            return true
          }

          return value
            ? true
            : 'Alternative text is helpful for accessibility and SEO'
        }),
      hidden: ({parent}) => !parent?.image,
      //there's currently a bug where "parent" is the whole document if we have a fieldset
      //making this hidden param problematic
      // fieldset: 'text',
    }),
    defineField({
      name: 'caption',
      type: 'string',
      hidden: ({parent}) => !parent?.image,
      // fieldset: 'text',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      alt: 'alt',
      caption: 'caption',
    },
    prepare({media, alt, caption}) {
      return {
        title: alt || caption || 'No alt text or caption',
        media,
      }
    },
  },
})

import {FiUser} from 'react-icons/fi'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'person',
  title: 'People',
  icon: FiUser,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      type: 'minimalPortableText',
    }),
    defineField({
      name: 'isStaff',
      type: 'boolean',
    }),
    defineField({type: 'brand', name: 'brand'}),
  ],
  preview: {
    select: {
      title: 'name',
      isStaff: 'isStaff',
      media: 'image',
    },
    prepare({title, isStaff, media}) {
      return {
        title: `${title}`,
        subtitle: isStaff ? 'Staff' : 'Contributor',
        media,
      }
    },
  },
})

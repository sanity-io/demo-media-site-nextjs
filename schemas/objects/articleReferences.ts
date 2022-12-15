import {SanityReference} from '@sanity/image-url/lib/types/types'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'articleReferences',
  title: 'Article Reference',
  preview: {
    select: {
      references: 'references',
    },
    prepare({references}) {
      const count = references?.filter(
        (ref: SanityReference) => ref._ref
      ).length
      return {
        title: count > 0 ? `${count} references` : 'No references',
      }
    },
  },
  fields: [
    defineField({
      type: 'array',
      name: 'references',
      title: 'References',
      of: [defineArrayMember({type: 'articleReference'})],
    }),
  ],
})

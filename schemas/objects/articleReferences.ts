import { defineField, defineType } from 'sanity'
export default defineType({
  type: 'object',
  name: 'articleReferences',
  title: 'Article Reference',
  preview: {
    select: {
      references: 'references',
    },
    prepare({ references }) {
      const count = references?.filter((ref) => ref._ref).length
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
      of: [{ type: 'articleReference' }],
    }),
  ],
})

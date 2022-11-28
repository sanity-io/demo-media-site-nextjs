import { defineArrayMember, defineType } from 'sanity'

export default defineType({
  name: 'minimalPortableText',
  type: 'array',
  title: 'Minimal Portable Text',
  of: [
    defineArrayMember({
      type: 'block',
      of: [],
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [],
      },
    }),
  ],
})

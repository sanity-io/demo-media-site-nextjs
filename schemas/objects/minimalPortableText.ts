import { defineType } from 'sanity'

export default defineType({
  name: 'minimalPortableText',
  type: 'array',
  title: 'Minimal Portable Text',
  of: [
    {
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
    },
  ],
})

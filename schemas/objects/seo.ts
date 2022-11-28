import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'SEO Image',
      type: 'image',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
    }),
    defineField({
      name: 'synonyms',
      title: 'Synonyms',
      type: 'string',
    }),
  ],
})

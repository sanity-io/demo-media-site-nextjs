import { defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    {
      name: 'title',
      title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'SEO Description',
      type: 'string',
    },
    {
      name: 'image',
      title: 'SEO Image',
      type: 'image',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
    },
    {
      name: 'synonyms',
      title: 'Synonyms',
      type: 'string',
    },
  ],
})

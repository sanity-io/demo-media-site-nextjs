import { FiFeather } from 'react-icons/fi'
import { defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  icon: FiFeather,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'mainImage',
      name: 'mainImage',
    },
    {
      name: 'people',
      type: 'array',
      description: 'List of people involved with the production of the article',
      of: [{ type: 'contentRole' }],
    },
    {
      name: 'sections',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'section' }] }],
    },
    {
      name: 'intro',
      title: 'Summary',
      description:
        'Used by certain presentations to describe what the article is about',
      type: 'minimalPortableText',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
    },
    { type: 'seo', name: 'seo', title: 'SEO' },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'people.0.person.name',
      media: 'mainImage.image',
    },
    prepare({ title, author, media }) {
      return {
        title,
        subtitle: author,
        media,
      }
    },
  },
})

import { FiHeadphones, FiMail, FiStar } from 'react-icons/fi'
import { defineType } from 'sanity'
import { Rule } from '@sanity/validation'

export default defineType({
  name: 'review',
  title: 'Review',
  icon: FiStar,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'mainImage',
      name: 'mainImage',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'intro',
      title: 'Summary',
      description:
        'Used by certain presentations to describe what the review is about',
      type: 'minimalPortableText',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
    },
    { type: 'seo', name: 'seo', title: 'SEO' },
    { type: 'brand', name: 'brand' },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage.image',
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      }
    },
  },
})

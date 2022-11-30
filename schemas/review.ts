import { FiHeadphones, FiMail, FiStar } from 'react-icons/fi'
import { defineField, defineType } from 'sanity'
import { Rule } from '@sanity/validation'

export default defineType({
  name: 'review',
  title: 'Review',
  icon: FiStar,
  type: 'document',
  readOnly: true,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'mainImage',
      name: 'mainImage',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Summary',
      description:
        'Used by certain presentations to describe what the review is about',
      type: 'minimalPortableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
    }),
    defineField({ type: 'seo', name: 'seo', title: 'SEO' }),
    defineField({ type: 'boolean', name: 'soldOut', title: 'Sold out' }),
    defineField({ type: 'brand', name: 'brand' }),
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

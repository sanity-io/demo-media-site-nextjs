import { FiMail } from 'react-icons/fi'
import { defineType } from 'sanity'
import { Rule } from '@sanity/validation'

export default defineType({
  name: 'newsletter',
  title: 'Newsletter',
  icon: FiMail,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      options: {
        showSyncButton: true,
      },
    },
    {
      name: 'hasCustomTextContent',
      title: 'Override Text Content Body',
      description:
        'By default the text version is generated from the HTML version. Enable this to set the text content manually.',
      type: 'boolean',
    },
    {
      name: 'textContent',
      title: 'Text Content',
      type: 'minimalPortableText',
      hidden: ({ parent }) => !parent?.hasCustomTextContent,
    },
    { type: 'brand', name: 'brand' },
  ],
  preview: {
    select: {
      title: 'title',
      subject: 'subject',
    },
    prepare({ title, subject }) {
      return {
        title,
        subtitle: subject,
      }
    },
  },
})

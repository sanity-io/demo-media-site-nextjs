import { FiMail } from 'react-icons/fi'
import { defineType } from 'sanity'
import { Rule } from '@sanity/validation'

export default defineType({
  name: 'podcast',
  title: 'Podcast',
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
      name: 'podcastEpisode',
      type: 'podcastEpisode',
    },
    {
      name: 'intro',
      title: 'Summary',
      description:
        'Used by certain presentations to describe what the podcast episode is about',
      type: 'minimalPortableText',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
})

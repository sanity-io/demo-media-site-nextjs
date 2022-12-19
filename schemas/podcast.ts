import {FiHeadphones} from 'react-icons/fi'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'podcast',
  title: 'Podcast',
  icon: FiHeadphones,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'podcastEpisode',
      type: 'podcastEpisode',
    }),
    defineField({
      name: 'intro',
      title: 'Summary',
      description:
        'Used by certain presentations to describe what the podcast episode is about',
      type: 'minimalPortableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({type: 'brand', name: 'brand'}),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title,
      }
    },
  },
})

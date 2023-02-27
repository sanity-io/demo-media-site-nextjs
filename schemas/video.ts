import {PresentationIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  icon: PresentationIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'transcribedMuxVideo',
      title: 'Transcribed Mux Video',
      type: 'transcribedMuxVideo',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'srtFile',
      title: 'SRT File',
      type: 'file',
    }),
    defineField({
      name: 'brand',
      type: 'brand',
    }),
  ],
})

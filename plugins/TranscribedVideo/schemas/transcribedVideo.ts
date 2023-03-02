import {PresentationIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {TranscribedVideo} from '../components'
import { TranscribedVideoWithTimeTracking } from '../components/TranscribedVideoWithTimeTracking'

export default defineType({
  name: 'transcribedVideo',
  title: 'Transcribed Video',
  type: 'object',
  icon: PresentationIcon,
  components: {input: TranscribedVideo},
  // components: {input: TranscribedVideoWithTimeTracking},
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
      name: 'video',
      title: 'Video',
      type: 'mux.video',
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      type: 'array',
      of: [{type: 'timestamp'}],
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
  ],
})

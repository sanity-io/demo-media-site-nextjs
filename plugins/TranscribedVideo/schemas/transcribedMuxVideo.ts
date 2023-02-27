import {defineField, defineType} from 'sanity'

import {TranscribedMuxVideo} from '../components'
// import { ArrayWithInlineEdit } from '../components/ArrayWithInlineEdit'

export default defineType({
  name: 'transcribedMuxVideo',
  title: 'Transcribed Mux Video',
  type: 'object',
  components: {input: TranscribedMuxVideo},
  fields: [
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
      // components: {input: ArrayWithInlineEdit}
    }),
  ],
})

import {PresentationIcon} from '@sanity/icons'
import {Stack} from '@sanity/ui'
import React from 'react'
import ReactPlayer from 'react-player'
import {defineField, defineType, StringInputProps} from 'sanity'

import {TranscribedVideo} from '../components'

export default defineType({
  name: 'transcribedVideo',
  title: 'Transcribed Video',
  type: 'object',
  icon: PresentationIcon,
  components: {input: TranscribedVideo},
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
      type: 'string',
      components: {
        input: (props: StringInputProps) => {
          const {value, renderDefault} = props
          return (
            <Stack space={2}>
              {value && (
                <div style={{position: 'relative', paddingTop: '56.25%'}}>
                  <ReactPlayer
                    url={value}
                    width="100%"
                    height="100%"
                    style={{position: 'absolute', top: 0, left: 0}}
                  />
                </div>
              )}
              {renderDefault(props)}
            </Stack>
          )
        },
      },
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

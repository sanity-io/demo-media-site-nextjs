import * as React from 'react'
import {FiVideo} from 'react-icons/fi'
import ReactPlayer from 'react-player'
import {defineType, PreviewProps} from 'sanity'

export default defineType({
  name: 'video',
  type: 'object',
  icon: FiVideo,
  title: 'Video',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Media URL',
      description: `Accepts: YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, DailyMotion and Kaltura`,
      validation: (Rule) => Rule.required(),
    },
  ],
  components: {
    //@ts-expect-error until fixed in core Sanity
    preview: (props: PreviewProps & {url: string}) => {
      const url = props.url
      if (url) {
        return (
          <div style={{position: 'relative', paddingTop: '56.25%'}}>
            <ReactPlayer
              url={url}
              width="100%"
              height="100%"
              style={{position: 'absolute', top: 0, left: 0}}
            />
          </div>
        )
      }
      return <div>Video missing URL</div>
    },
  },
  preview: {
    select: {
      url: 'url',
    },
  },
})

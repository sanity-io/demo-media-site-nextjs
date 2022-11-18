import { FiVideo } from 'react-icons/fi'
// Import issues with react-player in Studio fixed by importing each one individually
import { defaultRenderPreview, defineType, PreviewProps } from 'sanity'
import ReactPlayer from 'react-player'

interface Video {
  url: string
}

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
    preview: (props: PreviewProps) => {
      const video = props.value as Video
      if (video && video.url) {
        return (
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <ReactPlayer
              url={video.url}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        )
      } else {
        return <div>Video missing URL</div>
      }
    },
  },
  preview: {
    select: {
      url: 'url',
    },
  },
})

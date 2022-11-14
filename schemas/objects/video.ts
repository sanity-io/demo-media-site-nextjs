import { FiVideo } from 'react-icons/fi'
// Import issues with react-player in Studio fixed by importing each one individually
import { defineType } from 'sanity'

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
  preview: {
    select: {
      url: 'url',
    },
  },
})

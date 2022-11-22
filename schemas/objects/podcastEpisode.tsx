import { FiVideo } from 'react-icons/fi'
// Import issues with react-player in Studio fixed by importing each one individually
import { defineType, PreviewProps } from 'sanity'
import ReactPlayer from 'react-player'
import { Box, Card, Stack, Text } from '@sanity/ui'
import styled from 'styled-components'

interface Audio {
  url: string
}

const AudioWrapper = styled(Box)`
  position: relative;
`

export default defineType({
  name: 'podcastEpisode',
  type: 'object',
  icon: FiVideo,
  title: 'Podcast Audio',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Audio URL',
      description: `Accepts: SoundCloud and Mixcloud`,
      validation: (Rule) => Rule.required(),
    },
  ],
  components: {
    input: (props: PreviewProps) => {
      console.log('props', props)
      const audio = props.value as Audio
      const hasAudio = audio && audio.url
      return (
        <Stack space={4}>
          {props.renderDefault(props)}
          <AudioWrapper>
            {hasAudio ? (
              <ReactPlayer
                url={audio.url}
                width="100%"
                height="100%"
                style={{ aspectRatio: '16/5.5' }}
              />
            ) : (
              <Text as="p">Audio missing URL</Text>
            )}
          </AudioWrapper>
        </Stack>
      )
    },
    preview: (props: PreviewProps) => {
      const audio = props.value as Audio
      debugger
      if (audio && audio.url) {
        return (
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <ReactPlayer
              url={audio.url}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        )
      } else {
        return (
          <Box paddingY={2}>
            <Text as="p">Audio missing URL</Text>
          </Box>
        )
      }
    },
  },
  preview: {
    select: {
      url: 'url',
    },
  },
})

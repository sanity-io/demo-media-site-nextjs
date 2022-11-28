import { Box, Stack, Text } from '@sanity/ui'
import { FiVideo } from 'react-icons/fi'
import ReactPlayer from 'react-player'
// Import issues with react-player in Studio fixed by importing each one individually
import { defineField, defineType, InputProps, PreviewProps, Rule } from 'sanity'
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
    defineField({
      name: 'url',
      type: 'url',
      title: 'Audio URL',
      description: `Accepts: SoundCloud and Mixcloud`,
      validation: (rule: Rule) => rule.required(),
    }),
  ],
  components: {
    input: (props: InputProps) => {
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
    preview: (props: PreviewProps & { url: string }) => {
      const url = props.url
      if (url) {
        return (
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <ReactPlayer
              url={url}
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

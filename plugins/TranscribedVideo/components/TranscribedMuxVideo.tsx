import {Stack} from '@sanity/ui'
import {ChangeEvent,useState} from 'react'
import {FieldMember, ObjectInputProps} from 'sanity'

import {Player} from './Player'
// import { Transcript } from './Transcript'
// import { MemberField } from 'sanity'

export const TranscribedMuxVideo = (props: ObjectInputProps) => {
  const videoMember = props.members.find(
    (member) => member.key === 'field-video'
  )!
  const transcriptMember = props.members.find(
    (member) => member.key === 'field-transcript'
  )! as FieldMember

  const [currTime, setCurrTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [useInputComponent] = useState(false)

  const onTimeUpdate = (e: ChangeEvent<HTMLVideoElement>) =>
    setCurrTime(e.target.currentTime * 1000)

  return (
    <Stack>
      <Player
        defaultProps={props}
        videoFieldMember={videoMember}
        useInputComponent={useInputComponent}
        onTimeUpdate={onTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      {props.renderDefault({...props, members: [transcriptMember]})}
    </Stack>
  )
}

import {Stack} from '@sanity/ui'
// import {ChangeEvent, useState} from 'react'
import React, {ChangeEvent, useCallback, useState} from 'react'
import {
  ArrayOfObjectsInputProps,
  ArraySchemaType,
  BaseFormNode,
  FieldMember,
  MemberField,
  ObjectInputProps,
  ObjectMember,
  ObjectSchemaType,
} from 'sanity'

import {Player} from './Player'
// import {Transcript} from './Transcript'
import {TranscriptWithAutoOpen} from './TranscriptWithAutoOpen'

type FieldMemberOverload = FieldMember<
  BaseFormNode<ArraySchemaType, ObjectSchemaType>
>

export const TranscribedVideoWithAutoOpen = (props: ObjectInputProps) => {
  const {members, renderInput} = props
  const [currTime, setCurrTime] = useState(0)
  const onTimeUpdate = useCallback(
    (e: ChangeEvent<HTMLVideoElement>) =>
      setCurrTime(e.target.currentTime * 1000),
    [setCurrTime]
  )
  const renderTranscriptInput = useCallback(
    (transcriptInputProps: ArrayOfObjectsInputProps) => (
      <TranscriptWithAutoOpen
        {...transcriptInputProps}
        currTime={currTime}
        renderInput={renderInput}
      />
    ),
    [currTime, renderInput]
  )

  return (
    <Stack>
      {members.map((member: ObjectMember) => {
        if (member.key === 'field-video') {
          return (
            <Player
              {...props}
              member={member}
              key={member.key}
              useInputComponent={false}
              onTimeUpdate={onTimeUpdate}
            />
          )
        } else if (member.key === 'field-transcript') {
          return (
            <MemberField
              {...props}
              member={member as FieldMemberOverload}
              key={member.key}
              //@ts-ignore
              renderInput={renderTranscriptInput}
            />
          )
        }
        return (
          <MemberField
            {...props}
            member={member as FieldMemberOverload}
            key={member.key}
          />
        )
      })}
    </Stack>
  )
}

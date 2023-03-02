import {Stack} from '@sanity/ui'
// import {ChangeEvent, useState} from 'react'
import React, { ChangeEvent, useState } from 'react'
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
import { Player } from './Player'
import { Transcript } from './Transcript'

type FieldMemberOverload = FieldMember<
  BaseFormNode<ArraySchemaType, ObjectSchemaType>
>

export const TranscribedVideoWithTimeTracking = (props: ObjectInputProps) => {
  const {members, renderDefault} = props
  const [currTime, setCurrTime] = useState(0)
  const onTimeUpdate = (e: ChangeEvent<HTMLVideoElement>) => setCurrTime(e.target.currentTime * 1000)

  return (
    <Stack>
      {members.map((member: ObjectMember) => {
        if (member.key === 'field-video') {
          return (
            <Player {...props} member={member} key={member.key} useInputComponent={false} onTimeUpdate={onTimeUpdate}/>
          )
        }
        else if (member.key === 'field-transcript') {
          return (
          <MemberField 
            {...props} 
            member={member as FieldMemberOverload}
            key={member.key} 
            //@ts-ignore
            renderInput={(inputProps: ArrayOfObjectsInputProps) => <Transcript {...inputProps} currTime={currTime} renderDefault={props.renderDefault}/>}
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

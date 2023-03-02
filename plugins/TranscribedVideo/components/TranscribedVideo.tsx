import {Stack} from '@sanity/ui'
// import {ChangeEvent, useState} from 'react'
import React from 'react'
import {
  ArraySchemaType,
  BaseFormNode,
  FieldMember,
  MemberField,
  ObjectInputProps,
  ObjectMember,
  ObjectSchemaType,
} from 'sanity'
import { Player } from './Player'

type FieldMemberOverload = FieldMember<
  BaseFormNode<ArraySchemaType, ObjectSchemaType>
>

export const TranscribedVideo = (props: ObjectInputProps) => {
  const {members} = props
  return (
    <Stack>
      {/* v0 -- render default */}
      {members.map((member: ObjectMember) => {
        if (member.key === 'field-transcript') {
          return (
            <MemberField
              {...props}
              member={member as FieldMemberOverload}
              key={member.key}
            />
          )
        } 
        else if (member.key === 'field-video') {
          return (
            <Player {...props} member={member} key={member.key} useInputComponent={false} />
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

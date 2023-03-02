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
        } else if (member.key === 'field-video') {
          return (
            <MemberField
              {...props}
              member={member as FieldMemberOverload}
              key={member.key}
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

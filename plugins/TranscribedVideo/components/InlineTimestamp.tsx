import {Card, Stack} from '@sanity/ui'
import React from 'react'
import {ObjectItem, ObjectItemProps} from 'sanity'

export const InlineTimestamp = (props: ObjectItemProps<ObjectItem>) => {
  const {inputProps, renderDefault} = props
  const {members, renderInput, value} = inputProps

  const inlineProps = {
    ...inputProps,
    members: members.filter((m) => m.kind === 'field' && m.name === 'text'),
  }
  return (
    <Stack space={2} key={value?._key || 'content'}>
      <Card>{renderDefault(props)}</Card>
      <Card paddingX={5} paddingBottom={5}>
        {renderInput(inlineProps)}
      </Card>
    </Stack>
  )
}

import {Card, Stack} from '@sanity/ui'
import React, { useState } from 'react'
import {ObjectItem, ObjectItemProps} from 'sanity'

export const CollapsibleInlineTimestampInArray = (props: ObjectItemProps<ObjectItem>) => {
  const {inputProps, renderDefault, collapsed, onExpand, onCollapse} = props
  const {members, renderInput, value} = inputProps
  const [isCollapsed, setIsCollapsed] = useState(collapsed)

  console.log('props', props)
  const handleCollapse = () => {
    setIsCollapsed(true)
    onCollapse()
  }

  const handleExpand = () => {
    setIsCollapsed(false)
    onExpand()
  }
  const onOpen = () => handleExpand()

  const inlineProps = {
    ...inputProps,
    members: members.filter((m) => m.kind === 'field' && m.name === 'text'),
  }
  return (
    <Stack space={2} key={value?._key || 'content'}>
      <Card
        onClick={() => {
          if (collapsed) {
            handleExpand()
          } else {
            handleCollapse()
          }
        }}
      >

        {renderDefault({...props, onOpen})}
        </Card>
      {
        !isCollapsed && (
          <Card paddingX={5} paddingBottom={5}>
            {renderInput(inlineProps)}
          </Card>
        )
      }
    </Stack>
  )
}

import {Card, Stack} from '@sanity/ui'
import React, {useCallback, useState} from 'react'
import {ObjectItem, ObjectItemProps} from 'sanity'

export const InlineTimestampWithCollapse = (
  props: ObjectItemProps<ObjectItem>
) => {
  const {inputProps, renderDefault, collapsed, onExpand, onCollapse} = props
  const {members, renderInput, value} = inputProps
  const [isCollapsed, setIsCollapsed] = useState(collapsed)
  const handleCollapse = useCallback(() => {
    setIsCollapsed(true)
    onCollapse()
  }, [onCollapse, setIsCollapsed])

  const handleExpand = useCallback(() => {
    setIsCollapsed(false)
    onExpand()
  }, [onExpand, setIsCollapsed])

  const onOpen = () => handleExpand()

  const handleClick = useCallback(() => {
    if (isCollapsed) {
      handleExpand()
    } else {
      handleCollapse()
    }
  }, [isCollapsed, handleCollapse, handleExpand])

  const inlineProps = {
    ...inputProps,
    members: members.filter((m) => m.kind === 'field' && m.name === 'text'),
  }
  return (
    <Stack space={2} key={value?._key || 'content'}>
      <Card onClick={handleClick}>{renderDefault({...props, onOpen})}</Card>
      {!isCollapsed && (
        <Card paddingX={5} paddingBottom={5}>
          {renderInput(inlineProps)}
        </Card>
      )}
    </Stack>
  )
}

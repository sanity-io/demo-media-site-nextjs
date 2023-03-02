import {Card, Stack} from '@sanity/ui'
import React, {useCallback, useMemo, useState} from 'react'
import {ObjectItem, ObjectItemProps} from 'sanity'

export const ClickableInlineTimestampWithCollapse = (
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

  const handleClick = useCallback(() => {
    if (isCollapsed) {
      handleExpand()
    } else {
      handleCollapse()
    }
  }, [isCollapsed, handleCollapse, handleExpand])

  const inlineProps = useMemo(
    () => ({
      ...inputProps,
      members: members.filter((m) => m.kind === 'field' && m.name === 'text'),
    }),
    [inputProps, members]
  )

  const TimestampBody = useCallback(() => {
    if (!isCollapsed || !collapsed) {
      return (
        <Card paddingX={5} paddingBottom={5}>
          {renderInput(inlineProps)}
        </Card>
      )
    }
    return null
  }, [isCollapsed, renderInput, inlineProps, collapsed])

  return (
    <Stack space={2} key={value?._key || 'content'}>
      <Card onClick={handleClick}>{renderDefault(props)}</Card>
      <TimestampBody />
    </Stack>
  )
}

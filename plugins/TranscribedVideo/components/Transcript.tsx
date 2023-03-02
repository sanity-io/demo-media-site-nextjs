import { useCallback, useMemo, useState } from 'react'
import { ArrayOfObjectsInput, ArrayOfObjectsInputMembers, ArrayOfObjectsInputProps, ArrayOfObjectsMember, useFormBuilder} from 'sanity'
import { parseTimestamp } from './utils/parseTimestamp'
import { Stack, Flex, Inline, Button, Card } from '@sanity/ui'
import {
  CollapseIcon,
  ExpandIcon,
} from '@sanity/icons'
import { InlineTimestampWithCollapse } from './InlineTimestampWithCollapse'

type TranscriptProps = ArrayOfObjectsInputProps & {
  currTime: number
  renderDefault: (props: ArrayOfObjectsInputProps) => JSX.Element
}

type SimpleTimestamp = {
  start: number | null
  stop: number | null
}

type TimeTrackingArrayInputProps = ArrayOfObjectsInputProps & {
  showAll?: boolean
  toggleShowAll?: () => void
}


export const Transcript = (props: TranscriptProps) => {
  const [showAll, setShowAll] = useState(false)
  const {currTime, members, elementProps, renderDefault} = props

  // //convert to numbers for easy processing
  const timestamps: SimpleTimestamp[] = useMemo(() => {
    return members.map((member) => {
      //@ts-expect-error -- "item" not expected on member
      const timeRange = member?.item?.value?.timeRange
      return ({
        start: parseTimestamp(timeRange?.start) || null,
        stop: parseTimestamp(timeRange?.stop) || null,
      })
    })
  }, [members])

  const filteredItems = useMemo(() => {
    if (showAll) { return members }
    return timestamps.reduce((acc: ArrayOfObjectsMember[], item, i) => {
      //just do a buffer of 5 seconds
      if (item.start === null) { return acc }
      const is5SecondsBefore = item.start >= currTime - 5000
      const is5SecondsAfter = item.start <= currTime + 5000
      if (is5SecondsBefore && is5SecondsAfter) {
        return [...acc, members[i]]
      } else {
        return acc
      }
    }, [])
    .map((member: ArrayOfObjectsMember) => {
      //@ts-expect-error -- "item" not expected on member
      const timeRange = member?.item?.value?.timeRange
      const isCurrent = (
        parseTimestamp(timeRange?.start) <= currTime &&
        parseTimestamp(timeRange?.stop) >= currTime
      )

      //ensure non-current items can be opened
      if (!isCurrent) {
        return {
          ...member,
        }
      } else {
        return {
          ...member,
          collapsed: false
        }
      }
    })

  }, [timestamps, currTime, members, showAll])

  const toggleShowAll = useCallback(() => {
    setShowAll(!showAll)
  }, [showAll])

  const membersToShow = useMemo(() => {
    return showAll ? members : filteredItems
  }, [showAll, members, filteredItems])
  
  return (
    <Stack space={1}>
      <Flex justify="flex-end">
        <Inline space={2}>
          <Button
            icon={showAll ? CollapseIcon : ExpandIcon}
            text={showAll ? 'Filter to    timestamp' : 'Show   all'}
            mode="bleed"
            fontSize={1}
            disabled={members.length === 0}
            onClick={toggleShowAll}
            id="showAllButton"
          />
        </Inline>
      </Flex>
      <Card
        radius={1}
        border
        tabIndex={0}
        marginY={1}
        {...elementProps}
      >
        {
        renderDefault({
          ...props,
          members: membersToShow,
          renderItem: (itemProps) => {console.log('itemProps', itemProps); return <div/>}})}
        {/* <ArrayOfObjectsInputMembers
          {...props}
          members={membersToShow}
          renderItem={(itemProps) => {
        /> */}
      </Card>
    </Stack>
  )
}

// const TimeTrackingArray
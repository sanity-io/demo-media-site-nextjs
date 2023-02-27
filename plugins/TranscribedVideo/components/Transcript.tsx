import { useCallback, useMemo, useState } from 'react'
import { ArrayOfObjectsMember, ObjectInputProps, ObjectMember } from 'sanity'
import { ArrayWithInlineEdit } from './ArrayWithInlineEdit'
import { parseTimestamp } from './utils/parseTimestamp'

type TransciptProps = {
  memberProps: ObjectInputProps
  defaultProps: ObjectInputProps
  currTime: number
  transcriptFieldMember: ObjectMember
  isPlaying: boolean
}

type SimpleTimestamp = {
  start: number | null
  stop: number | null
}

export const Transcript = ({memberProps, defaultProps, currTime, isPlaying}: TransciptProps) => {
  const [showAll, setShowAll] = useState(false)

  //convert to numbers for easy processing
  const timestamps: SimpleTimestamp[] = useMemo(() => {
    return memberProps.members.map((member) => {
      //@ts-expect-error -- "item" not expected on member
      const timeRange = member?.item?.value?.timeRange
      return ({
        start: parseTimestamp(timeRange?.start) || null,
        stop: parseTimestamp(timeRange?.stop) || null,
      })
    })
  }, [memberProps.members])

  const filteredItems = useMemo(() => {
    if (showAll) { return memberProps.members }
    return timestamps.reduce((acc: ArrayOfObjectsMember[], item, i) => {
      //just do a buffer of 5 seconds
      if (item.start === null) { return acc }
      const is5SecondsBefore = item.start >= currTime - 5000
      const is5SecondsAfter = item.start <= currTime + 5000
      if (is5SecondsBefore && is5SecondsAfter) {
        return [...acc, memberProps.members[i]]
      } else {
        return acc
      }
    }, [])
    .map((member: ArrayOfObjectsMember) => {
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

  }, [timestamps, currTime, memberProps.members, showAll])

  const toggleShowAll = useCallback(() => {
    setShowAll(!showAll)
  }, [showAll])


  //so hacky -- just getting around weird hierarchy stuff
  const {renderInput} = defaultProps
  const finalProps = {
    ...memberProps,
    renderInput,
    showAll,
    toggleShowAll,
    currTime,
    isPlaying
  }

  return (
    <ArrayWithInlineEdit 
    {...finalProps} members={filteredItems} />
  )

}
// /* eslint-disable react/jsx-handler-names */
// import React from 'react'
// import {Box, Button, Card, Flex, Inline, Stack, Text} from '@sanity/ui'
// import {Reorder} from 'framer-motion'
// import {
//   AddIcon,
//   CollapseIcon,
//   ExpandIcon,
// } from '@sanity/icons'
// import {ObjectSchemaType} from '@sanity/types'
// import { ArrayOfObjectsInputProps } from 'sanity'
// import { createProtoValue } from './utils/createProtoValue'
// import { ArrayOfObjectsMembers } from 'sanity'
// import { ArrayItem } from './ArrayItem'
// import {stringifyTimestamp} from './utils/stringifyTimestamp'

// type ArrayWithInlineEditProps = ArrayOfObjectsInputProps & {
//   showAll: boolean
//   toggleShowAll: () => void
//   currTime: number
//   isPlaying: boolean
// }

// export function ArrayWithInlineEdit(props: ArrayWithInlineEditProps) {

//   //TODO: this should take in the timestamp
//   const handleAddItem = () => {
//     const itemType = props.schemaType.of[0]
//     const timeRange = (props.currTime) ?
//       {start: stringifyTimestamp(props.currTime), stop: stringifyTimestamp(props.currTime + 1000)} :
//       { }
//     const key = Math.random().toString(32).substring(2)
//     const item = {
//       ...createProtoValue(itemType),
//       timeRange,
//       _key: key
//     }

//     //if we're playing, move to below the currently playing item
//     // if (props.isPlaying) {
//     //   const playingIdx = props.members.findIndex(
//     //     (item) => parseTimestamp(item.timeRange.start) <= props.currTime && parseTimestamp(item.timeRange.stop) >= props.currTime)
//     props.onAppendItem(item)
//     props.onExpandItem(key)
//     props.onFocusPath([{_key: key}, (itemType as ObjectSchemaType).fields[0].name])
//   }

//   const handleReorder = (nextItems: any[]) => {
//     const moved = nextItems.flatMap((item, nextIndex) => {
//       const currentIndex = props.value?.findIndex((currentItem) => currentItem._key === item._key)
//       return currentIndex === undefined || currentIndex === nextIndex
//         ? []
//         : [[currentIndex, nextIndex]]
//     })
//     moved.forEach(([fromIndex, toIndex]) => {
//       props.onMoveItem({fromIndex, toIndex})
//     })
//   }

//   return (
//     <Reorder.Group axis="y" values={props.value || []} onReorder={handleReorder} as="div">
//       <Stack space={1}>
//         <Flex justify="flex-end">
//           <Inline space={2}>
//             <Button
//               icon={props.showAll ? CollapseIcon : ExpandIcon}
//               text={props.showAll ? 'Filter to    timestamp' : 'Show   all'}
//               mode="bleed"
//               fontSize={1}
//               disabled={props.members.length === 0}
//               onClick={props.toggleShowAll}
//             />
//           </Inline>
//         </Flex>
//         <Card
//           radius={1}
//           {...props.elementProps}
//           border
//           tabIndex={0}
//           __unstable_focusRing
//           marginY={1}
//         >
//           {props.members.length === 0 ? (
//             <Box padding={2}>
//               <Text muted>{props.schemaType.placeholder || 'No items'}</Text>
//             </Box>
//           ) : (
//             <Stack>
//               <ArrayOfObjectsMembers
//                 members={props.members}
//                 renderInput={props.renderInput}
//                 renderField={props.renderField}
//                 renderItem={(itemProps) => <ArrayItem {...itemProps} renderPreview={props.renderPreview}/>}
//                 renderPreview={props.renderPreview}
//               />
//             </Stack>
//           )}
//         </Card>
//         <Button icon={AddIcon} text="Add item" mode="ghost" onClick={handleAddItem} />
//       </Stack>
//     </Reorder.Group>
//   )
// }

export default {}

// import { ItemProps, ObjectItemProps, RenderPreviewCallback } from 'sanity'
// import {AnimatePresence, motion, Reorder, useDragControls} from 'framer-motion'
// import {Box, Button, Card, Flex, Menu, MenuButton, MenuItem} from '@sanity/ui'
// import {
//   DragHandleIcon,
//   EllipsisVerticalIcon,
//   TrashIcon,
// } from '@sanity/icons'
// import styled from 'styled-components'

// //ahem
// // import { createProtoValue } from 'sanity/lib/dts/src/form/inputs/arrays/ArrayOfObjectsInput/ArrayInput'
// // import { FieldPresence } from 'sanity/lib/dts/src/presence'
// // import {FormFieldValidationStatus} from '../../../components/formField'
// // import {useChildValidation} from '../../../studio/contexts/Validation'

// type ItemWithPreview = ObjectItemProps & {renderPreview: RenderPreviewCallback}
// const HoverCard = styled(Card)<{collapsed: boolean}>`
//   background-color: ${(props) => (props.collapsed ? 'transparent' : 'inherit')};
//   border: 1px solid transparent;
//   &:hover {kk
//     border-color: ${(props) =>
//       props.collapsed ? 'var(--card-shadow-umbra-color)' : 'transparent'};
//   }
// `

// function Item<T>(
//   props: ItemProps & {
//     value: T
//     collapsed: boolean
//     onRemove: () => void
//     onExpand: () => void
//     onCollapse: () => void
//     renderPreview: RenderPreviewCallback
//   }
// ) {
//   const {
//     value,
//     collapsed,
//     onRemove,
//     onExpand,
//     onCollapse,
//     schemaType,
//     children,
//     onFocus,
//     //@ts-ignore
//     onBlur,
//     // presence,
//   } = props
//   const controls = useDragControls()

//   return (
//     <Reorder.Item as="div" value={value} dragListener={false} dragControls={controls}>
//       <HoverCard shadow={collapsed ? 0 : 2} margin={1} radius={2} collapsed={collapsed}>
//         <Flex align="center">
//           <Box marginLeft={1}>
//             <Button
//               icon={DragHandleIcon}
//               mode="bleed"
//               className="reorder-handle"
//               onPointerDown={(e) => controls.start(e)}
//             />
//           </Box>
//           <Box flex={1}>
//             <Card
//               as="button"
//               onClick={collapsed ? onExpand : onCollapse}
//               radius={2}
//               margin={1}
//               paddingY={1}
//               onFocus={onFocus}
//               onBlur={onBlur}
//               __unstable_focusRing
//             >
//               {props.renderPreview({value, schemaType})}
//             </Card>
//           </Box>
//           {/* {itemPresence.length > 0 && (
//             <Box marginLeft={1}>
//               <FormFieldPresence presence={itemPresence} maxAvatars={1} />
//             </Box>
//           )} */}

//           {/* {itemValidation.length > 0 && (
//             <Box marginLeft={1} paddingX={1} paddingY={3}>
//               <FormFieldValidationStatus />
//             </Box>
//           )} */}

//           <Box marginRight={1}>
//             <MenuButton
//               button={<Button mode="bleed" icon={EllipsisVerticalIcon} />}
//               id="menu-button-example"
//               menu={
//                 <Menu>
//                   <MenuItem text="Delete" icon={TrashIcon} tone="critical" onClick={() => onRemove()} />
//                 </Menu>
//               }
//               popover={{portal: true}}
//             />
//           </Box>
//         </Flex>
//         <AnimatePresence initial={false}>
//           {!collapsed && (
//             <motion.section
//               key="content"
//               initial="collapsed"
//               animate="open"
//               exit="collapsed"
//               variants={{
//                 open: {height: 'auto'},
//                 collapsed: {height: 0, overflow: 'hidden'},
//               }}
//               transition={{duration: 0.2}}
//             >
//               <Box padding={3}>
//                 <>{children}</>
//               </Box>
//             </motion.section>
//           )}
//         </AnimatePresence>
//       </HoverCard>
//     </Reorder.Item>
//   )
// }

//   export const ArrayItem = (itemProps: ItemWithPreview) => {
//     const collapsed = itemProps.collapsed !== false
//     const onExpand = itemProps.onExpand
//     const onCollapse = itemProps.onCollapse

//     return (
//       <Item
//         {...itemProps}
//         collapsed={collapsed}
//         onExpand={onExpand}
//         onCollapse={onCollapse}
//         renderPreview={itemProps.renderPreview}
//       >
//         {itemProps.children}
//       </Item>
//     )
//   }

export default {}

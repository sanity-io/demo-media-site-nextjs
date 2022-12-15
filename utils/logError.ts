export const logError = (
  message: string,
  options: Record<string, any>
): void => {
  console.error(message, {
    // eg `someUnknownType`
    type: options.type,

    // 'block' | 'mark' | 'blockStyle' | 'listStyle' | 'listItemStyle'
    nodeType: options.nodeType,
  })
}

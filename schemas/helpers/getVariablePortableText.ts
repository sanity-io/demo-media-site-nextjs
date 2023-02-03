import {defineArrayMember, FieldDefinition} from 'sanity'
import {rawPortableTextObj} from 'schemas/objects/portableText'

//in certain contexts we may want to add blocks. this function
//allows us to use the already-defined "default" Portable Text object
//and make changes
export const getVariablePortableText = (
  documentType: string,
  fieldName: string
): FieldDefinition => {
  const blocksToAdd = []
  if (documentType === 'newsletter') {
    blocksToAdd.push(
      defineArrayMember({
        type: 'articleReferences',
        title: 'Articles',
      })
    )
  }
  return {
    ...rawPortableTextObj,
    //@ts-ignore
    of: [...rawPortableTextObj.of, ...blocksToAdd],
    name: fieldName,
  }
}

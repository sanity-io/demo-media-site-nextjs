import React from 'react'
import type {InputProps} from 'sanity'

import {EMSStatusWrapper} from './EMSStatusWrapper'
import {SyncNewArticlesWrapper} from './SyncNewArticles'

// const isArrayType = (def: ArraySchemaType): def is ArrayDefinition =>
//   def.type === 'portableText'

export function InputWrappers(props: InputProps) {
  // console.log(props.schemaType)

  if (
    props.schemaType.type?.name === 'document' &&
    props.schemaType.name === 'newsletter'
  ) {
    return <EMSStatusWrapper {...props} />
  }

  // if (isArrayType(props.schemaType)) {
  // }

  if (props.schemaType?.options?.showSyncButton) {
    return <SyncNewArticlesWrapper {...props} />
  }

  return props.renderDefault(props)
}

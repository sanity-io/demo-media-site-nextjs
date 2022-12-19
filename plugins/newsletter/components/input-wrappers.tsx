import React from 'react'
import type {InputProps} from 'sanity'

import {MailchimpStatusWrapper} from './mailchimp-status-wrapper'
import {SyncNewArticlesWrapper} from './sync-new-articles'

// const isArrayType = (def: ArraySchemaType): def is ArrayDefinition =>
//   def.type === 'portableText'

export function InputWrappers(props: InputProps) {
  // console.log(props.schemaType)

  if (
    props.schemaType.type.name === 'document' &&
    props.schemaType.name === 'newsletter'
  ) {
    return <MailchimpStatusWrapper {...props} />
  }

  // if (isArrayType(props.schemaType)) {
  // }

  if (props.schemaType?.options?.showSyncButton) {
    return <SyncNewArticlesWrapper {...props} />
  }

  return props.renderDefault(props)
}

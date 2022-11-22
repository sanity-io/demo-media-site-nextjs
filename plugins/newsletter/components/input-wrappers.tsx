import type { InputProps, SanityDocumentLike } from 'sanity'
import React from 'react'
import { MailchimpStatusWrapper } from './mailchimp-status-wrapper'
import { SyncNewArticlesWrapper } from './sync-new-articles'

export function InputWrappers(props: InputProps) {
  // console.log(props.schemaType)

  if (
    props.schemaType.type.name === 'document' &&
    props.schemaType.name === 'newsletter'
  ) {
    return <MailchimpStatusWrapper {...props} />
  }

  if (
    props.schemaType.name === 'portableText' &&
    props.schemaType.title === 'Content'
  ) {
    return <SyncNewArticlesWrapper {...props} />
  }

  return props.renderDefault(props)
}

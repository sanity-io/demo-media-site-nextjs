/**
 * This component is responsible for rendering a preview of an article inside the Studio.
 * It's imported in `sanity.config.ts´ and used as a component in the defaultDocumentNode function.
 */
import { Card, Text } from '@sanity/ui'
import React from 'react'
import { SanityDocumentLike } from 'sanity'

interface DocumentPreviewProps {
  document: {
    displayed: SanityDocumentLike & {slug: {current: string}}
  }
}

export function DocumentPreview({document: {displayed}}: DocumentPreviewProps) {
  // if the document has no slug for the preview iframe
  const {slug, _type} = displayed
  if (!slug) {
    return (
      <Card tone="primary" margin={5} padding={6}>
        <Text align="center">
          {`Please add a slug to the ${_type} to see the preview!`}
        </Text>
      </Card>
    )
  }

  return (
    <Card scheme="light" style={{ width: '100%', height: '100%' }}>
      {/* //@TODO: Use IFrame Pane here? */}
      <iframe style={{ width: '100%', height: '100%' }} src={getUrl(displayed)} />
    </Card>
  )
}

function getUrl(document: DocumentPreviewProps['document']['displayed']) {
  const {slug, _type} = document
  const url = new URL('/api/preview', location.origin)
  //@TODO: update to use new token flow per next-sanity docs
  const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
  if (secret) {
    url.searchParams.set('secret', secret)
  }

  url.searchParams.set('slug', slug?.current!)
  url.searchParams.set('type', _type!)

  return url.toString()
}

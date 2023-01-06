/**
 * This component is responsible for rendering previews of pages in the studio.
 */
import {getSecret} from 'plugins/productionUrl/utils'
import React, {memo} from 'react'
import {SanityDocumentLike, useClient} from 'sanity'
import Iframe from 'sanity-plugin-iframe-pane'
import {suspend} from 'suspend-react'

type Props = {
  slug?: string
  previewSecretId: `${string}.${string}`
  apiVersion: string
  document: {
    displayed: SanityDocumentLike
  }
}

// Used as a cache key that doesn't risk collision or getting affected by other components that might be using `suspend-react`
const fetchSecret = Symbol('preview.secret')

export const PreviewPane = memo(function PreviewPane(
  props: Omit<Props, 'slug'> & Required<Pick<Props, 'slug'>>
) {
  const {apiVersion, previewSecretId, document, slug} = props
  const client = useClient({apiVersion})

  const secret = suspend(
    () => getSecret(client, previewSecretId, true),
    ['getSecret', previewSecretId, fetchSecret],
    // The secret fetch has a TTL of 1 minute, just to check if it's necessary to recreate the secret which has a TTL of 60 minutes
    {lifespan: 60000}
  )

  const url = new URL('/api/preview', location.origin)
  url.searchParams.set('slug', slug)
  if (secret) {
    url.searchParams.set('secret', secret)
  }

  const options = {
    url: url.toString(),
    reload: {
      button: true,
      revision: false,
    },
  }

  return <Iframe options={options} document={document} />
})

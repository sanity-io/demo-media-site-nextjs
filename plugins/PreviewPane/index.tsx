/**
 * This component is responsible for rendering previews of pages in the studio.
 */
import {config} from 'lib/config'
import {getSecret} from 'plugins/productionUrl/utils'
import React, {memo} from 'react'
import {SanityDocumentLike, SlugValue, useClient} from 'sanity'
import Iframe from 'sanity-plugin-iframe-pane'
import {suspend} from 'suspend-react'

type Props = {
  document: {
    displayed: SanityDocumentLike & {slug?: SlugValue; brand?: string}
  }
}

interface IframeOptions {
  url?: string
  reload: {
    button?: boolean
    revision?: boolean | number
  }
}

// Used as a cache key that doesn't risk collision or getting affected by other components that might be using `suspend-react`
const fetchSecret = Symbol('preview.secret')

export const PreviewPane = memo(function PreviewPane({document}: Props) {
  const {apiVersion, previewSecretId} = config.sanity
  const slug = document.displayed.slug?.current ?? ''
  const brand = document.displayed.brand

  const client = useClient({apiVersion: `${apiVersion}`})

  const secret = suspend(
    () => getSecret(client, previewSecretId, true),
    [getSecret, previewSecretId, fetchSecret],
    // The secret fetch has a TTL of 1 minute, just to check if it's necessary to recreate the secret which has a TTL of 60 minutes
    {lifespan: 60000}
  )

  const url = new URL('/api/preview', location.origin)
  if (brand) {
    url.searchParams.set('brand', brand)
  }

  url.searchParams.set('slug', slug)
  if (secret) {
    url.searchParams.set('secret', secret)
  }

  const options: IframeOptions = {
    url: url.toString(),
    reload: {
      button: true,
    },
  }

  if (document.displayed._type == 'siteSettings') {
    options.reload.revision = true
  }

  //@ts-expect-error "reload: false" does not work as expected
  return <Iframe options={options} document={document} />
})

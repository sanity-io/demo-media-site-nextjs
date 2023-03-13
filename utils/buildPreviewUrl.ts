import {config} from 'lib/config'
import {getSecret} from 'plugins/productionUrl/utils'
import {SanityDocument, Slug, useClient} from 'sanity'
import {suspend} from 'suspend-react'

type BrandSlugDocument = {
  brand: string
  slug: Slug
}
type PaneDocument = {
  displayed: SanityDocument & BrandSlugDocument
}

// Used as a cache key that doesn't risk collision or getting affected by other components that might be using `suspend-react`
const fetchSecret = Symbol('preview.secret')

export const useBuildPreviewUrl = (document: PaneDocument): string => {
  const {apiVersion, previewSecretId} = config.sanity
  const slug = document.displayed.slug?.current ?? ''
  const brand = document.displayed.brand

  const client = useClient({apiVersion})

  const secret = suspend(
    // @ts-ignore
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
  return url.toString()
}

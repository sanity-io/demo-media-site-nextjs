import { config } from 'lib/config'
import {SanityDocumentLike} from 'sanity'

export type ProductionUrlDoc = SanityDocumentLike & {slug: any}

export function resolveProductionUrl(doc: ProductionUrlDoc): string {
  const {slug, _type} = doc
  const secret = config.previewSecret
  const url = new URL('/api/preview', location.origin)

  if (_type !== 'siteSettings') {
    url.searchParams.set('slug', slug?.current)
  }
  url.searchParams.set('type', _type)

  if (secret) {
    url.searchParams.set('secret', secret)
  }

  return url.toString()
}

import { SanityDocumentLike } from 'sanity'

export type ProductionUrlDoc = SanityDocumentLike & { slug: any }

export function resolveProductionUrl(doc: ProductionUrlDoc) {
  const { slug, _type } = doc
  const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
  const url = new URL('/api/preview', location.origin)

  _type !== 'siteSettings' && url.searchParams.set('slug', slug?.current)
  url.searchParams.set('type', _type)

  if (secret) {
    url.searchParams.set('secret', secret)
  }

  return url.toString()
}

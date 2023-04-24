import {SanityDocumentLike} from 'sanity'
import {BrandSlugDocument} from 'types'
//helper function used by the hook version of this for the preview pane
//and for the resolve production url function for the production url plugin
//and anywhere else we need a URL.

interface BuildPreviewUrlOptions {
  document: BrandSlugDocument | SanityDocumentLike
  secret?: string | null
  fetch?: boolean
}

export const buildPreviewUrl = ({
  document,
  secret,
}: BuildPreviewUrlOptions): string => {
  let previewLoc = location.origin
  //for running the studio independently -- can clean up later
  if (previewLoc.includes('localhost:3333')) {
    previewLoc = 'http://localhost:3000'
  } else if (previewLoc.includes('sanity.studio')) {
    previewLoc = 'https://demo-media-site-nextjs.sanity.build/'
  }
  const url = new URL('/api/preview', previewLoc)
  if (secret) {
    url.searchParams.set('secret', secret)
  }
  const slug = (document as BrandSlugDocument).slug?.current
  if (slug) {
    url.searchParams.set('slug', slug)
  }

  const brand = document.brand as string

  if (brand) {
    url.searchParams.set('brand', brand)
  }

  return url.toString()
}

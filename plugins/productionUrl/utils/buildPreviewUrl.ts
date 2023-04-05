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
  fetch = false,
}: BuildPreviewUrlOptions): string => {
  let currLoc = location.origin
  //for running the studio independently -- can clean up later
  if (currLoc.includes('localhost:3333')) {
    currLoc = 'http://localhost:3000'
  } else if (currLoc.includes('sanity.studio')) {
    currLoc =
      'https://demo-media-site-nextjs-git-refactor-independent-studio-run.sanity.build/'
  }
  const url = new URL('/api/preview', currLoc)
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

  if (fetch) {
    url.searchParams.set('fetch', 'true')
  }

  return url.toString()
}

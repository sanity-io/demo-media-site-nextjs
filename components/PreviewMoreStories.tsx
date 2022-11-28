'use client'

import { indexQuery } from '../lib/queries'
import { usePreview } from '../lib/sanity.preview'
import { getBrandName } from '../utils/brand'
import MoreStories from './MoreStories'

export default function PreviewMoreStories() {
  // TODO: I believe this does not return a `data` key anymore
  const { data: allArticles } = usePreview(null, indexQuery, {
    brand: getBrandName(),
  })

  return <MoreStories articles={allArticles} />
}

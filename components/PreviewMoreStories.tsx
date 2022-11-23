'use client'

import { indexQuery } from '../lib/queries'
import { usePreview } from '../lib/sanity.preview'
import MoreStories from './MoreStories'

export default function PreviewMoreStories() {
  const { data: allArticles } = usePreview(null, indexQuery)
  return <MoreStories articles={allArticles} />
}

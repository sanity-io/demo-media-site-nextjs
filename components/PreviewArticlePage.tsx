'use client'

import { articleQuery } from '../lib/queries'
import { usePreview } from '../lib/sanity.preview'
import ArticlePage from './ArticlePage'

export default function PreviewArticlePage({ slug }: { slug: string }) {
  const { article } = usePreview(null, articleQuery, { slug })
  return <ArticlePage article={article} />
}

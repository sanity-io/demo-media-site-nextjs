'use client'
import * as React from 'react'

import {articleQuery} from '../lib/queries'
import {usePreview} from '../lib/sanity.preview'
import ArticlePage from './ArticlePage'

export default function PreviewArticlePage({
  token,
  slug,
  brand,
}: {
  token: string
  slug: string
  brand: string
}) {
  const {article} = usePreview(token, articleQuery, {slug, brand})
  return <ArticlePage article={article} />
}

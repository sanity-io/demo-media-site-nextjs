'use client'
import * as React from 'react'

import {articleQuery} from '../lib/queries'
import {usePreview} from '../lib/sanity.preview'
import ArticlePage from './ArticlePage'

export default function PreviewArticlePage({
  token,
  slug,
}: {
  token: string
  slug: string
}) {
  const {article} = usePreview(token, articleQuery, {slug})
  return <ArticlePage article={article} />
}

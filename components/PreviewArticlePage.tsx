'use client'
import * as React from 'react'

import {articleQuery} from '../lib/queries'
import {usePreview} from '../lib/sanity.preview'
import ArticlePage from './ArticlePage'

interface Props {
  token: string
  slug: string
  brand: string
}

export default function PreviewArticlePage({token, slug, brand}: Props) {
  const {article} = usePreview(token, articleQuery, {slug, brand})
  return <ArticlePage article={article} />
}

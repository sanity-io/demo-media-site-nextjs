'use client'

import {usePreview} from '../lib/sanity.preview'
import Article from './Article'
import { articleQuery } from '../lib/queries'

export default function PreviewArticle() {
  const {data} = usePreview(null, articleQuery)
  console.log('data', data)
  const article = data?.article
  return <Article article={article} />
}
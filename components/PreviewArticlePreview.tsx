'use client'
import * as React from 'react'
import {Article, Review} from 'types'

import {articleQuery} from '../lib/queries'
// import {usePreview, useReviewPreview} from '../lib/sanity.preview'
import {usePreview} from '../lib/sanity.preview'
import ArticlePreview from './ArticlePreview'

interface Props {
  brandName?: string
  token: string
  slug?: string
  // type?: string
}

interface FetchedArticle {
  article: Article | Review
}

/* This is only used for index pages.
 * The reason we have a preview component for such a small part of the page
 * is so we can preview content from different datasets!
 * Take this approach with a grain of salt, we haven't tested it at scale.
 */
export default function PreviewArticlePreview({brandName, slug, token}: Props) {
  // if (type == 'review') {
  //   const review = useReviewPreview(token, {slug, brand: brandName})
  // }

  const articleBody: FetchedArticle = usePreview(token, articleQuery, {
    slug,
    brand: brandName,
  })

  return <ArticlePreview {...articleBody.article} />
}

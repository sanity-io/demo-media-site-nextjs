'use client'
import * as React from 'react'
import {Article} from 'types'

import {articleQuery} from '../lib/queries'
import {usePreview} from '../lib/sanity.preview'
import ArticlePreview from './ArticlePreview'

interface Props {
  brandName?: string
  token: string
  slug?: string
  sectionType?: 'featured' | 'normal'
  isHighlighted?: boolean
}

/* This is only used for index pages.
 * The reason we have a preview component for such a small part of the page
 * is so we can preview content from different datasets!
 * Take this approach with a grain of salt, we haven't tested it at scale.
 */
export function PreviewArticlePreview({
  brandName,
  slug,
  token,
  sectionType,
  isHighlighted,
}: Props) {
  const articleBody: Article = usePreview(token, articleQuery, {
    slug,
    brand: brandName,
  })?.article

  const props = {
    ...articleBody,
    brandName,
    sectionType,
    isHighlighted,
  }

  return <ArticlePreview {...props} />
}

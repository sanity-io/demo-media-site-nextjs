'use client'
import {reviewConfig} from 'lib/config'
import * as React from 'react'
import {Review, Section} from 'types'

import {reviewQuery} from '../lib/queries'
import {useReviewPreview} from '../lib/sanity.preview'
import ArticlePreview from './ArticlePreview'

interface Props {
  token: string
  slug?: string
  brandName?: string
  sectionType?: 'featured' | 'normal'
  isHighlighted?: boolean
  title?: string
  sections?: Section[]
}

/* This is only used for index pages.
 * The reason we have a preview component for such a small part of the page
 * is so we can preview content from different datasets!
 * Take this approach with a grain of salt, we haven't tested it at scale.
 */
export function PreviewReviewPreview({
  brandName,
  slug,
  token,
  sectionType,
  isHighlighted,
  title,
  sections,
}: Props) {
  const review: Review = useReviewPreview(token, reviewQuery, {
    slug,
  })
  //for our urlBuilder logic, mark which dataset this is
  //please do this better later
  //@ts-ignore
  review.mainImage.image.asset._dataset = reviewConfig.sanity.dataset

  const props = {
    ...review,
    brandName,
    sectionType,
    isHighlighted,
    title: title || review.title,
    sections,
  }

  return <ArticlePreview {...props} />
}

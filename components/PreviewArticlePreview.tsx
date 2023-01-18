'use client'
import * as React from 'react'

import {indexQuery} from '../lib/queries'
import {usePreview} from '../lib/sanity.preview'
import {getBrandName} from '../utils/brand'
import MoreStories from './MoreStories'

export default function PreviewM({brandName}: {brandName: string}) {
  const brand = brandName || getBrandName()
  const allArticles = usePreview(null, indexQuery, {brand})

  return <MoreStories articles={allArticles} brandName={brand} />
}

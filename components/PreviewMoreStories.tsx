'use client'
import * as React from 'react'

import {indexQuery} from '../lib/queries'
import {usePreview} from '../lib/sanity.preview'
import MoreStories from './MoreStories'

interface Props {
  token: string
  brand: string
}

export default function PreviewMoreStories({token, brand}: Props) {
  const allArticles = usePreview(token, indexQuery, {brand})

  return <MoreStories articles={allArticles} brandName={brand} token={token} />
}

'use client'

import {usePreview} from '../lib/sanity.preview'
import MoreStories from './more-stories'
import { indexQuery } from '../lib/queries'

export default function PreviewMoreStories() {
  const {data: allArticles} = usePreview(null, indexQuery)
  return <MoreStories articles={allArticles}/>
}
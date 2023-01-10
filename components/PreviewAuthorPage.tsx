'use client'
import * as React from 'react'

import {personBySlugQuery} from '../lib/queries'
import {usePreview} from '../lib/sanity.preview'
import AuthorPage from './AuthorPage'

export default function PreviewAuthorPage({
  slug,
  token,
}: {
  slug: string
  token: string
}) {
  const author = usePreview(token, personBySlugQuery, {slug})
  return <AuthorPage author={author} />
}

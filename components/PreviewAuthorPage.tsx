'use client'
import * as React from 'react'

import {personBySlugQuery} from '../lib/queries'
import {usePreview} from '../lib/sanity.preview'
import AuthorPage from './AuthorPage'

export default function PreviewAuthorPage({slug}: {slug: string}) {
  const author = usePreview(null, personBySlugQuery, {slug})
  return <AuthorPage author={author} />
}

'use client'
import * as React from 'react'

import {sectionBySlugQuery} from '../lib/queries'
import {usePreview} from '../lib/sanity.preview'
import SectionPage from './SectionPage'

export default function PreviewSectionPage({
  slug,
  brand,
}: {
  slug: string
  brand: string
}) {
  const section = usePreview(null, sectionBySlugQuery, {
    slug,
    brand,
  })
  return <SectionPage section={section} />
}

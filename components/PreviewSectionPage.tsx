'use client'

import { sectionBySlugQuery } from '../lib/queries'
import { usePreview } from '../lib/sanity.preview'
import { getBrandName } from '../utils/brand'
import SectionPage from './SectionPage'

export default function PreviewSectionPage({ slug }: { slug: string }) {
  const section = usePreview(null, sectionBySlugQuery, {
    slug,
    brand: getBrandName(),
  })
  return <SectionPage section={section} />
}

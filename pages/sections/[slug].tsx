import {config} from 'lib/config'
import {GetStaticProps} from 'next'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'
import {PreviewSuspense} from 'next-sanity/preview'
import {lazy} from 'react'
import * as React from 'react'

import SectionPage from '../../components/SectionPage'
import Title from '../../components/Title'
import {sectionBySlugQuery, sectionSlugsQuery} from '../../lib/queries'
import {getClient, overlayDrafts} from '../../lib/sanity.server'
import {Article} from '../../types'
import {getBrandName} from '../../utils/brand'

const PreviewSectionPage = lazy(
  () => import('../../components/PreviewSectionPage')
)

interface Props {
  data: {articles: Article[]; name: string; slug?: string}
  preview: any
}

export default function Section(props: Props) {
  const {data, preview} = props
  const router = useRouter()

  const slug = data?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  if (router.isFallback) {
    return <Title>Loading…</Title>
  }

  if (preview && slug) {
    return (
      <PreviewSuspense fallback={<SectionPage section={data} />}>
        <PreviewSectionPage slug={slug} />
      </PreviewSuspense>
    )
  }

  return <SectionPage section={data} />
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const section = await getClient(preview).fetch(sectionBySlugQuery, {
    slug: params?.slug,
    brand: getBrandName(),
  })
  return {
    props: {
      preview,
      data: {
        ...section,
        articles: overlayDrafts(section?.articles),
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: config.revalidateSecret ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await getClient(false).fetch(sectionSlugsQuery)
  return {
    paths: paths.map((slug: string) => ({params: {slug}})),
    fallback: true,
  }
}

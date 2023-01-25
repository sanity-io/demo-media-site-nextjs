import Layout from 'components/Layout'
import {config} from 'lib/config'
import {GetStaticProps} from 'next'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'
import {PreviewSuspense} from 'next-sanity/preview'
import {lazy, ReactElement} from 'react'
import * as React from 'react'

import ArticlePage from '../../../components/ArticlePage'
import LayoutLifestyle from '../../../components/LayoutLifestyle'
import Title from '../../../components/Title'
import {articleQuery, articleSlugsQuery} from '../../../lib/queries'
import {getClient, overlayDrafts} from '../../../lib/sanity.server'
import {Article} from '../../../types'

const PreviewArticlePage = lazy(
  () => import('../../../components/PreviewArticlePage')
)

interface Props {
  data: {article: Article; moreArticles: any}
  previewData?: {token?: string}
}

export default function ArticleRoute(props: Props) {
  const {data, previewData} = props
  const article = data?.article
  const router = useRouter()

  const slug = article?.slug
  const brand = article?.brand ?? 'tech'

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  if (router.isFallback) {
    return <Title>Loading…</Title>
  }

  if (slug && previewData?.token) {
    return (
      <PreviewSuspense fallback={<ArticlePage article={article} />}>
        <PreviewArticlePage
          slug={slug}
          brand={brand}
          token={previewData.token}
        />
      </PreviewSuspense>
    )
  }

  return <ArticlePage article={article} />
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData = {},
}) => {
  const {article, moreArticles} = await getClient(preview).fetch(articleQuery, {
    slug: params?.slug,
    brand: params?.brand,
  })

  return {
    props: {
      previewData,
      data: {
        article,
        moreArticles: overlayDrafts(moreArticles),
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: config.revalidateSecret ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await getClient(false).fetch(articleSlugsQuery)
  return {
    paths: paths.map(({brand, slug}: {brand: string; slug: string}) => ({
      params: {slug, brand},
    })),
    fallback: true,
  }
}

ArticleRoute.getLayout = function getLayout(page: ReactElement) {
  const {data, preview} = page?.props
  if (data?.article?.brand == 'lifestyle') {
    return <LayoutLifestyle preview={preview}>{page}</LayoutLifestyle>
  }
  return <Layout preview={preview}>{page}</Layout>
}

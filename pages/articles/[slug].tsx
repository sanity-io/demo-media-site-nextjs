import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { PreviewSuspense } from 'next-sanity/preview'
import { lazy } from 'react'

import ArticlePage from '../../components/ArticlePage'
import Title from '../../components/Title'
import {
  articleQuery,
  articleSlugsQuery,
  settingsQuery,
} from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { ArticleProps } from '../../types'

const PreviewArticlePage = lazy(
  () => import('../../components/PreviewArticlePage')
)

interface Props {
  data: { article: ArticleProps; moreArticles: any }
  preview: any
  globalSettings: any
}

export default function Article(props: Props) {
  const { data, preview } = props
  const article = data?.article
  const router = useRouter()

  const slug = article?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  if (router.isFallback) {
    return <Title>Loading…</Title>
  }

  if (preview) {
    return (
      <PreviewSuspense fallback={<ArticlePage article={article} />}>
        <PreviewArticlePage slug={slug} />
      </PreviewSuspense>
    )
  }

  return <ArticlePage article={article} />
}

export async function getStaticProps({ params, preview = false }) {
  const { article, moreArticles } = await getClient(preview).fetch(
    articleQuery,
    {
      slug: params.slug,
    }
  )
  const globalSettings = await getClient(preview).fetch(settingsQuery)

  return {
    props: {
      preview,
      data: {
        article,
        moreArticles: overlayDrafts(moreArticles),
      },
      globalSettings,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await getClient(false).fetch(articleSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}

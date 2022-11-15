import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import MoreStories from '../../components/more-stories'
import ArticleBody from '../../components/article-body'
import ArticleHeader from '../../components/article-header'
import ArticleTitle from '../../components/article-title'
import SectionSeparator from '../../components/section-separator'
import { articleQuery, articleSlugsQuery, settingsQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { ArticleProps } from '../../types'
import { NextSeo } from 'next-seo'

function openGraphObjectFromDocument(document: any) {
  // article.mainImage?.image?.asset?._ref
  return {
    title: document.title,
    //description: document.description,
    // url: document.url,
    type: 'article',
    images: document.mainImage?.image?.asset?._ref
      ? [
          {
            url: urlForImage(document.mainImage.image)
              .width(1200)
              .height(627)
              .fit('crop')
              .url(),
          },
        ]
      : undefined,
  }
}

interface Props {
  data: { article: ArticleProps; moreArticles: any }
  preview: any
  globalSettings: any
}

export default function Article(props: Props) {
  const { data: initialData, preview, globalSettings } = props
  const router = useRouter()

  const slug = initialData?.article?.slug
  const { data } = usePreviewSubscription(articleQuery, {
    params: { slug },
    initialData: initialData,
    enabled: preview && !!slug,
  })
  const { article, moreArticles } = data || {}

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
      <Container>
        <NextSeo title={article?.title} openGraph={article ? openGraphObjectFromDocument(article) : undefined} />
        {router.isFallback ? (
          <ArticleTitle>Loading…</ArticleTitle>
        ) : (
          <>
            <article>
              <ArticleHeader
                title={article.title}
                mainImage={article.mainImage}
                date={article.date}
                people={article.people}
                sections={article.sections}
              />
              <ArticleBody content={article.content} people={article.people} />
            </article>
          </>
        )}
      </Container>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { article, moreArticles } = await getClient(preview).fetch(articleQuery, {
    slug: params.slug,
  })
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

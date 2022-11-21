import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import ArticleTitle from '../../components/article-title'
import Container from '../../components/container'
import {
  articleQuery,
  articleSlugsQuery,
  settingsQuery,
} from '../../lib/queries'
import { urlForImage } from '../../lib/sanity'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { ArticleProps } from '../../types'
import Article from '../../components/Article'
import { PreviewSuspense } from 'next-sanity/preview'
import PreviewArticle from '../../components/PreviewArticle'

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

export default function ArticlePage(props: Props) {
  const { data: {article}, preview, globalSettings } = props
  const router = useRouter()

  const slug = article?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Container>
      <NextSeo
        title={article?.title}
        openGraph={article ? openGraphObjectFromDocument(article) : undefined}
      />
      {router.isFallback ? (
        <ArticleTitle>Loading…</ArticleTitle>
      ) : ( preview ? (
        <PreviewSuspense fallback="Loading...">
          <PreviewArticle />
        </PreviewSuspense>
        ): (<Article article={article} />)
      )
      }
    </Container>
  )
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

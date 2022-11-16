import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import ArticleTitle from '../../components/article-title'
import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import { personBySlugQuery, sectionSlugsQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { ArticleProps } from '../../types'

function openGraphObjectFromDocument(document: any) {
  // section.mainImage?.image?.asset?._ref
  return {
    title: document.name,
    //description: document.description,
    // url: document.url,
    // type: 'article',
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
  data: { articles: ArticleProps[]; name?: string; slug?: string }
  preview: any
  globalSettings: any
}

export default function Author(props: Props) {
  const { data: initialData, preview } = props
  const router = useRouter()

  const slug = initialData?.slug
  const { data } = usePreviewSubscription(personBySlugQuery, {
    params: { slug },
    initialData: initialData,
    enabled: preview && !!slug,
  })
  const { articles, name } = data || {}

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Container>
      <NextSeo
        title={name}
        openGraph={name ? openGraphObjectFromDocument({ name }) : undefined}
      />
      {router.isFallback ? (
        <ArticleTitle>Loading…</ArticleTitle>
      ) : (
        <div className="">
          <div className="m-auto max-w-5xl p-4 md:p-5 lg:p-6">
            <ArticleTitle>{name}</ArticleTitle>
          </div>
          {articles?.length > 0 && <MoreStories articles={articles} />}
        </div>
      )}
    </Container>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const person = await getClient(preview).fetch(personBySlugQuery, {
    slug: params.slug,
  })
  return {
    props: {
      preview,
      data: {
        ...person,
        articles: overlayDrafts(person?.articles),
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await getClient(false).fetch(sectionSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}

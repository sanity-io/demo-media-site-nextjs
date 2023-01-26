import ArticleIndex from 'components/ArticleIndex'
import {ArticleIndexLifestyle} from 'components/ArticleIndexLifestyle'
import Container from 'components/Container'
import Layout from 'components/Layout'
import LayoutLifestyle from 'components/LayoutLifestyle'
import {config} from 'lib/config'
import {indexQuery} from 'lib/queries'
import {getClient, overlayDrafts} from 'lib/sanity.server'
import {GetStaticPaths, GetStaticProps} from 'next'
// import {PreviewSuspense} from 'next-sanity/preview'
import {NextSeo} from 'next-seo'
import * as React from 'react'
import {Article, Review} from 'types'

interface IndexProps {
  data: {
    allArticles: (Article | Review)[]
    brand: string
  }
  previewData?: {token?: string}
}
export default function Index({data, previewData}: IndexProps) {
  const metadata =
    data?.brand === config.lifestyleBrand
      ? {
          title: 'Latest Lifestyle News, Trends & Tips | STREETREADY',
          description:
            'STREETREADY delivers the biggest moments, the hottest trends, and the best tips in entertainment, fashion, beauty, fitness, and food and the ability to shop for it all in one place.',
        }
      : {
          title: 'Latest Tech News',
        }

  return (
    <>
      <NextSeo title={metadata.title} description={metadata?.description} />
      <Container>
        {data?.brand === config.lifestyleBrand ? (
          <ArticleIndexLifestyle
            articles={data?.allArticles}
            token={previewData?.token}
          />
        ) : (
          <ArticleIndex
            articles={data?.allArticles}
            token={previewData?.token}
          />
        )}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData = {},
}) => {
  if (config.sanity.projectId) {
    const brand = params?.brand ?? 'tech'
    const fetchedArticles = await getClient(preview).fetch(indexQuery, {brand})
    const allArticles = overlayDrafts(fetchedArticles) ?? []

    return {
      props: {
        previewData,
        preview,
        data: {
          allArticles,
          brand,
        },
        // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
      },
      revalidate: config.revalidateSecret ? undefined : 60,
    }
  }

  /* when the client isn't set up */
  return {
    props: {},
    revalidate: undefined,
  }
}

Index.getLayout = function getLayout(page: React.ReactElement) {
  const {preview, brand} = page?.props
  if (brand == 'lifestyle') {
    return <LayoutLifestyle preview={preview}>{page}</LayoutLifestyle>
  }
  return <Layout preview={preview}>{page}</Layout>
}

export const getStaticPaths: GetStaticPaths = () => {
  const brand = config.brand
  const lifestyleBrand = config.lifestyleBrand
  return {
    paths: [{params: {brand: brand}}, {params: {brand: lifestyleBrand}}],
    fallback: true,
  }
}

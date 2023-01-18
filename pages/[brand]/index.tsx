import Container from 'components/Container'
import Layout from 'components/Layout'
import LayoutLifestyle from 'components/LayoutLifestyle'
import MoreStories from 'components/MoreStories'
import {config} from 'lib/config'
import {indexQuery} from 'lib/queries'
import {getClient, overlayDrafts} from 'lib/sanity.server'
import {GetStaticPaths, GetStaticProps} from 'next'
import {NextSeo} from 'next-seo'
import * as React from 'react'
import {Article, Review} from 'types'
import {isLifestyle} from 'utils/brand'

interface IndexProps {
  allArticles: (Article | Review)[]
  preview: boolean
  brand?: string
}
export default function Index({allArticles, preview, brand}: IndexProps) {
  const metadata = isLifestyle()
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
        <div className="">
          {/* live preview commented out here for demo day purposes, please do not uncomment!! */}
          {/* {preview ? (
            <PreviewSuspense fallback="Loading...">
              <PreviewMoreStories brandName={brand} />
            </PreviewSuspense>
          ) : ( */}
          <MoreStories articles={allArticles} brandName={brand} />
          {/* )} */}
        </div>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  /* check if the project id has been defined by fetching the vercel envs */
  if (config.sanity.projectId) {
    const allArticles = overlayDrafts(
      await getClient(preview).fetch(indexQuery, {
        brand: params?.brand ?? 'tech',
      })
    )

    return {
      props: {allArticles, preview, brand: params?.brand},
      // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
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

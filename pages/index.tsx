import { PreviewSuspense } from 'next-sanity/preview'
import { NextSeo } from 'next-seo'
import { lazy, useMemo } from 'react'

import Container from '../components/Container'
import MoreStories from '../components/MoreStories'
import { indexQuery, settingsQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { getBrandName, isLifestyle } from '../utils/brand'

const PreviewMoreStories = lazy(
  () => import('../components/PreviewMoreStories')
)

export default function Index({ allArticles, preview }) {
  const metadata = isLifestyle()
    ? {
        title: 'Latest Sugar',
        description:
          'POPSUGAR delivers the biggest moments, the hottest trends, and the best tips in entertainment, fashion, beauty, fitness, and food and the ability to shop for it all in one place.',
      }
    : {
        title: 'Latest Tech News',
      }

  return (
    <>
      <NextSeo title={metadata.title} description={metadata?.description} />
      <Container>
        <div className="">
          {preview ? (
            <PreviewSuspense fallback="Loading...">
              <PreviewMoreStories />
            </PreviewSuspense>
          ) : (
            <MoreStories articles={allArticles} />
          )}
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  /* check if the project id has been defined by fetching the vercel envs */
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const allArticles = overlayDrafts(
      await getClient(preview).fetch(indexQuery, {
        brand: getBrandName(),
      })
    )

    return {
      props: { allArticles, preview },
      // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
      revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    }
  }

  /* when the client isn't set up */
  return {
    props: {},
    revalidate: undefined,
  }
}

import Container from 'components/Container'
import MoreStories from 'components/MoreStories'
import { indexQuery } from 'lib/queries'
import { getClient, overlayDrafts } from 'lib/sanity.server'
import { GetStaticPaths } from 'next'
import { PreviewSuspense } from 'next-sanity/preview'
import { NextSeo } from 'next-seo'
import { lazy } from 'react'
import { ArticleProps } from 'types'
import { getBrandName, isLifestyle } from 'utils/brand'

const PreviewMoreStories = lazy(() => import('components/PreviewMoreStories'))

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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // we return no paths at build time.
    // paths will be revalidated once built.
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ preview = false, params }) {
  const variant = (params.variant as string[]) || []

  /* check if the project id has been defined by fetching the vercel envs */
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const rawArticles = overlayDrafts(
      await getClient(preview).fetch(indexQuery, {
        brand: getBrandName(),
      })
    ) as ArticleProps[]

    // given a url like /a:1/b:2/c:3, split it out into {a:"1", b:"2", c:"3"}
    const variantMap = variant
      .map((variantParam) => variantParam.split(':'))
      .reduce((prev, current) => {
        prev[current[0]] = current[1]
        return prev
      }, {})

    const allArticles = rawArticles.map((rawArticle) => {
      const { variations, ...article } = rawArticle

      const variantToShow = variantMap[article._id]

      if (variations && variantToShow) {
        // variantToShow may be 'fallback', which is fine as we can just spread undefined below
        const variantValues = variations.find(
          (variant) => variant._key === variantToShow
        )

        return {
          ...article,
          ...variantValues,
        }
      }

      return article
    })

    return {
      props: { allArticles, preview },
      // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
      revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    }
  }

  /* when the client isn't set up */
  // TODO: why do this? Shouldn't the client just query the public APICDN?
  return {
    props: {},
    revalidate: undefined,
  }
}

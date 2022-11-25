import Container from 'components/Container'
import MoreStories from 'components/MoreStories'
import PreviewMoreStories from 'components/PreviewMoreStories'
import { indexQuery, settingsQuery } from 'lib/queries'
import { getClient, overlayDrafts } from 'lib/sanity.server'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PreviewSuspense } from 'next-sanity/preview'
import { NextSeo } from 'next-seo'
import { ArticleProps } from 'types'

interface IndexProps {
  allArticles: ArticleProps[],
  preview: boolean,
  blogSettings: any
}

export default function Index({ allArticles, preview, blogSettings }: IndexProps) {
  const { title = 'Media.' } = blogSettings || {}

  return (
    <>
      <NextSeo title={title} />
      <Container>
        {/*{heroArticle && (
          <HeroPost
            title={heroArticle.title}
            mainImage={heroArticle.mainImage}
            date={heroArticle.date}
            people={heroArticle.people}
            slug={heroArticle.slug}
            excerpt={heroArticle.excerpt}
          />
        )}*/}
        <div className="">
          {allArticles.length > 0 && preview ? (
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
    fallback: 'blocking'
  }
}

/**
 * We take a url with parameters for which variants to show.
 * This lets us build different URLs for different collections of documents
 * the pattern is:
 * /docId:variantId/docId:variantId/docId:variantId
 * 
 * If no parameters are provided, we just get the regular list
 */
export const getStaticProps: GetStaticProps<IndexProps> = async ({ preview = false, params }) => {
  const variant = params.variant as string[] || []

  /* check if the project id has been defined by fetching the vercel envs */
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const rawArticles = overlayDrafts(
      await getClient(preview).fetch(indexQuery)
    ) as ArticleProps[]
    const blogSettings = await getClient(preview).fetch(settingsQuery)

    // given a url like /a:1/b:2/c:3, split it out into {a:"1", b:"2", c:"3"}
    const variantMap = variant.map(variantParam => variantParam.split(':')).reduce((prev, current) => {
      prev[current[0]] = current[1]
      return prev
    }, {})

    const allArticles = rawArticles.map(rawArticle => {
      const {variations, ...article} = rawArticle
      
      const variantToShow = variantMap[article._id]

      if (variations && variantToShow) {
        const variantValues = variations.find(variant => variant._key === variantToShow)

        return {
          ...article,
          ...variantValues
        }
      }

      return article
    })

    return {
      props: { allArticles, preview, blogSettings },
      // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
      revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    }
  }

  /* when the client isn't set up */
  // TODO: why do this? Shouldn't the clinet just query the public APICDN?
  return {
    props: {
      allArticles: [],
      preview: false,
      blogSettings: undefined,
    },
    revalidate: 60,
  }
}
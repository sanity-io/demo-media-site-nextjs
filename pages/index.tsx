import { PreviewSuspense } from 'next-sanity/preview'
import { NextSeo } from 'next-seo'

import Container from '../components/Container'
import MoreStories from '../components/MoreStories'
import PreviewMoreStories from '../components/PreviewMoreStories'
import { indexQuery, settingsQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'

export default function Index({ allArticles, preview, blogSettings }) {
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

export async function getStaticProps({ preview = false }) {
  /* check if the project id has been defined by fetching the vercel envs */
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const allArticles = overlayDrafts(
      await getClient(preview).fetch(indexQuery)
    )
    const blogSettings = await getClient(preview).fetch(settingsQuery)

    return {
      props: { allArticles, preview, blogSettings },
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

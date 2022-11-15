import Head from 'next/head'

import BlogHeader from '../components/blog-header'
import Container from '../components/container'
import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import MoreStories from '../components/more-stories'
import { indexQuery, settingsQuery } from '../lib/queries'
import { usePreviewSubscription } from '../lib/sanity'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { NextSeo } from 'next-seo'

export default function Index({
                                allArticles: initialAllArticles,
                                preview,
                                blogSettings
                              }) {
  const { data: allArticles } = usePreviewSubscription(indexQuery, {
    initialData: initialAllArticles,
    enabled: preview
  })
  const articles = allArticles || []
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
          {articles.length > 0 && <MoreStories articles={articles} />}
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  /* check if the project id has been defined by fetching the vercel envs */
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const allArticles = overlayDrafts(await getClient(preview).fetch(indexQuery))
    const blogSettings = await getClient(preview).fetch(settingsQuery)

    return {
      props: { allArticles, preview, blogSettings },
      // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
      revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60
    }
  }

  /* when the client isn't set up */
  return {
    props: {},
    revalidate: undefined
  }
}

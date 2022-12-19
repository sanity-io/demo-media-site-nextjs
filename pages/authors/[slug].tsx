import {config} from 'lib/config'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'
import {PreviewSuspense} from 'next-sanity/preview'
import {lazy} from 'react'
import * as React from 'react'

import AuthorPage from '../../components/AuthorPage'
import Title from '../../components/Title'
import {personBySlugQuery, personSlugsQuery} from '../../lib/queries'
import {getClient, overlayDrafts} from '../../lib/sanity.server'
import {AuthorProps} from '../../types'

const PreviewAuthorPage = lazy(
  () => import('../../components/PreviewAuthorPage')
)

interface Props {
  data: AuthorProps
  preview: any
}

export default function Author(props: Props) {
  const {data, preview} = props
  const router = useRouter()

  const slug = data?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  if (router.isFallback) {
    return <Title>Loading…</Title>
  }

  if (preview) {
    return (
      <PreviewSuspense fallback={<AuthorPage author={data} />}>
        <PreviewAuthorPage slug={slug} />
      </PreviewSuspense>
    )
  }

  return <AuthorPage author={data} />
}

export async function getStaticProps({params, preview = false}) {
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
    revalidate: config.revalidateSecret ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await getClient(false).fetch(personSlugsQuery)
  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}

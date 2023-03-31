import {config} from 'lib/config'
import {NextSeo} from 'next-seo'
import * as React from 'react'

import openGraphObjectFromDocument from '../lib/openGraphObjectFromDocument'
import {Article} from '../types'
import Body from './Body'
import Container from './Container'
import {PeopleProvider} from './Credits'
import Header from './Header'

interface ArticlePageProps {
  article?: Article
}

const createCanonicalUrl = (article: Article) => {
  const url =
    config.env === 'production'
      ? 'https://demo-media-site-nextjs.sanity.build'
      : 'http://localhost:3000'
  const {brand, slug} = article
  return `${url}/${brand}/articles/${slug}`
}

export default function ArticlePage({article}: ArticlePageProps) {
  return (
    <Container>
      <NextSeo
        title={article?.title}
        openGraph={article ? openGraphObjectFromDocument(article) : undefined}
        canonical={article ? createCanonicalUrl(article) : undefined}
      />
      <article className="pb-4 md:pb-6">
        <PeopleProvider people={article?.people ?? []}>
          <Header
            title={article?.title || ''}
            intro={article?.intro}
            mainImage={article?.mainImage}
            sections={article?.sections}
            brand={article?.brand}
          />
          <Body
            date={article?.date}
            content={article?.content}
            people={article?.people}
            brand={article?.brand}
          />
        </PeopleProvider>
      </article>
    </Container>
  )
}

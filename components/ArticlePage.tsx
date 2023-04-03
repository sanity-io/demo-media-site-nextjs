import * as React from 'react'

import {Article} from '../types'
import Body from './Body'
import Container from './Container'
import {PeopleProvider} from './Credits'
import Header from './Header'
import {Seo} from './Seo'

interface ArticlePageProps {
  article?: Article
}

export default function ArticlePage({article}: ArticlePageProps) {
  return (
    <Container>
      {article && <Seo doc={article} />}
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

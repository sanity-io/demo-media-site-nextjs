import { NextSeo } from 'next-seo'

import openGraphObjectFromDocument from '../lib/openGraphObjectFromDocument'
import { ArticleProps } from '../types'
import Body from './Body'
import Container from './Container'
import Header from './Header'

interface ArticleComponentProps {
  article?: ArticleProps
}

export default function ArticlePage({ article }: ArticleComponentProps) {
  return (
    <Container>
      <NextSeo
        title={article?.title}
        openGraph={article ? openGraphObjectFromDocument(article) : undefined}
      />
      <article className="pb-4 md:pb-6">
        <Header
          title={article?.title}
          intro={article?.intro}
          mainImage={article?.mainImage}
          sections={article?.sections}
          brand={article?.brand}
        />
        <Body
          content={article?.content}
          people={article?.people}
          brand={article?.brand}
        />
      </article>
    </Container>
  )
}

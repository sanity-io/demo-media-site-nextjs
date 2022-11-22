import { NextSeo } from 'next-seo'

import openGraphObjectFromDocument from '../lib/openGraphObjectFromDocument'
import { ArticleProps } from '../types'
import ArticleBody from './article-body'
import ArticleHeader from './article-header'
import Container from './container'

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
        <ArticleHeader
          title={article?.title}
          mainImage={article?.mainImage}
          date={article?.date}
          people={article?.people}
          sections={article?.sections}
        />
        <ArticleBody content={article?.content} people={article?.people} />
      </article>
    </Container>
  )
}

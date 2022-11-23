import { NextSeo } from 'next-seo'

import openGraphObjectFromDocument from '../lib/openGraphObjectFromDocument'
import { ArticleProps } from '../types'
import ArticleBody from './article-body'
import ArticleTitle from './article-title'
import Container from './container'
import MoreStories from './more-stories'

interface AuthorPageProps {
  author: {
    name?: string
    slug?: string
    bio?: any
    mainImage?: any
    articles: ArticleProps[]
  }
}

export default function AuthorPage({ author }: AuthorPageProps) {
  const { name, bio, articles } = author || {}
  return (
    <Container>
      <NextSeo
        title={name}
        openGraph={name ? openGraphObjectFromDocument({ name }) : undefined}
      />
      <div className="m-auto max-w-5xl p-4 md:p-5 lg:p-6">
        <ArticleTitle>{name}</ArticleTitle>
        {bio && (
          <div className="">
            <ArticleBody content={bio} />
          </div>
        )}
      </div>
      {articles?.length > 0 && <MoreStories articles={articles} />}
    </Container>
  )
}

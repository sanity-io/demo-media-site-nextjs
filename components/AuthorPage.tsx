import { NextSeo } from 'next-seo'

import openGraphObjectFromDocument from '../lib/openGraphObjectFromDocument'
import { ArticleProps } from '../types'
import Body from './Body'
import Container from './Container'
import MoreStories from './MoreStories'
import Title from './Title'

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
        <Title>{name}</Title>
        {bio && (
          <div className="">
            <Body content={bio} />
          </div>
        )}
      </div>
      {articles?.length > 0 && <MoreStories articles={articles} />}
    </Container>
  )
}

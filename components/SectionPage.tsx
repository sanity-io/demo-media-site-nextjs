import { NextSeo } from 'next-seo'

import openGraphObjectFromDocument from '../lib/openGraphObjectFromDocument'
import ArticleTitle from './article-title'
import Container from './container'
import MoreStories from './more-stories'

export default function SectionPage({ section }) {
  const { name, articles } = section || {}

  return (
    <Container>
      <NextSeo
        title={name}
        openGraph={name ? openGraphObjectFromDocument({ name }) : undefined}
      />
      <div className="">
        <div className="m-auto max-w-5xl p-4 md:p-5 lg:p-6">
          <ArticleTitle>{name}</ArticleTitle>
        </div>
        {articles?.length > 0 && <MoreStories articles={articles} />}
      </div>
    </Container>
  )
}

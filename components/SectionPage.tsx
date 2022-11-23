import { NextSeo } from 'next-seo'

import openGraphObjectFromDocument from '../lib/openGraphObjectFromDocument'
import Container from './Container'
import MoreStories from './MoreStories'
import Title from './Title'

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
          <Title>{name}</Title>
        </div>
        {articles?.length > 0 && <MoreStories articles={articles} />}
      </div>
    </Container>
  )
}

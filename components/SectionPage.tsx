import { NextSeo } from 'next-seo'

import openGraphObjectFromDocument from '../lib/openGraphObjectFromDocument'
import { isLifestyle } from '../utils/brand'
import Container from './Container'
import MoreStories from './MoreStories'
import Title, { TitleLifeStyle } from './Title'

const isLifestyleBrand = () => isLifestyle()

export default function SectionPage({ section }) {
  const { name, articles } = section || {}

  if (isLifestyleBrand()) {
    return (
      <Container>
        <TitleLifeStyle>{name}</TitleLifeStyle>
        <MoreStories articles={articles} />
      </Container>
    )
  }

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

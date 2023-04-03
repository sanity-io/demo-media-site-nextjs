import * as React from 'react'

import {Author} from '../types'
import Body from './Body'
import Container from './Container'
import MoreStories from './MoreStories'
import {Seo} from './Seo'
import Title from './Title'

export default function AuthorPage({author}: {author: Author}) {
  const {name, bio, articles} = author || {}
  return (
    <Container>
      <Seo doc={author} />
      <div className="m-auto max-w-5xl p-4 md:p-5 lg:p-6">
        <Title>{name}</Title>
        {bio && <Body content={bio} />}
      </div>
      {articles && articles?.length > 0 && (
        <MoreStories articles={articles || []} />
      )}
    </Container>
  )
}

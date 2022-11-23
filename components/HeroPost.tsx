import Link from 'next/link'

import { ArticleProps } from '../types'
import { getUrlForDocumentType } from '../utils/routing'
import Avatar from './Avatar'
import CoverImage from './CoverImage'
import Date from './Date'

export default function HeroPost(props: ArticleProps) {
  const { title, mainImage, date, intro, people, slug } = props
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage slug={slug} title={title} image={mainImage} priority />
      </div>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
            <Link
              href={getUrlForDocumentType('article', slug)}
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="mb-4 text-lg leading-relaxed">{intro}</p>
          {/*{people && <Avatar name={author.name} picture={author.picture} />}*/}
        </div>
      </div>
    </section>
  )
}

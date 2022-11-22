/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ReactPlayer from 'react-player'

import { urlForImage } from '../lib/sanity'
import { ArticleProps, MainImage } from '../types'
import { getUrlForDocumentType } from '../utils/routing'
import { Figure } from './figure'

const components = {
  types: {
    article: ({ value }) => {
      const { title, slug } = value
      const url = getUrlForDocumentType('article', slug)
      return (
        <div className="text-black">
          <p className="p-4 border border-gray-200 border-gray-900 dark">
            <span className="font-bold">Read more:</span>{' '}
            <Link href={url} className="no-underline hover:underline">
              {title}
            </Link>
          </p>
        </div>
      )
    },
    mainImage: ({ value }: { value: MainImage }) => {
      const { image, caption, alt } = value
      return (
        <Figure
          caption={caption}
          img={
            <Image
              className="block aspect-[4/2]"
              alt={alt}
              src={urlForImage(image).height(1000).width(2000).url()}
              width={2000}
              height={1000}
              style={{ objectFit: 'cover' }}
            />
          }
        />
      )
    },
    video: ({ value }) => {
      const { url } = value
      return <ReactPlayer url={url} />
    },
  },
}

export default function ArticleBody({
  content,
  people,
}: {
  content: any
  people?: any
}) {
  return (
    <div className="max-w-5xl p-4 m-auto md:p-5 lg:p-6">
      {people && <Credits people={people} />}

      <div
        className={
          'my-4 max-w-2xl font-serif text-lg leading-relaxed md:text-xl md:leading-relaxed'
        }
      >
        {/* @TODO: override wrappers for p tags so we get decent spacing
        @TODO: ensure h1s, h2s, h3s, etc. are styled correctly */}
        <PortableText
          value={content}
          components={components}
          onMissingComponent={(message, options) => {
            console.error(message, {
              // eg `someUnknownType`
              type: options.type,

              // 'block' | 'mark' | 'blockStyle' | 'listStyle' | 'listItemStyle'
              nodeType: options.nodeType,
            })
          }}
        />
      </div>
    </div>
  )
}

function Credits({ people }: { people: ArticleProps['people'] }) {
  return (
    <div className="max-w-2xl pb-3 mt-4 mb-4 text-sm border-b border-gray-200 dark:border-gray-900 sm:text-lg md:mt-auto md:pb-4 md:text-xl">
      <span
        data-after=" ● "
        className="after:inline after:content-[attr(data-after)]"
      >
        Oct 25, 2022
      </span>
      {people?.length &&
        people.map((person, index) => (
          <span
            key={index}
            data-after=" ● "
            className="after:inline after:content-[attr(data-after)] last:after:hidden"
          >
            <Link href={getUrlForDocumentType('person', person?.slug)}>
              {person.name}
            </Link>
          </span>
        ))}
    </div>
  )
}

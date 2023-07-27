/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import {PortableText, PortableTextMarkComponentProps} from '@portabletext/react'
import {config} from 'lib/config'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import {logError} from 'utils/logError'

import {urlForImage} from '../lib/sanity'
import {Article, MainImage} from '../types'
import {getUrlForDocumentType} from '../utils/routing'
import {Credits, PeopleList, usePeople} from './Credits'
import {Figure} from './Figure'

const ReactPlayer = dynamic(() => import('react-player'), {ssr: false})

type MediaNode = {
  _type: 'video' | 'podcast'
  url: string
}

const BodyImage = React.memo(function BodyImage({
  image,
  caption,
  alt,
}: MainImage) {
  const photographers = usePeople('photographer')
  const hasPhotographers = photographers && photographers.length > 0
  const separator =
    caption && photographers && photographers.length > 0 && ' ● '

  if (!image || !image?.asset) {
    return <div />
  }

  return (
    <Figure
      caption={
        <span className="font-sans [&_a]:no-underline [&_a]:hover:underline">
          {caption}
          {separator}
          {hasPhotographers && (
            <>
              Photo: <PeopleList people={photographers} />
            </>
          )}
        </span>
      }
      img={
        <Image
          className="block aspect-[4/2] w-full"
          alt={alt}
          src={urlForImage(image).height(1000).width(2000).url()}
          width={2000}
          height={1000}
          style={{objectFit: 'cover'}}
        />
      }
    />
  )
})

const components = {
  block: {
    normal: ({children}: {children?: React.ReactNode}) => {
      return <p className="my-4 max-w-prose">{children}</p>
    },
  },
  types: {
    article: ({value}: {value: Article}) => {
      const {title, slug} = value
      const url = getUrlForDocumentType('article', slug, value.brand)
      return (
        <div className="max-w-prose text-black">
          <p className="dark border border-gray-200 p-4 dark:border-gray-900">
            <span className="font-bold">Read more:</span>{' '}
            <Link href={url} className="no-underline hover:underline">
              {title}
            </Link>
          </p>
        </div>
      )
    },
    mainImage: ({value}: {value: MainImage}) => {
      return <BodyImage {...value} />
    },
    podcast: ({value}: {value: MediaNode}) => {
      const {url} = value
      return (
        <div>
          <ReactPlayer url={url} />
        </div>
      )
    },
    video: ({value}: {value: MediaNode}) => {
      const {url} = value
      return (
        <div className="-mx-4 aspect-video lg:-mx-6">
          <ReactPlayer url={url} width="100%" height="100%" />
        </div>
      )
    },
  },
  marks: {
    articleLink: ({children}: PortableTextMarkComponentProps) => {
      return <span>{children}</span>
    },
  },
}

export default function Body({
  date,
  content,
  people,
  brand,
}: {
  content: any
  date?: any
  people?: any
  brand?: 'tech' | 'lifestyle'
}) {
  const isLifestyle = brand === config.lifestyleBrand

  return (
    <div
      className={
        isLifestyle
          ? 'm-auto max-w-5xl p-4 pt-0 md:p-5 md:pt-0 lg:p-6 lg:pt-0'
          : 'm-auto max-w-5xl p-4 md:p-5 lg:p-6'
      }
    >
      {people && people.length && <Credits date={date} brandName={brand} />}

      <div
        className={
          'font-merriweather prose max-w-none font-serif text-lg leading-relaxed dark:prose-invert md:prose-lg lg:prose-xl md:text-xl md:leading-relaxed'
        }
      >
        <PortableText
          value={content}
          components={components}
          onMissingComponent={logError}
        />
      </div>
    </div>
  )
}

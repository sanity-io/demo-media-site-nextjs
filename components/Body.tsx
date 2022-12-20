/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import {PortableText} from '@portabletext/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import {logError} from 'utils/logError'

import {urlForImage} from '../lib/sanity'
import {ArticlePreviewProps, ArticleProps, MainImage} from '../types'
import {BRAND_LIFESTYLE_NAME, getBrandName} from '../utils/brand'
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
  const hasPhotographers = photographers.length > 0
  const separator = caption && photographers.length > 0 && ' ● '

  if (!image) {
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
          className="block aspect-[4/2]"
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
  types: {
    article: ({value}: {value: ArticleProps}) => {
      const {title, slug} = value
      const url = getUrlForDocumentType('article', slug)
      return (
        <div className="text-black">
          <p className="dark border border-gray-200 border-gray-900 p-4">
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
    reviewReference: ({value}: {value: ArticlePreviewProps}) => {
      const {title, slug} = value
      const url = getUrlForDocumentType('review', slug)
      /*
      console.log('slug', slug)
      console.log('url', url)
      */
      return (
        <div className="text-black">
          <p className="dark border border-gray-200 border-gray-900 p-4">
            <span className="font-bold">Read more:</span>{' '}
            <Link href={url} className="no-underline hover:underline">
              {title}
            </Link>
          </p>
        </div>
      )
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
        <div>
          <ReactPlayer url={url} />
        </div>
      )
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
  const brandName = brand || getBrandName()
  const isLifestyle = brandName === BRAND_LIFESTYLE_NAME
  /*
  const bodyClassNames = useMemo(() => {
    if (isLifestyle) {
      return 'prose mx-auto max-w-2xl prose-headings:font-bold prose-headings:tracking-tight prose-p:font-serif prose-p:leading-relaxed dark:prose-invert md:prose-lg lg:prose-xl'
    }
    return 'prose mx-auto max-w-2xl prose-headings:font-extrabold prose-headings:tracking-tight prose-p:font-normal prose-p:leading-relaxed dark:prose-invert md:prose-lg lg:prose-xl'
  }, [isLifestyle])
  */

  return (
    <div
      className={
        isLifestyle
          ? 'm-auto max-w-5xl p-4 pt-0 md:p-5 md:pt-0 lg:p-6 lg:pt-0'
          : 'm-auto max-w-5xl p-4 md:p-5 lg:p-6'
      }
    >
      {people && <Credits date={date} brandName={brandName} />}

      <div
        className={
          'prose mx-auto max-w-2xl prose-headings:font-bold prose-headings:tracking-tight prose-p:font-serif prose-p:leading-relaxed dark:prose-invert md:prose-lg lg:prose-xl'
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

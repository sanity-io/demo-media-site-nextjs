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
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'

import { urlForImage } from '../lib/sanity'
import { ArticlePreviewProps, ArticleProps, MainImage } from '../types'
import { BRAND_LIFESTYLE_NAME, getBrandName } from '../utils/brand'
import { getUrlForDocumentType } from '../utils/routing'
import { Figure } from './Figure'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const components = {
  types: {
    article: ({ value }) => {
      const { title, slug } = value
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
    reviewReference: ({ value }: { value: ArticlePreviewProps }) => {
      const { title, slug } = value
      const url = getUrlForDocumentType('review', slug)
      console.log('slug', slug)
      console.log('url', url)
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
    podcast: ({ value }) => {
      const { url } = value
      return (
        <div>
          <ReactPlayer url={url} />
        </div>
      )
    },
    video: ({ value }) => {
      const { url } = value
      return (
        <div>
          <ReactPlayer url={url} />
        </div>
      )
    },
  },
}

export default function Body({
  content,
  people,
  brand,
}: {
  content: any
  people?: any
  brand?: 'tech' | 'lifestyle'
}) {
  const brandName = brand || getBrandName()
  const isLifestyle = brandName === BRAND_LIFESTYLE_NAME
  const bodyClassNames = useMemo(() => {
    if (isLifestyle) {
      return 'prose mx-auto max-w-2xl prose-headings:font-bold prose-headings:tracking-tight prose-p:font-serif prose-p:leading-relaxed dark:prose-invert md:prose-lg lg:prose-xl'
    }
    return 'prose mx-auto max-w-2xl prose-headings:font-extrabold prose-headings:tracking-tight prose-p:font-normal prose-p:leading-relaxed dark:prose-invert md:prose-lg lg:prose-xl'
  }, [isLifestyle])

  return (
    <div
      className={
        isLifestyle
          ? 'm-auto max-w-5xl p-4 pt-0 md:p-5 md:pt-0 lg:p-6 lg:pt-0'
          : 'm-auto max-w-5xl p-4 md:p-5 lg:p-6'
      }
    >
      {people && <Credits people={people} brandName={brandName} />}

      <div
        className={
          'prose mx-auto max-w-2xl prose-headings:font-bold prose-headings:tracking-tight prose-p:font-serif prose-p:leading-relaxed dark:prose-invert md:prose-lg lg:prose-xl'
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

function Credits({
  people,
  brandName,
}: {
  people: ArticleProps['people']
  brandName?: string
}) {
  const isLifestyle = brandName === BRAND_LIFESTYLE_NAME
  if (isLifestyle) {
    const [firstPerson, _] = people

    return (
      <div className="sm:text-md mx-auto flex max-w-2xl justify-center pb-3 text-sm md:mb-4 md:pb-4 md:pb-5">
        <div className="flex items-center gap-2">
          {firstPerson?.image && (
            <div className="h-6 w-6 overflow-hidden rounded-full bg-purple-500">
              <Image
                className="block rounded-full"
                alt={firstPerson.name}
                src={urlForImage(firstPerson.image)
                  .height(100)
                  .width(100)
                  .url()}
                width={100}
                height={100}
              />
            </div>
          )}
          <div className="">
            <time dateTime={''}>November 25, 2022</time>
            <br />
            {firstPerson && (
              <span className="font-serif">
                <span className="italic">by </span>
                <span className="uppercase">
                  <Link
                    href={getUrlForDocumentType('person', firstPerson?.slug)}
                  >
                    {firstPerson.name}
                  </Link>
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-4 mb-4 max-w-2xl border-b border-gray-200 pb-3 text-sm dark:border-gray-900 sm:text-lg md:mt-auto md:pb-4 md:text-xl">
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

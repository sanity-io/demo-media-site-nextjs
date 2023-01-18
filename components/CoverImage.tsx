import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import {urlForImage} from '../lib/sanity'
import {getUrlForDocumentType} from '../utils/routing'

interface CoverImageProps {
  title: string
  className?: string
  wrapperClassName?: string
  aspectClass?: string
  slug?: string
  brand?: string
  image?: {
    alt?: string
    image: any
  }
  priority?: boolean
  width?: number
  height?: number
}

export default function CoverImage(props: CoverImageProps) {
  const {
    title,
    slug,
    brand,
    image: source,
    priority,
    className,
    wrapperClassName = '',
    aspectClass = 'aspect-[4/2] md:aspect-[3/2]',
    width,
    height,
  } = props
  const alt = source?.alt
  const image = source?.image?.asset?._ref ? (
    <div
      className={cn(aspectClass, {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
    >
      <Image
        className={cn('h-auto w-full object-cover', className)}
        width={width || 2000}
        height={height || 1000}
        alt={alt || title || 'Untitled'}
        src={urlForImage(source?.image)
          .height(height || 1000)
          .width(width || 2000)
          .url()}
        sizes="100vw"
        priority={priority}
      />
    </div>
  ) : (
    <div style={{paddingTop: '50%', backgroundColor: '#ddd'}} />
  )

  return (
    <div className={cn(wrapperClassName, 'sm:mx-0')}>
      {slug ? (
        <Link
          href={getUrlForDocumentType('article', slug, brand)}
          aria-label={title}
        >
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

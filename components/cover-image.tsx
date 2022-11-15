import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import { urlForImage } from '../lib/sanity'

interface CoverImageProps {
  title: string
  className?: string
  slug?: string
  image: {
    alt?: string
    image: any
  }
  priority?: boolean
}

export default function CoverImage(props: CoverImageProps) {
  const { title, slug, image: source, priority, className } = props
  const alt = source?.alt
  const image = source?.image?.asset?._ref ? (
    <div
      className={cn('aspect-[4/2] md:aspect-[3/2]', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
    >
      <Image
        className={cn('h-auto w-full', className)}
        width={2000}
        height={1000}
        alt={alt}
        src={urlForImage(source?.image).height(1000).width(2000).url()}
        sizes="100vw"
        priority={priority}
      />
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

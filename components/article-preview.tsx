import Link from 'next/link'

import { ArticleProps } from '../types'
import Avatar from './avatar'
import CoverImage from './cover-image'
import Date from './date'
import { PortableText } from '@portabletext/react'
import React from 'react'

export default function ArticlePreview({
                                         title,
                                         mainImage,
                                         date,
                                         intro,
                                         people,
                                         slug
                                       }: ArticleProps) {
  return (
    <div className='md:flex'>
      <div className='flex-1 p-2 md:w-1/2'>
        <CoverImage
          className='aspect-[4/2] md:aspect-[3/2]'
          slug={slug}
          title={title}
          image={mainImage}
          priority={false}
        />
      </div>
      <div className='flex flex-1 flex-col p-4 md:w-1/2'>
        <h1 className='mb-2 text-4xl font-extrabold leading-none tracking-tight md:text-5xl'>
          <Link href={`/articles/${slug}`} className='hover:underline'>
            {title}
          </Link>
        </h1>

        {intro && <div className='mt-3 font-serif text-lg leading-snug mb-4'>
          <PortableText value={intro} />
        </div>}

        <div className='mt-4 text-sm md:mt-auto'>
          <span data-after=" ● " className="after:inline after:content-[attr(data-after)]"><Date dateString={date} /></span>
          {people?.length && people.map((person, index) =>
            <span key={index} data-after=" ● " className="after:inline after:content-[attr(data-after)] last:after:hidden">{person.name}</span>)}
        </div>
      </div>
    </div>
  )
}

import { PortableText } from '@portabletext/react'
import cn from 'classnames'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

import { ArticleProps } from '../types'
import { isLifestyle } from '../utils/brand'
import { getUrlForDocumentType } from '../utils/routing'
import { randomValue, useRandom } from '../utils/useRandom'
import Avatar from './Avatar'
import CoverImage from './CoverImage'
import Date from './Date'

const isLifestyleBrand = isLifestyle()

const CATS = [
  'Superdrug',
  'Beauty',
  'Health',
  'Lifestyle',
  'Entertainment',
  'Fashion',
  'Christmas',
]

export default function ArticlePreview({
  title,
  mainImage,
  date,
  intro,
  people,
  isHighlighted,
  slug,
}: ArticleProps) {
  //const [randomCat, setRandomCat] = useState<string | number>()
  const randomCat = useRandom(CATS)

  //useEffect(() => setRandomCat(randomValue(CATS)), [])

  if (isLifestyleBrand) {
    const [firstPerson] = people
    const aspectClass = isHighlighted ? 'aspect-[6/2]' : 'aspect-square'
    const width = isHighlighted ? 2500 : 1000
    const height = isHighlighted ? 1000 : 1000
    return (
      <div
        className={cn('p-2', isHighlighted && 'col-span-4 grid grid-cols-4')}
      >
        <div
          className={cn(
            !isHighlighted && 'grid grid-cols-1 text-center',
            isHighlighted && 'col-span-3 text-left'
          )}
        >
          <CoverImage
            aspectClass={aspectClass}
            wrapperClassName="col-start-1 row-start-1"
            className={aspectClass}
            slug={slug}
            title={title}
            image={mainImage}
            priority={false}
            width={width}
            height={height}
          />
          {!isHighlighted && (
            <div className="col-start-1 row-start-1 self-end justify-self-center">
              <p className="inline-block w-8 bg-white p-2 text-center text-xs font-normal uppercase leading-5">
                {randomCat}
              </p>
            </div>
          )}
        </div>
        <div className={cn(isHighlighted && 'px-4 pt-2')}>
          {isHighlighted && (
            <div className="col-start-1 row-start-1 self-end justify-self-center">
              <p className="inline-block w-8 bg-white text-left text-xs font-normal uppercase leading-5">
                {randomCat}
              </p>
            </div>
          )}
          <h1
            className={cn(
              'mb-2 pt-2 font-serif text-black antialiased',
              !isHighlighted &&
                `text-xl leading-none tracking-tight md:text-xl`,
              isHighlighted && `text-left text-2xl`
            )}
          >
            <Link
              href={getUrlForDocumentType('article', slug)}
              className="hover:underline"
            >
              {title}
            </Link>
          </h1>

          <div className="mt-4 text-sm md:mt-auto">
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
    <div className="md:flex">
      <div className="flex-1 p-2 md:w-1/2">
        <CoverImage
          className="aspect-[4/2] md:aspect-[3/2]"
          slug={slug}
          title={title}
          image={mainImage}
          priority={false}
        />
      </div>
      <div className="flex flex-1 flex-col p-4 md:w-1/2">
        <h1 className="mb-2 text-4xl font-extrabold leading-none tracking-tight md:text-5xl">
          <Link
            href={getUrlForDocumentType('article', slug)}
            className="hover:underline"
          >
            {title}
          </Link>
        </h1>

        {intro && (
          <div className="mt-3 mb-4 font-serif text-lg leading-snug">
            <PortableText value={intro} />
          </div>
        )}

        <div className="mt-4 text-sm md:mt-auto">
          <span
            data-after=" ● "
            className="after:inline after:content-[attr(data-after)]"
          >
            <Date dateString={date} />
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
      </div>
    </div>
  )
}

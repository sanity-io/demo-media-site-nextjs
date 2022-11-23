import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import React from 'react'

import { ArticleProps } from '../types'
import { isLifestyle } from '../utils/brand'
import { getUrlForDocumentType } from '../utils/routing'
import Avatar from './Avatar'
import CoverImage from './CoverImage'
import Date from './Date'

const isLifestyleBrand = isLifestyle()

export default function ArticlePreview({
  title,
  mainImage,
  date,
  intro,
  people,
  slug,
}: ArticleProps) {
  if (isLifestyleBrand) {
    const [firstPerson] = people
    return (
      <div className="p-2">
        <div className="grid grid-cols-1">
          <CoverImage
            aspectClass='aspect-square'
            wrapperClassName="col-start-1 row-start-1"
            className="aspect-square"
            slug={slug}
            title={title}
            image={mainImage}
            priority={false}
            width={1000}
            height={1000}
          />
        <div className="col-start-1 row-start-1 self-end justify-self-center">
          <p className="bg-white p-2 inline-block font-normal text-xs leading-5 text-center uppercase w-8">Superdrug</p>
        </div>
        </div>
        <div className="">
          <h1 className="mb-2 pt-2 text-center text-black font-serif text-xl antialiased leading-none tracking-tight md:text-xl">
            <Link
              href={getUrlForDocumentType('article', slug)}
              className="hover:underline"
            >
              {title}
            </Link>
          </h1>

          <div className="mt-4 text-sm text-center md:mt-auto">
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

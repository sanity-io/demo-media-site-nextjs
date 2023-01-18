import {PortableText} from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {logError} from 'utils/logError'

import {urlForImage} from '../lib/sanity'
import {Article, BrandSpecificProps, MainImage} from '../types'
import {BRAND_LIFESTYLE_NAME, getBrandName} from '../utils/brand'
import {getUrlForDocumentType} from '../utils/routing'
import {PeopleList, usePeople} from './Credits'
import {Figure} from './Figure'

type HeaderProps = Pick<Article, 'title' | 'mainImage' | 'sections' | 'intro'>

export default function Header(props: HeaderProps & BrandSpecificProps) {
  const {title, mainImage, intro, sections, brand} = props
  const brandName = brand || getBrandName()

  if (brandName === BRAND_LIFESTYLE_NAME) {
    return <HeaderLifestyle {...props} />
  }

  return (
    <>
      <div className="m-auto max-w-5xl p-4 md:p-5 lg:p-6">
        {sections && sections?.length > 0 && (
          <SectionLinks sections={sections} />
        )}

        <h1 className="my-3 text-4xl font-extrabold leading-none tracking-tight sm:text-6xl md:text-8xl">
          {title || 'Untitled'}
        </h1>

        {intro && (
          <div className="mt-3 font-serif text-2xl leading-snug">
            <PortableText value={intro} onMissingComponent={logError} />
          </div>
        )}
      </div>
      {mainImage && (
        <MainCoverImage
          title={title}
          mainImage={mainImage}
          width={2000}
          height={1000}
          brandName={brandName}
        />
      )}
    </>
  )
}

type HeaderLifestyleProps = Pick<Article, 'title' | 'mainImage'>

export function HeaderLifestyle(props: HeaderLifestyleProps) {
  const {title, mainImage} = props
  return (
    <>
      {mainImage && (
        <MainCoverImage
          title={title}
          mainImage={mainImage}
          width={1000}
          height={1000}
        />
      )}
      <div className="m-auto max-w-5xl p-4 md:p-5 lg:p-6 lg:pt-2">
        <h1 className="my-3 font-serif text-4xl leading-none tracking-tight antialiased sm:text-center sm:text-6xl md:text-5xl">
          {title || 'Untitled'}
        </h1>
      </div>
    </>
  )
}

function MainCoverImage({
  title,
  mainImage,
  width = 2000,
  height = 1000,
  brandName = 'tech',
}: {
  title: string
  width?: number
  height?: number
  mainImage: MainImage
  brandName?: string
}) {
  const photographers = usePeople('photographer')
  const hasPhotographers = photographers && photographers.length > 0
  const separator =
    mainImage?.caption && photographers && photographers.length > 0 && ' ● '

  return (
    <>
      <Figure
        caption={
          (mainImage?.caption || hasPhotographers) && (
            <span className="font-sans">
              {mainImage.caption}
              {separator}
              {hasPhotographers && (
                <>
                  Photo: <PeopleList people={photographers} />
                </>
              )}
            </span>
          )
        }
        className={
          brandName === BRAND_LIFESTYLE_NAME
            ? 'm-auto max-w-xl p-2'
            : 'm-auto max-w-5xl p-2'
        }
        img={
          <Image
            className={
              brandName === BRAND_LIFESTYLE_NAME
                ? 'block aspect-square'
                : 'block aspect-[4/2]'
            }
            alt={mainImage?.alt || title}
            src={urlForImage(mainImage?.image)
              .width(width || 2000)
              .height(height || 1000)
              .url()}
            width={width || 2000}
            height={height || 1000}
            style={{objectFit: 'cover'}}
          />
        }
      />
    </>
  )
}

type SectionLinkProps = Pick<Article, 'sections'>

function SectionLinks({sections}: SectionLinkProps) {
  return (
    <div className="text-sm sm:text-lg md:text-xl">
      {sections &&
        sections.map((section) =>
          section && section._id && section.slug ? (
            <Link
              key={section._id}
              href={getUrlForDocumentType(
                'section',
                section.slug,
                section.brand
              )}
              data-after=" ● "
              className="after:inline after:content-[attr(data-after)] last:after:hidden hover:text-blue-500"
            >
              {section.name}
            </Link>
          ) : null
        )}
    </div>
  )
}

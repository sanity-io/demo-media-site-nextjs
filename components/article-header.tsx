import { ArticleProps } from '../types'
import Link from 'next/link'
import { Figure } from './figure'
import { urlForImage } from '../lib/sanity'
import { getUrlForDocumentType } from '../lib/routing'

export default function ArticleHeader(props: ArticleProps) {
  const { title, mainImage, date, people, sections, slug } = props
  return (
    <>
      <div className="m-auto max-w-5xl p-4 md:p-5 lg:p-6">
        {sections?.length > 0 && <SectionLinks sections={sections} />}

        <h1 className="my-3 text-4xl font-extrabold leading-none tracking-tight sm:text-6xl md:text-8xl">
          {title || 'Untitled'}
        </h1>

        <p className="mt-3 font-serif text-2xl leading-snug">
          The humble newsletter has been around for decades, but it has only
          recently emerged as a powerful media in its own right.
        </p>
      </div>
      {mainImage && <MainCoverImage title={title} mainImage={mainImage} />}
    </>
  )
}

function MainCoverImage({
  title,
  mainImage,
}: {
  title: string
  mainImage: any
}) {
  return (
    <>
      <Figure
        caption={
          mainImage?.caption && (
            <>{mainImage.caption} ● Photo by Hardcoded, pull from People</>
          )
        }
        className="m-auto max-w-5xl p-2"
        img={
          <img
            className="block aspect-[4/2]"
            alt={mainImage?.alt || title}
            src={urlForImage(mainImage?.image).height(1000).width(2000).url()}
            sizes="100vw"
            style={{ display: 'block', objectFit: 'cover' }}
          />
        }
      />
    </>
  )
}

function SectionLinks({ sections }) {
  return (
    <div className="text-sm sm:text-lg md:text-xl">
      {sections.map((section) => (
        <Link
          key={section._id}
          href={getUrlForDocumentType('section', section.slug)}
          data-after=" ● "
          className="after:inline after:content-[attr(data-after)] last:after:hidden hover:text-blue-500"
        >
          {section.name}
        </Link>
      ))}
    </div>
  )
}

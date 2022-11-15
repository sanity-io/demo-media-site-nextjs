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
import { ArticleProps } from '../types'

export default function ArticleBody({ content, people }) {
  return (
    <div className='m-auto max-w-2xl p-4 md:p-5 lg:p-6'>
      {people && <Credits people={people} />}

      <div className={`mx-auto max-w-2xl prose dark:prose-invert prose-p:leading-relaxed prose-headings:font-extrabold prose-headings:tracking-tight md:prose-lg lg:prose-xl `}>
        <PortableText value={content} />
      </div>
    </div>
  )
}

function Credits({ people }: { people: ArticleProps['people'] }) {
  return (
    <div
      className='mt-4 mb-4 max-w-2xl border-b border-gray-200 pb-3 text-sm dark:border-gray-900 sm:text-lg md:mt-auto md:pb-4 md:text-xl'>
      <span data-after=' ● ' className='after:inline after:content-[attr(data-after)]'>Oct 25, 2022</span>
      {people?.length &&
        people.map((person, index) => (
          <span key={index} data-after=' ● '
                className="after:inline after:content-[attr(data-after)] last:after:hidden">{person.name}</span>
        ))}
    </div>
  )
}
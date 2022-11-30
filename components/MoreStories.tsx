import { useMemo } from 'react'

import { ArticleProps } from '../types'
import { isLifestyle } from '../utils/brand'
import { useHomepageArticles } from '../utils/useHomepageArticles'
import ArticlePreview from './ArticlePreview'

const isLifestyleBrand = isLifestyle()

function StorySection({
  articles,
  title,
  columns = 4,
  sectionType,
}: {
  articles?: ArticleProps[]
  title?: string
  columns?: number
  sectionType?: 'featured' | 'normal'
}) {
  // Sorry for the mess, but this was the only way I could get the correct borders to work in all breakpoints, in light and dark mode :grimacing:
  const gridClass = useMemo(() => {
    return sectionType === 'featured'
      ? `grid border-gray-200 dark:divide-gray-900 dark:border-gray-900 max-sm:divide-gray-200 max-sm:divide-y max-sm:dark:divide-gray-900 border-b sm:grid-cols-2 sm:border sm:[&>*]:dark:border-gray-900 sm:[&>:not(:last-child):nth-child(odd)]:border-r sm:[&>:not(:last-child)]:border-b md:rounded md:grid-cols-${columns} md:[&>:not(:last-child):not(:nth-child(4))]:border-r`
      : `grid border-gray-200 dark:divide-gray-900 dark:border-gray-900 max-sm:divide-gray-200 max-sm:dark:divide-gray-900 max-sm:divide-y sm:grid-cols-2 sm:border sm:[&>*]:dark:border-gray-900 sm:[&>:nth-child(odd)]:border-r sm:[&>:nth-child(-n+3):not(:last-child)]:border-b md:rounded md:grid-cols-${columns} md:border md:[&>:not(:nth-child(3n))]:border-r`
  }, [columns, sectionType])
  if (isLifestyleBrand) {
    /* md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 */
    return (
      <section className="max-w-6xl md:mx-3 lg:mx-auto">
        {title && (
          <h2 className="mx-auto pt-6 pb-4 text-center text-xl font-extrabold leading-none tracking-tight sm:text-2xl md:p-5 md:py-6 lg:px-6 lg:pt-7">
            <span className="inline text-green-200">●</span> {title}
          </h2>
        )}

        <div className="font-merriweather container mx-auto">
          <div className={gridClass}>
            {articles?.map((article) => (
              <ArticlePreview
                key={article.slug}
                title={article.title}
                mainImage={article.mainImage}
                date={article.date}
                people={article.people}
                slug={article.slug}
                intro={article.intro}
                sectionType={sectionType}
                isHighlighted={Boolean(article?.isHighlighted)}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-5xl md:mx-3 lg:mx-auto">
      <h2 className="sr-only">Articles</h2>
      <div className="font-merriweather container mx-auto">
        <div className="divide-y divide-gray-200 rounded border-t border-b border-gray-200 dark:divide-gray-900 dark:border-gray-900 md:border">
          {articles?.map((article) => (
            <ArticlePreview
              key={article.slug}
              title={article.title}
              mainImage={article.mainImage}
              date={article.date}
              people={article.people}
              slug={article.slug}
              intro={article.intro}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function MoreStories({
  articles,
}: {
  articles: ArticleProps[]
}) {
  const { topArticles, restArticles } = useHomepageArticles(articles)

  if (isLifestyleBrand) {
    return (
      <div className="mb-6">
        {Boolean(topArticles?.length) && (
          <>
            <StorySection articles={topArticles} sectionType="featured" />
          </>
        )}
        {Boolean(restArticles?.length) && (
          <>
            <StorySection
              title="Latest news"
              articles={restArticles}
              columns={3}
              sectionType="normal"
            />
          </>
        )}
      </div>
    )
  }

  return (
    <section className="mb-6 max-w-6xl first:mt-5 first:sm:mt-6 md:mx-3 lg:mx-auto">
      <h2 className="sr-only">Articles</h2>
      <div className="font-merriweather container mx-auto">
        <div className="divide-y divide-gray-200 border-gray-200 dark:divide-gray-900 dark:border-gray-900 sm:rounded sm:border-t sm:border-b md:border">
          {articles?.map((article) => (
            <ArticlePreview
              key={article.slug}
              title={article.title}
              mainImage={article.mainImage}
              date={article.date}
              people={article.people}
              slug={article.slug}
              intro={article.intro}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

import clsx from 'clsx'
import React, {useMemo} from 'react'
import {useArticleOrPreview} from 'utils/useArticleOrPreview'

import {Article, Review} from '../types'
import {useSplitLifestyleArticles} from '../utils/useSplitLifestyleArticles'

function StorySection({
  title,
  columns = 4,
  sectionType,
  children,
}: {
  title?: string
  columns?: number
  sectionType?: 'featured' | 'normal'
  children: React.ReactNode
}) {
  const gridClass = useMemo(() => {
    //per Fred, needed for correct borders to work in all breakpoints and light and dark
    const baseGridClass = `grid border-gray-200 dark:divide-gray-900 dark:border-gray-900 max-sm:divide-gray-200 max-sm:dark:divide-gray-900 max-sm:divide-y sm:grid-cols-2 sm:border sm:[&>*]:dark:border-gray-900 md:rounded md:grid-cols-${columns}`
    const unfeaturedClass = `sm:[&>:nth-child(-n+3):not(:last-child)]:border-b md:border md:[&>:not(:nth-child(3n))]:border-r`
    const featuredClass = `sm:[&>:not(:last-child):nth-child(odd)]:border-r sm:[&>:not(:last-child)]:border-b md:[&>:not(:last-child):not(:nth-child(4))]:border-r`
    return clsx(
      baseGridClass,
      sectionType === 'featured' ? featuredClass : unfeaturedClass
    )
  }, [columns, sectionType])

  return (
    <section className="max-w-6xl md:mx-3 lg:mx-auto">
      {title && (
        <h2 className="mx-auto pt-6 pb-4 text-center text-xl font-extrabold leading-none tracking-tight sm:text-2xl md:p-5 md:py-6 lg:px-6 lg:pt-7">
          <span className="inline text-green-200">●</span> {title}
        </h2>
      )}

      <div className="font-merriweather container mx-auto">
        <div className={gridClass}>{children}</div>
      </div>
    </section>
  )
}

export function ArticleIndexLifestyle({
  articles,
  token,
}: {
  articles: (Article | Review)[]
  token?: string
}) {
  const {topArticles, restArticles} = useSplitLifestyleArticles(articles)
  const featured = useArticleOrPreview(
    topArticles,
    'lifestyle',
    token,
    'featured'
  )
  const unfeatured = useArticleOrPreview(
    restArticles,
    'lifestyle',
    token,
    'normal'
  )

  return (
    <div className="mb-6">
      {Boolean(featured?.length) && (
        <StorySection sectionType="featured">{featured}</StorySection>
      )}
      {Boolean(unfeatured?.length) && (
        <StorySection title="Latest news" sectionType="featured" columns={3}>
          {unfeatured}
        </StorySection>
      )}
    </div>
  )
}

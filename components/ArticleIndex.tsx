import React from 'react'
import {useArticleOrPreview} from 'utils/useArticleOrPreview'

import {Article, Review} from '../types'

export default function ArticleIndex({
  articles,
  token,
}: {
  articles: (Article | Review)[]
  token?: string
}) {
  const displayedArticles = useArticleOrPreview(articles, 'tech', token)
  return (
    <section className="mb-6 max-w-6xl first:mt-5 first:sm:mt-6 md:mx-3 lg:mx-auto">
      <h2 className="sr-only">Articles</h2>
      <div className="font-merriweather container mx-auto">
        <div className="divide-y divide-gray-200 border-gray-200 dark:divide-gray-900 dark:border-gray-900 sm:rounded sm:border-t sm:border-b md:border">
          {displayedArticles}
        </div>
      </div>
    </section>
  )
}

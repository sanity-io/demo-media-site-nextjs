import {useMemo} from 'react'

import {Article, Review} from '../types'

export const useSplitLifestyleArticles = (
  articles: (Article | Review)[],
  limit = 5
): {topArticles: (Article | Review)[]; restArticles: (Article | Review)[]} => {
  const topArticles = useMemo(() => {
    const sliced = articles?.slice(0, limit)
    const lastIndex = sliced?.length - 1
    return sliced?.map((article, index) => {
      // Highlight last article in this segment
      if (index === lastIndex) {
        return {...article, isHighlighted: true}
      }
      return {
        ...article,
        isHighlighted: false,
      }
    })
  }, [articles, limit])

  const restArticles = useMemo(() => articles?.slice(limit), [articles, limit])

  return {
    topArticles,
    restArticles,
  }
}

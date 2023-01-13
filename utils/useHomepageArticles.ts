import {useMemo} from 'react'

import {Article, Review} from '../types'
import {BRAND_LIFESTYLE_NAME, isLifestyle} from './brand'

export const useHomepageArticles = (
  articles: (Article | Review)[],
  brandName = 'tech',
  limit = 5
): {topArticles: (Article | Review)[]; restArticles: (Article | Review)[]} => {
  const isLifestyleBrand = brandName === BRAND_LIFESTYLE_NAME || isLifestyle()
  const topArticles = useMemo(() => {
    if (!isLifestyleBrand) {
      return articles?.slice(0, limit)
    }
    // console.log(articles)

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
  }, [articles, isLifestyleBrand, limit])

  const restArticles = useMemo(() => articles?.slice(limit), [articles, limit])

  return {
    topArticles,
    restArticles,
  }
}

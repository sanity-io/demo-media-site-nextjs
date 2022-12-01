import { useMemo } from 'react'
import { ArticleProps } from '../types'
import { BRAND_LIFESTYLE_NAME, isLifestyle } from './brand'

export const useHomepageArticles = (
  articles: ArticleProps[],
  brandName = 'tech',
  limit = 5
): { topArticles: ArticleProps[]; restArticles: ArticleProps[] } => {
  const isLifestyleBrand = (brandName === BRAND_LIFESTYLE_NAME) || isLifestyle()
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
        return { ...article, isHighlighted: true }
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

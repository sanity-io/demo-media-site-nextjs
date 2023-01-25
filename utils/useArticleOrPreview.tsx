import ArticlePreview from 'components/ArticlePreview'
import PreviewArticlePreview from 'components/PreviewArticlePreview'
import {PreviewSuspense} from 'next-sanity/preview'
import React, {useMemo} from 'react'

import {Article, Review} from '../types'

export const useArticleOrPreview = (
  articles?: (Article | Review)[],
  brandName?: 'tech' | 'lifestyle',
  token?: string,
  sectionType?: 'featured' | 'normal'
) => {
  const componentProps = useMemo(() => {
    if (!articles) return []
    const articleProps = articles.map((article) => ({
      ...article,
      sectionType,
      isHighlighted: Boolean(article?.isHighlighted),
      brandName: brandName,
    }))
    if (token) {
      return articleProps.map((props) => (
        <PreviewSuspense
          fallback={<ArticlePreview {...props} />}
          key={props.slug}
        >
          <PreviewArticlePreview
            slug={props.slug}
            token={token}
            brandName={brandName}
          />
        </PreviewSuspense>
      ))
    }
    return articleProps.map((props) => (
      <ArticlePreview key={props.slug} {...props} />
    ))
  }, [articles, token, sectionType, brandName])
  return componentProps
}

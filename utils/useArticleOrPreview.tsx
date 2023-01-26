import ArticlePreview from 'components/ArticlePreview'
import {PreviewArticlePreview} from 'components/PreviewArticlePreview'
import {PreviewReviewPreview} from 'components/PreviewReviewPreview'
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
          {props._type === 'review' ? (
            <PreviewReviewPreview
              slug={props.slug}
              token={token}
              brandName={brandName}
              sectionType={props.sectionType}
              isHighlighted={props.isHighlighted}
              //we use overrides, so keep this here
              title={props.title}
              sections={props.sections}
            />
          ) : (
            <PreviewArticlePreview
              slug={props.slug}
              token={token}
              brandName={brandName}
              sectionType={props.sectionType}
              isHighlighted={props.isHighlighted}
            />
          )}
        </PreviewSuspense>
      ))
    }
    return articleProps.map((props) => (
      <ArticlePreview key={props.slug} {...props} />
    ))
  }, [articles, token, sectionType, brandName])
  return componentProps
}

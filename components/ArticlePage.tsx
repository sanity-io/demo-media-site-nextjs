import { NextSeo } from 'next-seo'

import { urlForImage } from '../lib/sanity'
import { ArticleProps } from '../types'
import ArticleBody from './article-body'
import ArticleHeader from './article-header'
import Container from './container'

interface ArticleComponentProps {
  article?: ArticleProps
}

function openGraphObjectFromDocument(document: any) {
  // article.mainImage?.image?.asset?._ref
  return {
    title: document.title,
    //description: document.description,
    // url: document.url,
    type: 'article',
    images: document.mainImage?.image?.asset?._ref
      ? [
          {
            url: urlForImage(document.mainImage.image)
              .width(1200)
              .height(627)
              .fit('crop')
              .url(),
          },
        ]
      : undefined,
  }
}

export default function ArticlePage({ article }: ArticleComponentProps) {
  return (
    <Container>
      <NextSeo
        title={article?.title}
        openGraph={article ? openGraphObjectFromDocument(article) : undefined}
      />
      <article className="pb-4 md:pb-6">
        <ArticleHeader
          title={article?.title}
          mainImage={article?.mainImage}
          date={article?.date}
          people={article?.people}
          sections={article?.sections}
        />
        <ArticleBody content={article?.content} people={article?.people} />
      </article>
    </Container>
  )
}

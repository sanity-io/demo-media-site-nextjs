import { ArticleProps } from '../types'
import ArticleBody from './article-body'
import ArticleHeader from './article-header'

interface ArticleComponentProps {
  article?: ArticleProps
}

export default function Article({article}: ArticleComponentProps) {
  console.log('article', article)
  return (
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
  )
}
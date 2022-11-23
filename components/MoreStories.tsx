import { ArticleProps } from '../types'
import ArticlePreview from './ArticlePreview'

export default function MoreStories({
  articles,
}: {
  articles: ArticleProps[]
}) {
  return (
    <section className="max-w-5xl md:mx-3 lg:mx-auto">
      <h2 className="sr-only">Articles</h2>
      <div className="font-merriweather container mx-auto">
        <div className="divide-y divide-gray-200 rounded border-t border-b border-gray-200 dark:divide-gray-900 dark:border-gray-900 md:border">
          {articles.map((article) => (
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

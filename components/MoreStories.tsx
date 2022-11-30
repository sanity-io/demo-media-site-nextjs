import { ArticleProps } from '../types'
import { isLifestyle } from '../utils/brand'
import { useHomepageArticles } from '../utils/useHomepageArticles'
import ArticlePreview from './ArticlePreview'

const isLifestyleBrand = isLifestyle()

function StorySection({
  articles,
  title,
  columns = 4,
  sectionType,
}: {
  articles?: ArticleProps[]
  title?: string
  columns?: number
  sectionType?: 'featured' | 'normal'
}) {
  if (isLifestyleBrand) {
    /* md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 */
    return (
      <section className="max-w-6xl md:mx-3 lg:mx-auto">
        {title && (
          <h2 className="mx-auto pt-6 pb-4 text-center text-xl font-extrabold leading-none tracking-tight sm:text-2xl md:p-5 md:py-6 lg:px-6 lg:pt-7">
            <span className="inline text-green-200">●</span> {title}
          </h2>
        )}

        <div className="font-merriweather container mx-auto">
          <div
            className={`grid divide-y divide-x divide-gray-200 rounded border-b border-gray-200 dark:divide-gray-900 dark:border-gray-900 sm:grid-cols-2 md:grid-cols-${columns} md:border`}
          >
            {articles?.map((article) => (
              <ArticlePreview
                key={article.slug}
                title={article.title}
                mainImage={article.mainImage}
                date={article.date}
                people={article.people}
                slug={article.slug}
                intro={article.intro}
                sectionType={sectionType}
                isHighlighted={Boolean(article?.isHighlighted)}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-5xl md:mx-3 lg:mx-auto">
      <h2 className="sr-only">Articles</h2>
      <div className="font-merriweather container mx-auto">
        <div className="divide-y divide-gray-200 rounded border-t border-b border-gray-200 dark:divide-gray-900 dark:border-gray-900 md:border">
          {articles?.map((article) => (
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

export default function MoreStories({
  articles,
}: {
  articles: ArticleProps[]
}) {
  const { topArticles, restArticles } = useHomepageArticles(articles)

  if (isLifestyleBrand) {
    return (
      <div className="mb-6">
        {topArticles?.length && (
          <>
            <StorySection articles={topArticles} sectionType="featured" />
          </>
        )}
        {restArticles?.length && (
          <>
            <StorySection
              title="Latest news"
              articles={restArticles}
              columns={3}
              sectionType="normal"
            />
          </>
        )}
      </div>
    )
  }

  return (
    <section className="max-w-6xl md:mx-3 lg:mx-auto">
      <h2 className="sr-only">Articles</h2>
      <div className="font-merriweather container mx-auto">
        <div className="divide-y divide-gray-200 rounded border-t border-b border-gray-200 dark:divide-gray-900 dark:border-gray-900 md:border">
          {articles?.map((article) => (
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

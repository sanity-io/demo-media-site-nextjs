import groq from 'groq'

export const articleContentFields = groq`
  "content": content[]{
    _type == 'articleReference' => @->{_type, _id, title, "slug": slug.current},
    _type != 'articleReference' => @,
    _type == 'podcastReference' => @->{_type, _id, "url": podcastEpisode.url },
  },        
`

export const articleFields = groq`
  _id,
  _type,
  title,
  date,
  intro,
  brand,
  "summary": intro,
  // mainImage->{..., "asset": asset->},
  mainImage,
  "date": _updatedAt,
  "slug": slug.current,
  "people": people[]{ role, ...person->{name, image, bio, 'slug': slug.current} },
  "sections": sections[]->{name, _id, "slug": slug.current},
`

export const settingsQuery = groq`*[_type == "settings"][0]{title}`

export const indexQuery = groq`
{
  "featuredArticles": *[_type == 'siteSettings' && brand == $brand][0].featured[defined(_ref) || defined(review._ref)]{
    _type == 'articleReference' => @->,
    _type == 'reviewReference'=> {
      ...@.review->,
      @.review->soldOut => {
        "title": "SOLD OUT: " + coalesce(@.titleOverride, @.review->{title}.title)
      },
      @.review->soldOut == false => {
        "title": coalesce(@.titleOverride, @.review->{title}.title)
      },      
      "sections": @.sections
    }
  },
  "recentArticles": *[_type == "article" && brand == $brand] | order(date desc, _createdAt desc) [0..10]
} |
{
  "featuredArticles": @.featuredArticles,
  "filteredRecent": @.recentArticles[!(_id in ^.featuredArticles[]._id)]
} | {
  "combined": @.featuredArticles + @.filteredRecent
}.combined[0..10]{
  ${articleFields}
  variations
}`

export const articleQuery = groq`
{
  "article": *[_type == "article" && slug.current == $slug && brand == $brand] | order(_updatedAt desc) [0] {
    ${articleContentFields}
    ${articleFields}
  },
  "morePosts": *[_type == "article" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${articleFields}
  }
}`

export const articleSlugsQuery = groq`
*[_type == "article" && defined(slug.current)][]{
  brand,
  "slug": slug.current,
}
`

export const articleBySlugQuery = groq`
*[_type == "article" && slug.current == $slug && brand == $brand][0] {
  ${articleFields}
}
`

export const reviewQuery = groq`
*[_type == "review" && slug.current == $slug][0] {
  ${articleFields}
  // mainImage->{..., image{..., asset->{..., '_dataset': 'reviews'}}},
}
`

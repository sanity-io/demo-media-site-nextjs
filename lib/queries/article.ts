import groq from 'groq'

export const articleContentFields = groq`
  "content": content[]{
    _type == 'articleReference' => @->{_type, _id, title, "slug": slug.current},
    _type != 'articleReference' => @,
    _type == 'podcastReference' => @->{_type, _id, "url": podcastEpisode.url },
    _type == 'reviewReference'=> {
      "_type": @._type,
      "title": titleOverride,
      "slug": @.review->slug.current
    }
  },        
`

export const articleFields = groq`
  _id,
  _rev,
  title,
  date,
  intro,
  brand,
  "summary": intro,
  mainImage, 
  "date": _updatedAt,
  "slug": slug.current,
  "people": people[]{ role, ...person->{name, image, bio, 'slug': slug.current} },
  "sections": sections[]->{name, _id, "slug": slug.current},
`

export const settingsQuery = groq`*[_type == "settings"][0]{title}`

export const indexQuery = groq`
{
  "featuredArticles": *[_type == 'siteSettings' && brand == $brand].featured[defined(_ref) || defined(review._ref)]{
    _type == 'articleReference' => @->,
    _type == 'reviewReference'=> {
      ...@.review->,
      "title": coalesce(@.titleOverride, @.review->{title}.title),
      "sections": @.sections
    }
  },
  "recentArticles": *[_type == "article" && brand == $brand] | order(date desc, _createdAt desc) [0..10]
} |
{
  "featuredArticles": @.featuredArticles,
  "filteredRecent": @.recentArticles[!(_id in ^.featuredArticles[]._id) && !((string::split(_id, 'drafts.'))[1] in ^.featuredArticles[]._id)]
} | {
  "combined": @.featuredArticles + @.filteredRecent
}.combined[0..10]{
  ${articleFields}
  variations
}`

export const articleQuery = groq`
{
  "article": *[_type == "article" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${articleContentFields}
    ${articleFields}
  },
  "morePosts": *[_type == "article" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${articleFields}
  }
}`

export const articleSlugsQuery = groq`
*[_type == "article" && defined(slug.current)][].slug.current
`

export const articleBySlugQuery = groq`
*[_type == "article" && slug.current == $slug][0] {
  ${articleFields}
}
`

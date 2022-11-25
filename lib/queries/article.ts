import groq from 'groq'

export const articleFields = groq`
  _id,
  title,
  date,
  intro,
  mainImage,
  "content": content[]{
    _type == 'articleReference' => @->{_type, _id, title, "slug": slug.current},
    _type != 'articleReference' => @,
  },          
  "date": _updatedAt,
  "slug": slug.current,
  "people": people[]{ role, ...person->{name, image, bio, 'slug': slug.current} },
  "sections": sections[]->{name, _id, "slug": slug.current},
`

export const settingsQuery = groq`*[_type == "settings"][0]{title}`

export const indexQuery = groq`
*[_type == "article"] | order(date desc, _updatedAt desc) [0...10] {
  ${articleFields}
  variations
}`

export const articleQuery = groq`
{
  "article": *[_type == "article" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
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

import groq from 'groq'

export const newsletterFields = groq`
  _id,
  title,
  subject,
  intro,
  hasCustomTextContent,
  "content": content[]{
    _type == 'articleReference' => @->{_type, _id, title, intro, "slug": slug.current, mainImage },
    _type != 'articleReference' => @,
  },          
  "date": _updatedAt,
`

export const settingsQuery = groq`*[_type == "settings"][0]{title}`

export const indexQuery = groq`
*[_type == "newsletter"] | order(date desc, _updatedAt desc) {
  ${newsletterFields}
}`

export const newsletterQuery = groq`
{
  "newsletter": *[_type == "newsletter" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${newsletterFields}
  },
  "morePosts": *[_type == "newsletter" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${newsletterFields}
  }
}`

export const newsletterSlugsQuery = groq`
*[_type == "newsletter" && defined(slug.current)][].slug.current
`

export const newsletterBySlugQuery = groq`
*[_type == "newsletter" && slug.current == $slug][0] {
  ${newsletterFields}
}
`

export const newsletterByIdQuery = groq`
*[_type == "newsletter" && _id == $id][0] {
  ${newsletterFields}
}
`
export const newslettersByIdQuery = groq`
*[_type == "newsletter" && _id in $ids] {
  ${newsletterFields}
}
`

import groq from 'groq'

import { articleFields } from './article'

export const personFields = groq`
  _id,
  _type,
  name,
  bio,
  isStaff,
  "slug": slug.current,
`

export const personIndexQuery = groq`
*[_type == "person"] | order(date desc, _updatedAt desc) {
  ${personFields}
}`

export const personBySlugQuery = groq`*[_type == "person" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${personFields}
     "articles": *[_type == 'article' && references(^._id)] | order(_updatedAt desc) {
      ${articleFields}
    }
}`

export const personSlugsQuery = groq`
*[_type == "person" && defined(slug.current)][].slug.current
`

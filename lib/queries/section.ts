import groq from 'groq'

import { articleFields } from './article'

export const sectionFields = groq`
  _id,
  _type,
  name,
  "slug": slug.current,
`

export const sectionIndexQuery = groq`
*[_type == "section"] | order(date desc, _updatedAt desc) {
  ${sectionFields}
}`

export const sectionBySlugQuery = groq`*[_type == "section" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${sectionFields}
     "articles": *[_type == 'article' && references(^._id)] | order(_updatedAt desc) {
      ${articleFields}
    }
}`

export const sectionSlugsQuery = groq`
*[_type == "section" && defined(slug.current)][].slug.current
`

//document types
import {startCase} from 'lodash'
import {SchemaTypeDefinition, Template} from 'sanity'

import article from './article'
import newsletter from './newsletter'
import articleReference from './objects/articleReference'
import articleReferences from './objects/articleReferences'
import brandSchemaType from './objects/brand'
import contentRole from './objects/contentRole'
import mainImage from './objects/mainImage'
import minimalPortableText from './objects/minimalPortableText'
import podcastEpisode from './objects/podcastEpisode'
import podcastReference from './objects/podcastReference'
import portableText from './objects/portableText'
import reviewReference from './objects/reviewReference'
import seo from './objects/seo'
import video from './objects/video'
import person from './person'
import podcast from './podcast'
import review from './review'
import section from './section'
import siteSettings from './siteSettings'

export const schemaTypes = (
  prev: SchemaTypeDefinition[]
): SchemaTypeDefinition[] =>
  [
    ...prev,
    // Objects
    articleReference,
    articleReferences,
    podcastReference,
    contentRole,
    mainImage,
    minimalPortableText,
    portableText,
    seo,
    podcastEpisode,
    reviewReference,
    video,
    brandSchemaType,

    // Document types
    article,
    review,
    newsletter,
    person,
    podcast,
    section,
    siteSettings,
  ] as SchemaTypeDefinition[]

export const schemaTemplates = (
  prev: Template[],
  brand: string
): Template[] => {
  const brandTypes = [
    'article',
    'review',
    'newsletter',
    'person',
    'podcast',
    'section',
  ]
  const brandTemplates = brandTypes.map((schemaType) => ({
    id: `${schemaType}-${brand}`,
    title: startCase(`${brand} ${schemaType}`),
    type: 'initialValueTemplateItem',
    schemaType,
    value: {brand},
  }))
  //remove the original, non-brand templates
  const filteredTemplates = prev.filter(
    (template) => !brandTypes.includes(template.schemaType)
  )
  return [...filteredTemplates, ...brandTemplates]
}

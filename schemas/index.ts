//document types
import {SchemaTypeDefinition, Template} from 'sanity'

import article from './article'
import newsletter from './newsletter'
import articleReference from './objects/articleReference'
import articleReferences from './objects/articleReferences'
import brand from './objects/brand'
import contentRole from './objects/contentRole'
import externalVideo from './objects/externalVideo'
import mainImage from './objects/mainImage'
import minimalPortableText from './objects/minimalPortableText'
import podcastEpisode from './objects/podcastEpisode'
import podcastReference from './objects/podcastReference'
import portableText from './objects/portableText'
import reviewReference from './objects/reviewReference'
import seo from './objects/seo'
import timestamp from './objects/timestamp'
import transcribedMuxVideo from './objects/transcribedMuxVideo'
import person from './person'
import podcast from './podcast'
import review from './review'
import section from './section'
import siteSettings from './siteSettings'
import video from './video'

const schemaTypesToFilterBrandOn = ['articleReference', 'person', 'section']

export const schemaTypes = (
  prev: SchemaTypeDefinition[],
  brandType: string
): SchemaTypeDefinition[] => {
  return [
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
    externalVideo,
    brand,
    transcribedMuxVideo,
    timestamp,

    // Document types
    article,
    review,
    newsletter,
    person,
    podcast,
    section,
    siteSettings,
    video,
  ].map((def: SchemaTypeDefinition<any>) => {
    if (schemaTypesToFilterBrandOn.includes(def?.name)) {
      return {
        ...def,
        options: {
          filter: 'brand == $brand',
          filterParams: {brand: brandType},
        },
      } as SchemaTypeDefinition
    }

    return def
  })
}

export const schemaTemplates = (prev: Template[]): Template[] => {
  return [
    ...prev,
    ...[
      'article',
      'review',
      'newsletter',
      'person',
      'podcast',
      'section',
      'video',
    ].map((schemaType) => ({
      id: `${schemaType}-brand`,
      title: `${schemaType} with Brand`,
      type: 'initialValueTemplateItem',
      schemaType,
      parameters: [{name: `brand`, title: `Brand`, type: `string`}],
      value: (initialValue: {brand: string}) => ({brand: initialValue.brand}),
    })),
  ]
}

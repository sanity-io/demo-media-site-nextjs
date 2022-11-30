//document types
import { SchemaTypeDefinition, Template } from 'sanity'

import article from './article'
import newsletter from './newsletter'
import articleReference from './objects/articleReference'
import articleReferences from './objects/articleReferences'
import brand from './objects/brand'
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

const schemaTypesToFilterBrandOn = ['articleReference', 'person']

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
    video,
    brand,

    // Document types
    article,
    review,
    newsletter,
    person,
    podcast,
    section,
    siteSettings,
  ].map((def: SchemaTypeDefinition) => {
    // todo: contentRole.fields.reference
    if (schemaTypesToFilterBrandOn.includes(def?.name)) {
      return {
        ...def,
        options: {
          filter: 'brand == $brand',
          filterParams: { brand: brandType },
        },
        // TODO - understand why Typescript doesn't see this as a SchemaTypeDefinition
      } as SchemaTypeDefinition
    }

    return def
  })
}

export const schemaTemplates = (prev: Template[]) => {
  return [
    ...prev,
    ...['article', 'review', 'newsletter', 'person', 'podcast', 'section'].map(
      (schemaType) => ({
        id: `${schemaType}-brand`,
        title: `${schemaType} with Brand`,
        type: 'initialValueTemplateItem',
        schemaType,
        parameters: [{ name: `brand`, title: `Brand`, type: `string` }],
        value: ({ brand }) => ({ brand }),
      })
    ),
  ]
}

//document types
import article from './article'
//objects
import articleReference from './objects/articleReference'
import contentRole from './objects/contentRole'
import mainImage from './objects/mainImage'
import minimalPortableText from './objects/minimalPortableText'
import portableText from './objects/portableText'
import seo from './objects/seo'
import video from './objects/video'
import person from './person'
import section from './section'
import newsletter from './newsletter'
import articleReferences from './objects/articleReferences'
import podcast from './podcast'
import podcastEpisode from './objects/podcastEpisode'
import brand from './objects/brand'
import {
  SchemaPluginOptions,
  SchemaTypeDefinition,
  Template,
  TemplateResolver,
} from 'sanity'
import review from './review'

const schemaTypesToFilterBrandOn = ['articleReference', 'person']

export const schemaTypes = (
  prev: SchemaTypeDefinition[],
  brandType: string
) => {
  return [
    ...prev,
    // Objects
    articleReference,
    articleReferences,
    contentRole,
    mainImage,
    minimalPortableText,
    portableText,
    seo,
    podcastEpisode,
    video,
    brand,

    // Document types
    article,
    review,
    newsletter,
    person,
    podcast,
    section,
  ].map((def) => {
    // todo: contentRole.fields.reference
    if (schemaTypesToFilterBrandOn.includes(def?.name)) {
      return {
        ...def,
        options: {
          filter: 'brand == $brand',
          filterParams: { brand: brandType },
        },
      }
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

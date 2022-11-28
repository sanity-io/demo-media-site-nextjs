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
import { Template, TemplateResolver } from 'sanity'
import review from './review'

export const schemaTypes = [
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
]

export const schemaTemplates = (prev: Template[]) => [
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

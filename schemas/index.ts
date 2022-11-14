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

export const schemaTypes = [
  article,
  person,
  section,
  articleReference,
  contentRole,
  mainImage,
  minimalPortableText,
  portableText,
  seo,
  video,
]

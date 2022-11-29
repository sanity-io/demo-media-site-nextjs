import createImageUrlBuilder from '@sanity/image-url'

import { sanityConfig, reviewConfig } from './config'

const imageBuilder = createImageUrlBuilder(sanityConfig)
const reviewImageBuilder = createImageUrlBuilder(reviewConfig)


export const urlForImage = (source: any, dataset?: string) => {
  const builder = dataset === 'reviews' ? reviewImageBuilder : imageBuilder
  return builder.image(source).auto('format').fit('max')
}

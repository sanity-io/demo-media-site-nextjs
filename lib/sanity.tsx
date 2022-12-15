import createImageUrlBuilder from '@sanity/image-url'
import {SanityAsset} from '@sanity/image-url/lib/types/types'
import {CrossDatasetReferenceValue} from 'sanity'

import {reviewConfig, sanityConfig} from './config'

type CrossDatasetSource = {
  _type: 'image'
  asset: CrossDatasetReferenceValue & SanityAsset
}

export const imageBuilder = createImageUrlBuilder(sanityConfig)

export const urlForImage = (source: CrossDatasetSource) => {
  if (source?.asset?._dataset == 'reviews') {
    const reviewImageBuilder = createImageUrlBuilder(reviewConfig)
    return reviewImageBuilder.image(source).auto('format').fit('max')
  }

  return imageBuilder.image(source).auto('format').fit('max')
}

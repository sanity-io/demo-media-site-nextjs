import createImageUrlBuilder from '@sanity/image-url'
import {SanityAsset} from '@sanity/image-url/lib/types/types'
import {CrossDatasetSource} from 'types'

import {config, reviewConfig} from './config'

export const imageBuilder = createImageUrlBuilder({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
})

export const urlForImage = (source: SanityAsset | CrossDatasetSource) => {
  if (source?.asset?._dataset == 'reviews') {
    const reviewImageBuilder = createImageUrlBuilder({
      projectId: reviewConfig.sanity.projectId,
      dataset: reviewConfig.sanity.dataset,
    })
    return reviewImageBuilder.image(source).auto('format').fit('max')
  }

  return imageBuilder.image(source).auto('format').fit('max')
}

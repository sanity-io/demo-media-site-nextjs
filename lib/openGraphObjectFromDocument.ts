import {Article} from 'types'

import {urlForImage} from './sanity'

interface OpenGraphObject {
  title: string
  description?: string
  url?: string
  type: 'article'
  images?: Array<{url: string}>
}

export default function openGraphObjectFromDocument(
  document: Article
): OpenGraphObject {
  // article.mainImage?.image?.asset?._ref
  return {
    title: document.title,
    //description: document.description,
    // url: document.url,
    type: 'article',
    images: document.mainImage?.image?.asset?._ref
      ? [
          {
            url: urlForImage(document.mainImage.image)
              .width(1200)
              .height(627)
              .fit('crop')
              .url(),
          },
        ]
      : undefined,
  }
}

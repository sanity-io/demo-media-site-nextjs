import {urlForImage} from './sanity'

// @fixme: Either type this, or we disable the rule and allow inferring types
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function openGraphObjectFromDocument(document: any) {
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

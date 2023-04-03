import {toPlainText} from '@portabletext/react'
import {config} from 'lib/config'
import {urlForImage} from 'lib/sanity'
import {NextSeo} from 'next-seo'
import React from 'react'
import {isArticle, isAuthor, SEODocumentType} from 'types'
import {getUrlForDocumentType} from 'utils/routing'

const createCanonicalUrl = (doc: SEODocumentType) => {
  const url =
    config.env === 'production'
      ? 'https://demo-media-site-nextjs.sanity.build'
      : 'http://localhost:3000'
  const {_type, brand, slug} = doc
  return url + getUrlForDocumentType(_type, slug, brand)
}

const createOpenGraphObject = (
  title: string,
  description: string,
  url: string,
  document: SEODocumentType
) => {
  //it would be nice if we could get all the images from,
  //for example, the entire body of a article. We can't demo
  //it at the moment, so we'll just use the main image
  const images = []
  if (document.seo?.image) {
    images.push({
      url: urlForImage(document.seo.image)
        .width(1200)
        .height(627)
        .fit('crop')
        .url(),
    })
  }

  if (isArticle(document) && document?.mainImage?.image?.asset?._ref) {
    images.push({
      url: urlForImage(document.mainImage.image)
        .width(1200)
        .height(627)
        .fit('crop')
        .url(),
    })
  }

  if (isAuthor(document) && document.image?.asset?._ref) {
    images.push({
      url: urlForImage(document.image)
        .width(1200)
        .height(627)
        .fit('crop')
        .url(),
    })
  }

  //we will do types at a later date, again with the better OG/card preview
  //and JSON-LD previews
  return {
    title,
    description,
    url,
    images,
  }
}

export const Seo = ({doc}: {doc: SEODocumentType}) => {
  const defaultTitle = isArticle(doc) ? doc.title : doc.name
  const title = doc.seo?.title || defaultTitle
  let defaultDescription = ''

  if (isAuthor(doc)) {
    defaultDescription = doc.bio ? toPlainText(doc.bio) : defaultDescription
  } else if (isArticle(doc)) {
    defaultDescription = doc.intro ? toPlainText(doc.intro) : defaultDescription
  } else {
    defaultDescription = `Check out more ${
      doc.name && `about ${doc.name}`
    } on the ${doc.brand} site.`
  }

  const description = doc.seo?.description || defaultDescription
  const canonicalUrl = createCanonicalUrl(doc)

  return (
    <NextSeo
      title={`${title}`}
      description={description}
      canonical={canonicalUrl}
      openGraph={createOpenGraphObject(title, description, canonicalUrl, doc)}
    />
  )
}

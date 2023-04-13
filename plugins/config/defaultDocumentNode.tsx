import dynamic from 'next/dynamic'
import React from 'react'
import {DefaultDocumentNodeResolver} from 'sanity/desk'
import DocumentsPane from 'sanity-plugin-documents-pane'

import {config} from '../../lib/config'
import {PreviewPane} from '../../plugins/PreviewPane'
import {buildPreviewUrl, getSecret} from '../../plugins/productionUrl'
const SEOPane = dynamic(
  () => import('sanity-plugin-seo-pane').then((mod) => mod.SEOPane),
  {ssr: false}
)

import {SanityDocument} from 'sanity'

import {NewsletterPreview} from '../newsletter'

const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  {schemaType, getClient}
) => {
  const previewTypes = ['article', 'person', 'section', 'siteSettings']
  const articleReferenceTypes = ['person', 'section']
  const views = []
  const {apiVersion, previewSecretId} = config.sanity

  if (previewTypes.includes(schemaType)) {
    views.push(
      S.view
        .component(({document}) => <PreviewPane document={document} />)
        .title('Preview')
    )

    views.push(
      S.view
        .component(({document}) => {
          const displayed: SanityDocument = document.displayed
          return (
            <SEOPane
              options={{
                keywords: `seo.keywords`,
                synonyms: `seo.synonyms`,
                //@ts-ignore -- make note to update type to allow Promise
                url: async () => {
                  const client = getClient({apiVersion})
                  const secret = await getSecret(client, previewSecretId)
                  const url = buildPreviewUrl({
                    document: displayed,
                    secret,
                  })
                  return url
                },
              }}
              document={document}
            />
          )
        })
        .title('SEO')
    )
  }

  if (articleReferenceTypes.includes(schemaType)) {
    views.push(
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id)]`,
          params: {id: `_id`},
        })
        .title('Related Content')
    )
  }

  if (schemaType === 'newsletter') {
    views.push(S.view.component(NewsletterPreview).title('Preview'))
  }

  return S.document().views([S.view.form(), ...views])
}

export default defaultDocumentNode

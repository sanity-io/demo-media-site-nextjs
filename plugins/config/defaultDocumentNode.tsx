import {config} from 'lib/config'
import dynamic from 'next/dynamic'
import {PreviewPane} from 'plugins/PreviewPane'
import {buildPreviewUrl, getSecret} from 'plugins/productionUrl'
import React from 'react'
import {DefaultDocumentNodeResolver} from 'sanity/desk'
import DocumentsPane from 'sanity-plugin-documents-pane'
const SEOPane = dynamic(
  () => import('sanity-plugin-seo-pane').then((mod) => mod.SEOPane),
  {ssr: false}
)

import {NewsletterPreview} from '../newsletter'

const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  {schemaType, getClient}
) => {
  const previewTypes = ['article', 'person', 'section', 'siteSettings']
  const articleReferenceTypes = ['person', 'section']
  const seoTypes = ['article']
  const views = []
  const {apiVersion, previewSecretId} = config.sanity

  if (previewTypes.includes(schemaType)) {
    views.push(
      S.view
        .component(({document}) => <PreviewPane document={document} />)
        .title('Preview')
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

  if (seoTypes.includes(schemaType)) {
    views.push(
      S.view
        .component(({document}) => (
          <SEOPane
            options={{
              keywords: `seo.keywords`,
              synonyms: `seo.synonyms`,
              //@ts-ignore
              url: async () => {
                const client = getClient({apiVersion})
                const secret = await getSecret(client, previewSecretId)
                return buildPreviewUrl({document, secret, fetch: true})
              },
            }}
            document={document}
          />
        ))
        .title('SEO')
    )
  }

  if (schemaType === 'newsletter') {
    views.push(S.view.component(NewsletterPreview).title('Preview'))
  }

  return S.document().views([S.view.form(), ...views])
}

export default defaultDocumentNode

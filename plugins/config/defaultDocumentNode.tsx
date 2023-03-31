import {config} from 'lib/config'
import {PreviewPane} from 'plugins/PreviewPane'
import {buildPreviewUrl, getSecret} from 'plugins/productionUrl'
import React from 'react'
import {DefaultDocumentNodeResolver} from 'sanity/desk'
import DocumentsPane from 'sanity-plugin-documents-pane'
import {SEOPane} from 'sanity-plugin-seo-pane'
import {BrandSlugDocument} from 'types'

import {NewsletterPreview} from '../newsletter'

const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  {schemaType, getClient}
) => {
  const articleReferenceTypes = ['person', 'section']
  const previewTypes = ['article', 'person', 'section', 'siteSettings']
  const views = []
  const {apiVersion, previewSecretId} = config.sanity

  if (previewTypes.includes(schemaType)) {
    views.push(
      S.view
        .component(({document}) => <PreviewPane document={document} />)
        .title('Preview'),
      S.view.component(SEOPane).options({
        // Retrieve the keywords and synonyms at the given dot-notated strings
        keywords: `seo.keywords`,
        synonyms: `seo.synonyms`,
        url: async (document: BrandSlugDocument) => {
          const client = getClient({apiVersion})
          const secret = await getSecret(client, previewSecretId)
          return buildPreviewUrl({document, secret})
        },
      })
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

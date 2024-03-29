import React from 'react'
import {DefaultDocumentNodeResolver} from 'sanity/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'

import {PreviewPane} from '../../plugins/PreviewPane'
import {NewsletterPreview} from '../newsletter'

const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  const previewTypes = ['article', 'person', 'section', 'siteSettings']
  const articleReferenceTypes = ['person', 'section']
  const views = []

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

  if (schemaType === 'newsletter') {
    views.push(S.view.component(NewsletterPreview).title('Preview'))
  }

  return S.document().views([S.view.form(), ...views])
}

export default defaultDocumentNode

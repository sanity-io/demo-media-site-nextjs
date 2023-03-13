import {PreviewPane} from 'plugins/PreviewPane'
import React from 'react'
import {DefaultDocumentNodeResolver} from 'sanity/desk'
import DocumentsPane from 'sanity-plugin-documents-pane'
import {SEOPane} from 'sanity-plugin-seo-pane'

import {NewsletterPreview} from '../newsletter'

const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  const articleReferenceTypes = ['person', 'section']
  const previewTypes = ['article', 'person', 'section', 'siteSettings']
  const views = []

  if (previewTypes.includes(schemaType)) {
    views.push(
      S.view
        .component(({document}) => <PreviewPane document={document} />)
        .title('Preview'),
      S.view
        .component(SEOPane)
        .options({
          // Retrieve the keywords and synonyms at the given dot-notated strings
          keywords: `seo.keywords`,
          synonyms: `seo.synonyms`,

          // Alternatively, specify functions (may be async) to extract values
          // keywords: doc => doc.seo?.keywords,
          // synonyms: async(doc) => client.fetch('some query to get synonyms', {id: doc._id}),
          // url: async(doc) => client.fetch('some query to construct a url with refs', {id: doc._id})
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

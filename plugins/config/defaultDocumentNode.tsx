import DocumentsPane from 'sanity-plugin-documents-pane'
import { DefaultDocumentNodeResolver } from 'sanity/desk'
import { NewsletterPreview } from '../newsletter'
import DocumentPreview from '../preview/DocumentPreview'

const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  const articleReferenceTypes = ['person', 'section']
  const previewTypes = ['article', 'person', 'section']
  const views = []

  if (previewTypes.includes(schemaType)) {
    views.push(
      S.view
        .component(({ document }) => (
          <DocumentPreview
            slug={document.displayed.slug?.current}
            _type={document.displayed._type}
          />
        ))
        .title('Preview')
    )
  }

  if (articleReferenceTypes.includes(schemaType)) {
    views.push(
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id)]`,
          params: { id: `_id` },
        })
        .title('Incoming References')
    )
  }

  if (schemaType === 'newsletter') {
    views.push(S.view.component(NewsletterPreview).title('Preview'))
  }

  return S.document().views([S.view.form(), ...views])
}

export default defaultDocumentNode

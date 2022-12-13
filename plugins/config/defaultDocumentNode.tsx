import DocumentsPane from 'sanity-plugin-documents-pane'
import Iframe from 'sanity-plugin-iframe-pane'
import { DefaultDocumentNodeResolver } from 'sanity/desk'
import { NewsletterPreview } from '../newsletter'
import { SanityDocumentLike } from 'sanity'

type ProductionUrlDoc = SanityDocumentLike & { slug: any }

const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  const articleReferenceTypes = ['person', 'section']
  const previewTypes = ['article', 'person', 'section', 'siteSettings']
  const views = []

  if (previewTypes.includes(schemaType)) {
    views.push(
      S.view
        .component(Iframe)
        .options({
          url: (doc: ProductionUrlDoc) => resolveProductionUrl(doc),
          reload: {
            button: true,
            revision: false,
          },
        })
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
        .title('Related Content')
    )
  }

  if (schemaType === 'newsletter') {
    views.push(S.view.component(NewsletterPreview).title('Preview'))
  }

  return S.document().views([S.view.form(), ...views])
}

function resolveProductionUrl(doc: ProductionUrlDoc) {
  const { slug, _type } = doc
  const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
  const url = new URL('/api/preview', location.origin)

  url.searchParams.set('slug', slug?.current)
  url.searchParams.set('type', _type)

  if (secret) {
    url.searchParams.set('secret', secret)
  }

  return url.toString()
}

export default defaultDocumentNode

/**
 * This component is responsible for rendering previews of pages in the studio.
 */
import React, {memo} from 'react'
import {SanityDocument, Slug} from 'sanity'
import Iframe, {IframeOptions} from 'sanity-plugin-iframe-pane'
import {useBuildPreviewUrl} from 'utils/buildPreviewUrl'

type BrandSlugDocument = {
  brand: string
  slug: Slug
}
type Props = {
  document: {
    displayed: SanityDocument & BrandSlugDocument
  }
  fetch?: boolean
}

export const PreviewPane = memo(function PreviewPane({document, fetch}: Props) {
  let url = useBuildPreviewUrl(document)
  if (fetch) {
    url = `${url}&fetch=true`
  }
  const options: IframeOptions = {
    url,
    /* @ts-expect-error -- revision: false does not work as expected */
    reload: {
      button: true,
      // revision: false
    },
  }

  if (document.displayed._type == 'siteSettings') {
    options.reload.revision = true
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Iframe options={options} document={document} />
    </div>
  )
})

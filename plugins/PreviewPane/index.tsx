/**
 * This component is responsible for rendering previews of pages in the studio.
 */
import React, {memo} from 'react'
import Iframe, {IframeOptions} from 'sanity-plugin-iframe-pane'
import {BrandSlugDocument} from 'types'

import {useBuildPreviewUrl} from '../../plugins/productionUrl'

type Props = {
  document: {
    displayed: BrandSlugDocument
  }
  fetch?: boolean
}

export const PreviewPane = memo(function PreviewPane({document, fetch}: Props) {
  const url = useBuildPreviewUrl(document.displayed)

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

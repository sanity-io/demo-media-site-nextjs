/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import DocumentsPane from 'sanity-plugin-documents-pane'
import { scheduledPublishing } from '@sanity/scheduled-publishing'

import { schemaTypes } from './schemas'
import { mediaConfigPlugin } from './plugins/config'
import { DocumentPreview } from './components/DocumentPreview'

// @TODO: update next-sanity/studio to automatically set this when needed
const basePath = '/studio'

export default defineConfig({
  basePath,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Media Site',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    deskTool({
      structure: (S) => {
        // @TODO: define index page singleton as a settings document
        return S.list().title('Content').items(S.documentTypeListItems())
      },
      defaultDocumentNode: (S, { schemaType }) => {
        const articleReferenceTypes = ['person', 'section']
        const previewTypes = ['article', 'person', 'section']
        const views = []
        if (previewTypes.includes(schemaType)) {
          views.push(S.view.component(DocumentPreview).title('Preview'))
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
        return S.document().views([S.view.form(), ...views])
      },
    }),
    unsplashImageAsset(),
    visionTool({
      defaultApiVersion: '2022-11-11',
    }),
    mediaConfigPlugin(),
    scheduledPublishing(),
  ],
})

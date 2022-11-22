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
import newsletterPlugin, { NewsletterPreview } from './plugins/newsletter'

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
        const views = []
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
          views.push(
            S.view
              .component(NewsletterPreview)
              // .options({
              //   query: `*[!(_id in path("drafts.**")) && references($id)]`,
              //   params: { id: `_id` },
              // })
              .title('Preview')
          )
        }

        return S.document().views([S.view.form(), ...views])
      },
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    visionTool({
      defaultApiVersion: '2022-11-11',
    }),
    mediaConfigPlugin(),
    scheduledPublishing(),
    newsletterPlugin(),
  ],
})

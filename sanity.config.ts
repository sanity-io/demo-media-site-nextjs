/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import DocumentsPane from 'sanity-plugin-documents-pane'
import { scheduledPublishing } from "@sanity/scheduled-publishing";

import { schemaTypes } from './schemas'

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
        return S.document().views([S.view.form(), ...views])
      },

      // `defaultDocumentNode is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({
      defaultApiVersion: '2022-11-11',
    }),
    scheduledPublishing(),
  ],
})

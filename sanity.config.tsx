/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig, definePlugin } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import DocumentsPane from 'sanity-plugin-documents-pane'
import { scheduledPublishing } from '@sanity/scheduled-publishing'
import { theme } from 'https://themer.sanity.build/api/hues?preset=tw-cyan&primary=b595f9'

import { schemaTypes } from './schemas'
import DocumentPreview from './components/DocumentPreview'
import { mediaConfigPlugin, structure } from './plugins/config'
import newsletterPlugin, { NewsletterPreview } from './plugins/newsletter'

// @TODO: update next-sanity/studio to automatically set this when needed
const basePath = '/studio/media'
const basePathBlog = '/studio/blog'

const defaultConfig = (type: string) => {
  // const defaultConfig = (type) => {
  return definePlugin({
    name: 'default-config',
    schema: {
      types: schemaTypes,
    },
    plugins: [
      deskTool({
        structure: (S, context) => structure(S, context, type),
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
  })()
}

export default defineConfig([
  {
    basePath,
    name: 'media',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Media',
    plugins: [defaultConfig('media')],
  },
<<<<<<< HEAD:sanity.config.tsx
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
          views.push(
            S.view
              .component(({ document }) => (
                <DocumentPreview
                  slug={document.displayed.slug}
                  _type={document.displayed.type}
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
=======
  {
    name: 'blog',
    basePath: basePathBlog,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Blog',
    theme,
    plugins: [defaultConfig('blog')],
  },
])
>>>>>>> main:sanity.config.ts

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
import { workflow } from 'sanity-plugin-workflow'

import { schemaTypes } from './schemas'
import { mediaConfigPlugin, structure } from './plugins/config'
import newsletterPlugin from './plugins/newsletter'
import defaultDocumentNode from './plugins/config/defaultDocumentNode'

// @TODO: update next-sanity/studio to automatically set this when needed
const basePath = '/studio/tech'
const basePathLifestyle = '/studio/lifestyle'

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
        defaultDocumentNode,
      }),
      // Add an image asset source for Unsplash
      unsplashImageAsset(),
      visionTool({
        defaultApiVersion: '2022-11-11',
      }),
      mediaConfigPlugin(),
      scheduledPublishing(),
      newsletterPlugin(),
      workflow({
        schemaTypes: ['article']
      })
    ],
  })()
}

export default defineConfig([
  {
    basePath,
    name: 'tech',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Tech',
    plugins: [defaultConfig('tech')],
  },
  {
    name: 'lifestyle',
    basePath: basePathLifestyle,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Lifestyle',
    theme,
    plugins: [defaultConfig('lifestyle')],
  },
])

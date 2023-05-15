/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import {createClient} from '@sanity/client'
import {scheduledPublishing} from '@sanity/scheduled-publishing'
import {visionTool} from '@sanity/vision'
import {theme} from 'https://themer.sanity.build/api/hues?preset=tw-cyan&primary=b595f9'
import {defineConfig, definePlugin, WorkspaceOptions} from 'sanity'
import {deskTool} from 'sanity/desk'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'

import {config, reviewConfig} from './lib/config'
import {
  LifestyleLogo,
  LifestyleWorkspaceLogo,
  ReviewsLogo,
  ReviewsWorkspaceLogo,
  TechLogo,
  TechWorkspaceLogo,
} from './logo'
import {mediaConfigPlugin} from './plugins/defaultConfig'
import defaultDocumentNode from './plugins/defaultConfig/defaultDocumentNode'
import {
  lifestyleStructure,
  reviewStructure,
  techStructure,
} from './plugins/defaultConfig/structure'
import newsletterPlugin from './plugins/newsletter'
import {productionUrl} from './plugins/productionUrl'
import variations from './plugins/variations'
import {schemaTemplates, schemaTypes} from './schemas'

//https://github.com/sanity-io/next-sanity#the-usebackgroundcolorsfromtheme-usebasepath-useconfigwithbasepath-and-usetextfontfamilyfromtheme-hooks-are-removed
//as useBasePath is removed, we need to manually set the base path for each studio
const basePaths = {
  tech: '/studio/tech',
  lifestyle: '/studio/lifestyle',
  reviews: '/studio/reviews',
}

const defaultConfig = (type: string) => {
  const plugins = [
    visionTool({
      defaultApiVersion: '2022-11-11',
    }),
    productionUrl({
      apiVersion: config.sanity.apiVersion,
      previewSecretId: config.sanity.previewSecretId,
      types: ['article', 'person', 'section'],
    }),
  ]

  const minimumUserPlugins = [
    mediaConfigPlugin(),
    unsplashImageAsset(),
    variations(),
  ]
  minimumUserPlugins.forEach((plugin) => plugins.push(plugin))

  if (type === 'tech') {
    const techPlugins = [scheduledPublishing(), newsletterPlugin()]
    techPlugins.forEach((plugin) => plugins.push(plugin))
  }

  return definePlugin({
    name: 'default-config',
    schema: {
      types: schemaTypes,
      templates: (prev) => schemaTemplates(prev, type),
    },
    plugins,
  })()
}

// create Sanity client from config
const client = createClient({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  apiVersion: config.sanity.apiVersion,
  useCdn: false,
})

let studioConfig: WorkspaceOptions[] = [
  {
    basePath: basePaths.tech,
    name: 'tech',
    projectId: config.sanity.projectId,
    dataset: config.sanity.dataset,
    title: config.sanity.projectTitle || 'Technology',
    plugins: [
      deskTool({
        structure: techStructure,
        defaultDocumentNode,
      }),
      defaultConfig('tech'),
    ],
    icon: TechWorkspaceLogo,
    studio: {
      components: {
        logo: TechLogo,
      },
    },
  },
]

//unfortunately, this doesn't work in Safari.
//Safari users will be limited to the initial config
const currentUser = await client.request({
  uri: '/users/me',
  withCredentials: true,
})

if (currentUser?.role === 'administrator' || currentUser?.role === 'write') {
  studioConfig = [
    ...studioConfig,
    {
      name: 'lifestyle',
      basePath: basePaths.lifestyle,
      projectId: config.sanity.projectId,
      dataset: config.sanity.dataset,
      title: config.sanity.projectTitle || 'Lifestyle',
      theme,
      plugins: [
        deskTool({
          structure: lifestyleStructure,
          defaultDocumentNode,
        }),
        defaultConfig('lifestyle'),
      ],
      icon: LifestyleWorkspaceLogo,
      studio: {
        components: {
          logo: LifestyleLogo,
        },
      },
    },
    {
      name: 'reviews',
      basePath: basePaths.reviews,
      projectId: reviewConfig.sanity.projectId,
      dataset: reviewConfig.sanity.dataset || 'reviews',
      title: reviewConfig.sanity.projectTitle || 'Reviews',
      theme,
      plugins: [
        deskTool({structure: reviewStructure}),
        defaultConfig('reviews'),
      ],
      icon: ReviewsWorkspaceLogo,
      studio: {
        components: {
          logo: ReviewsLogo,
        },
      },
    },
  ]
}

export default defineConfig(studioConfig)

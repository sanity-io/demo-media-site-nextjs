/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import {scheduledPublishing} from '@sanity/scheduled-publishing'
import {visionTool} from '@sanity/vision'
import {theme} from 'https://themer.sanity.build/api/hues?preset=tw-cyan&primary=b595f9'
import {config, reviewConfig} from 'lib/config'
import {productionUrl} from 'plugins/productionUrl'
import {defineConfig, definePlugin} from 'sanity'
import {deskTool} from 'sanity/desk'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'

import {
  LifestyleLogo,
  LifestyleWorkspaceLogo,
  ReviewsLogo,
  ReviewsWorkspaceLogo,
  TechLogo,
  TechWorkspaceLogo,
} from './logo'
import {mediaConfigPlugin, structure} from './plugins/config'
import defaultDocumentNode from './plugins/config/defaultDocumentNode'
import newsletterPlugin from './plugins/newsletter'
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
    deskTool({
      structure: (S, context) => structure(S, context, type),
      defaultDocumentNode,
    }),
    visionTool({
      defaultApiVersion: '2022-11-11',
    }),
    productionUrl({
      apiVersion: config.sanity.apiVersion,
      previewSecretId: config.sanity.previewSecretId,
      types: ['article', 'person', 'section'],
    }),
  ]

  if (type !== 'reviews') {
    const minimumUserPlugins = [
      mediaConfigPlugin(),
      unsplashImageAsset(),
      variations(),
    ]
    minimumUserPlugins.forEach((plugin) => plugins.push(plugin))
  }

  if (type === 'tech') {
    const techPlugins = [scheduledPublishing(), newsletterPlugin()]
    techPlugins.forEach((plugin) => plugins.push(plugin))
  }

  return definePlugin({
    name: 'default-config',
    schema: {
      types: (prev) => schemaTypes(prev, type),
      templates: schemaTemplates,
    },
    plugins,
  })()
}

export default defineConfig([
  {
    basePath: basePaths.tech,
    name: 'tech',
    projectId: config.sanity.projectId,
    dataset: config.sanity.dataset,
    title: config.sanity.projectTitle || 'Technology',
    plugins: [defaultConfig('tech')],
    icon: TechWorkspaceLogo,
    studio: {
      components: {
        logo: TechLogo,
      },
    },
  },
  {
    name: 'lifestyle',
    basePath: basePaths.lifestyle,
    projectId: config.sanity.projectId,
    dataset: config.sanity.dataset,
    title: config.sanity.projectTitle || 'Lifestyle',
    theme,
    plugins: [defaultConfig('lifestyle')],
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
    plugins: [defaultConfig('reviews')],
    icon: ReviewsWorkspaceLogo,
    studio: {
      components: {
        logo: ReviewsLogo,
      },
    },
  },
])

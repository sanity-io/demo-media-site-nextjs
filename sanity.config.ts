/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

//import {dashboardTool} from '@sanity/dashboard'
import {scheduledPublishing} from '@sanity/scheduled-publishing'
import {visionTool} from '@sanity/vision'
import {theme} from 'https://themer.sanity.build/api/hues?preset=tw-cyan&primary=b595f9'
import {defineConfig, definePlugin} from 'sanity'
import {deskTool} from 'sanity/desk'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
// import DocumentsPane from 'sanity-plugin-documents-pane'
import {workflow} from 'sanity-plugin-workflow'

import {
  EntertainmentWorkspaceLogo,
  GossipWorkspaceLogo,
  HighFashionWorkspaceLogo,
  LifestyleLogo,
  LifestyleWorkspaceLogo,
  OutdoorsWorkspaceLogo,
  ReviewsLogo,
  ReviewsWorkspaceLogo,
  TechLogo,
  TechWorkspaceLogo,
} from './logo'
import {mediaConfigPlugin, structure} from './plugins/config'
import defaultDocumentNode from './plugins/config/defaultDocumentNode'
import newsletterPlugin from './plugins/newsletter'
import {reviewsPlugin} from './plugins/reviews'
import variations from './plugins/variations'
import {schemaTemplates, schemaTypes} from './schemas'
import { config, reviewConfig } from 'lib/config'

// @TODO: update next-sanity/studio to automatically set this when needed
const basePaths = {
  tech: '/studio/tech',
  lifestyle: '/studio/lifestyle',
  reviews: '/studio/reviews',
  highFashion: '/studio/highFashion',
  outdoors: '/studio/outdoors',
  gossip: '/studio/gossip',
  entertainment: '/studio/entertainment',
}

const defaultConfig = (type: string) => {
  const plugins = [
    deskTool({
      structure: (S, context) => structure(S, context, type),
      defaultDocumentNode,
    }),
  ]

  if (type === 'reviews') {
    plugins.push(reviewsPlugin())
  } else {
    const minimumUserPlugins = [
      mediaConfigPlugin(),
      unsplashImageAsset(),
      variations(),
    ]
    minimumUserPlugins.forEach((plugin) => plugins.push(plugin))
  }

  if (type === 'tech') {
    const techPlugins = [
      scheduledPublishing(),
      newsletterPlugin(),
      workflow({
        schemaTypes: ['article'],
      }),
    ]
    //@ts-ignore -- type error from workflow
    techPlugins.forEach((plugin) => plugins.push(plugin))
  }

  //@TODO: remove this after the recording -- it's nice to have vision in demos :)
  if (config.env === 'development') {
    plugins.push(
      visionTool({
        defaultApiVersion: '2022-11-11',
      })
    )
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

'use client'

import {definePreview} from 'next-sanity/preview'

import {config} from './config'

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview as you're not logged in`)
}

const {projectId, dataset} = config.sanity

export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly,
})

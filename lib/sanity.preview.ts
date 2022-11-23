'use client'

import { definePreview } from 'next-sanity/preview'

import { dataset, projectId } from './config'

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview as you're not logged in`)
}

export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly,
})

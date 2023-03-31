/**
 * This plugin sets up the "Open preview (CTRL + ALT + O)" in the dropdown menu that hosts
 * other actions like "Review changes" and "Inspect"
 */

import {definePlugin} from 'sanity'

import {getSecret, useBuildPreviewUrl} from './utils'
import {buildPreviewUrl} from './utils/buildPreviewUrl'

export const productionUrl = definePlugin<{
  previewSecretId: `${string}.${string}`
  types: string[]
  apiVersion?: string
}>(({previewSecretId, types: _types, apiVersion = '2022-11-17'}) => {
  if (!previewSecretId) {
    throw new TypeError('`previewSecretId` is required')
  }
  if (!previewSecretId.includes('.')) {
    throw new TypeError(
      '`previewSecretId` must contain a `.` to ensure it can only be queried by authenticated users'
    )
  }
  if (!_types || _types.length === 0) {
    throw new TypeError('`types` is required')
  }
  const types = new Set(_types)
  return {
    name: 'productionUrl',
    document: {
      productionUrl: async (prev, {document, getClient}) => {
        const client = getClient({apiVersion})
        const secret = await getSecret(client, previewSecretId, true)
        if (secret && types.has(document._type)) {
          return buildPreviewUrl({document, secret})
        }
        return prev
      },
    },
  }
})

export {buildPreviewUrl, getSecret, useBuildPreviewUrl}

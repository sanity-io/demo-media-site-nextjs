import {useClient} from 'sanity'
import {suspend} from 'suspend-react'
import {BrandSlugDocument} from 'types'

import {config} from '../../../lib/config'
import {buildPreviewUrl} from './buildPreviewUrl'
import {getSecret} from './getSecret'

// Used as a cache key that doesn't risk collision or getting affected by other components that might be using `suspend-react`
const fetchSecret = Symbol('preview.secret')

export const useBuildPreviewUrl = (document: BrandSlugDocument): string => {
  const {apiVersion, previewSecretId} = config.sanity

  const client = useClient({apiVersion})

  const secret = suspend(
    // @ts-ignore
    () => getSecret(client, previewSecretId, true),
    [getSecret, previewSecretId, fetchSecret],
    // The secret fetch has a TTL of 1 minute, just to check if it's necessary to recreate the secret which has a TTL of 60 minutes
    {lifespan: 60000}
  )

  return buildPreviewUrl({document, secret})
}

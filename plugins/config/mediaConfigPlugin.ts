import {definePlugin} from 'sanity'
import {media, mediaAssetSource} from 'sanity-plugin-media'

const mediaConfigPlugin = definePlugin({
  name: 'mediaConfigPlugin',
  plugins: [media()],
  form: {
    // Don't use this plugin when selecting files only (but allow all other enabled asset sources)
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter(
          (assetSource) => assetSource !== mediaAssetSource
        )
      },
    },
    // Filter out the default image selector
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter(
          (assetSource) => assetSource.name !== 'sanity-default'
        )
      },
    },
  },
})

export {mediaConfigPlugin}

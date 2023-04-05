import {loadEnvConfig} from '@next/env'
import {config} from 'lib/config'
import {defineCliConfig} from 'sanity/cli'
import {nodePolyfills} from 'vite-plugin-node-polyfills'
import topLevelAwait from 'vite-plugin-top-level-await'

const dev = config.env !== 'production'
loadEnvConfig(__dirname, dev, {info: () => null, error: console.error})

const projectId = config.sanity.projectId
const dataset = config.sanity.dataset

export default defineCliConfig({
  api: {projectId, dataset},
  vite: (prev) => ({
    ...prev,
    plugins: [
      ...prev.plugins,
      //@ts-ignore
      nodePolyfills({util: true}),
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: '__tla',
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: (i) => `__tla_${i}`,
      }),
    ],
    define: {
      ...prev.define,
      'process.env': {},
    },
  }),
})

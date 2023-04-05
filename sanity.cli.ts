import {loadEnvConfig} from '@next/env'
import {config} from 'lib/config'
import {defineCliConfig} from 'sanity/cli'
import {nodePolyfills} from 'vite-plugin-node-polyfills'

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
    ],
    define: {
      ...prev.define,
      'process.env': {},
    },
  }),
})

import {loadEnvConfig} from '@next/env'
import {UserViteConfig} from '@sanity/cli'
import {config} from 'lib/config'
import {defineCliConfig} from 'sanity/cli'
import {nodePolyfills} from 'vite-plugin-node-polyfills'

const dev = config.env !== 'production'
loadEnvConfig(__dirname, dev, {info: () => null, error: console.error})

const projectId = config.sanity.projectId
const dataset = config.sanity.dataset

export default defineCliConfig({
  api: {projectId, dataset},
  vite: (prev: UserViteConfig) => ({
    ...prev,
    build: {
      ...prev.build,
      target: 'esnext',
    },
    plugins: [...prev.plugins, nodePolyfills({util: true})],
    define: {
      ...prev.define,
      'process.env': {},
    },
  }),
})

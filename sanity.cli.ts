import {loadEnvConfig} from '@next/env'
import {config} from 'lib/config'
import {createCliConfig} from 'sanity/cli'

const dev = config.env !== 'production'
loadEnvConfig(__dirname, dev, {info: () => null, error: console.error})

const projectId = config.sanity.projectId
const dataset = config.sanity.dataset

export default createCliConfig({api: {projectId, dataset}})

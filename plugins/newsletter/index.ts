import { definePlugin } from 'sanity'
import { InputWrappers } from './components'

declare module 'sanity' {
  export interface ArrayOptions {
    showSyncButton?: boolean
  }
}

export default definePlugin({
  name: 'newsletterPlugin',
  document: {},
  form: {
    components: {
      input: InputWrappers,
    },
  },
})

export * from './components/preview'

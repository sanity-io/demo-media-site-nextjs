import { definePlugin } from 'sanity'
import { InputWrappers } from './components'

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

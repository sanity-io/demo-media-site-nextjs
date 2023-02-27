
import {definePlugin} from 'sanity'
import { muxInput } from 'sanity-plugin-mux-input'
import { schemaTypes } from './schemas'

export default definePlugin({
  name: 'transcribedVideo',
  plugins: [muxInput()],
  schema: {
    types: schemaTypes,
  },
})
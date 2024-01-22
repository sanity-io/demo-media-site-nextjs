import {definePlugin} from 'sanity'

import nutritionalData from './nutritionalData'

export const nutritionalDataPlugin = definePlugin(() => {
  return {
    name: 'nutritonal-data',
    schema: {
      types: [nutritionalData],
    },
  }
})

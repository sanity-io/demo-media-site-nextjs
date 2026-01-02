import {defineType} from 'sanity'

export default defineType({
  name: 'stockInfo',
  title: 'Stock Info',
  type: 'object',
  fields: [
    {
      name: 'symbol',
      title: 'Symbol',
      type: 'string',
    },
  ],
})

import {defineType} from 'sanity'
import {referenceBrandFilter} from 'schemas/utils'

export default defineType({
  type: 'reference',
  name: 'articleReference',
  title: 'Article Reference',
  to: [{type: 'article'}],
  options: {
    filter: referenceBrandFilter,
  },
})

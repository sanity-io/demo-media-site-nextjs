import {defineType} from 'sanity'

export default defineType({
  type: 'reference',
  name: 'articleReference',
  title: 'Article Reference',
  to: [{type: 'article'}],
})

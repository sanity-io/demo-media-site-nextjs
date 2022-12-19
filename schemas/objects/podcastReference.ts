import {defineType} from 'sanity'

export default defineType({
  type: 'reference',
  name: 'podcastReference',
  title: 'Podcast Reference',
  to: [{type: 'podcast'}],
})

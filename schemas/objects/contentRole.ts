import {defineField, defineType} from 'sanity'

import {referenceBrandFilter} from '../utils'

export default defineType({
  name: 'contentRole',
  title: 'Content role',
  type: 'object',
  fields: [
    defineField({
      name: 'role',
      type: 'string',
      options: {
        list: [
          {value: 'author', title: 'Author'},
          {value: 'contributor', title: 'Contributor'},
          {value: 'photographer', title: 'Photographer'},
          {value: 'copyEditor', title: 'Copy editor'},
        ],
      },
    }),
    defineField({
      name: 'person',
      type: 'reference',
      to: [{type: 'person'}],
      options: {
        filter: referenceBrandFilter,
      },
    }),
  ],
  preview: {
    select: {
      title: 'person.name',
      media: 'person.image',
      subtitle: 'role',
    },
  },
})

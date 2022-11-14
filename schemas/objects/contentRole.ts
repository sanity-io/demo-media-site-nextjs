import { defineType } from 'sanity'

export default defineType({
  name: 'contentRole',
  title: 'Content role',
  type: 'object',
  fields: [
    {
      name: 'role',
      type: 'string',
      options: {
        list: [
          { value: 'author', title: 'Author' },
          { value: 'contributor', title: 'Contributor' },
          { value: 'photographer', title: 'Photographer' },
          { value: 'copyEditor', title: 'Copy editor' },
        ],
      },
    },
    {
      name: 'person',
      type: 'reference',
      to: [{ type: 'person' }],
    },
  ],
  preview: {
    select: {
      title: 'person.name',
      media: 'person.image',
      subtitle: 'role',
    },
  },
})

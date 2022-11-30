import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'brand',
      type: 'brand',
      hidden: true,
    }),
    defineField({
      name: 'featured',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'articleReference',
        }),
        defineArrayMember({
          type: 'reviewReference',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})

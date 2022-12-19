import {FiFeather} from 'react-icons/fi'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  icon: FiFeather,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'mainImage',
      name: 'mainImage',
    }),
    defineField({
      name: 'people',
      type: 'array',
      description: 'List of people involved with the production of the article',
      of: [defineArrayMember({type: 'contentRole'})],
    }),
    defineField({
      name: 'sections',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'section'}]}],
    }),
    defineField({
      name: 'intro',
      title: 'Summary',
      description:
        'Used by certain presentations to describe what the article is about',
      type: 'minimalPortableText',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
    }),
    defineField({type: 'seo', name: 'seo', title: 'SEO'}),
    defineField({type: 'brand', name: 'brand', hidden: true}),
  ],
  options: {
    enableVariations: ['title', 'mainImage'],
  },
  preview: {
    select: {
      title: 'title',
      author: 'people.0.person.name',
      media: 'mainImage.image',
    },
    prepare({title, author, media}) {
      return {
        title,
        subtitle: author,
        media,
      }
    },
  },
})

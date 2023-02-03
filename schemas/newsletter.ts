import {FiMail} from 'react-icons/fi'
import {defineField, defineType} from 'sanity'

import {getVariablePortableText} from './helpers/getVariablePortableText'

export default defineType({
  name: 'newsletter',
  title: 'Newsletter',
  icon: FiMail,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Summary',
      description:
        'Used by certain presentations to describe what the article is about',
      type: 'minimalPortableText',
    }),
    defineField({
      ...getVariablePortableText('newsletter', 'content'),
      options: {
        showSyncButton: true,
      },
    }),
    defineField({
      name: 'hasCustomTextContent',
      title: 'Override Text Content Body',
      description:
        'By default the text version is generated from the HTML version. Enable this to set the text content manually.',
      type: 'boolean',
    }),
    defineField({
      name: 'textContent',
      title: 'Text Content',
      type: 'minimalPortableText',
      hidden: ({parent}) => !parent?.hasCustomTextContent,
    }),
    defineField({type: 'brand', name: 'brand'}),
  ],
  preview: {
    select: {
      title: 'title',
      subject: 'subject',
    },
    prepare({title, subject}) {
      return {
        title,
        subtitle: subject,
      }
    },
  },
})

import { FiFeather } from 'react-icons/fi'
import { defineType } from 'sanity'

export default defineType({
  name: 'portableText',
  type: 'array',
  title: 'Content',
  of: [
    {
      type: 'block',
      title: 'Block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
        { title: 'Figure', value: 'figure' },
        { title: 'Pre', value: 'pre' },
        { title: 'Code', value: 'code' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: 'articleLink',
            icon: FiFeather,
            type: 'object',
            fields: [{ type: 'articleReference', name: 'article' }],
          },
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    },
    { type: 'articleReference', title: 'Article' },
    { type: 'articleReferences', title: 'Articles' },
    { type: 'podcastReference', title: 'Podcast' },
    { type: 'reviewReference', title: 'Review' },
    { type: 'mainImage' },
    { type: 'video' },
  ],
})

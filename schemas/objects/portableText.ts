import {FiFeather} from 'react-icons/fi'
import {defineArrayMember, defineType} from 'sanity'

export const rawPortableTextObj = {
  name: 'portableText',
  type: 'array',
  title: 'Content',
  of: [
    defineArrayMember({
      type: 'block',
      title: 'Block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'},
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: 'articleLink',
            icon: FiFeather,
            type: 'object',
            fields: [{type: 'articleReference', name: 'article'}],
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
    }),
    defineArrayMember({type: 'articleReference', title: 'Article'}),
    defineArrayMember({type: 'podcastReference', title: 'Podcast'}),
    defineArrayMember({type: 'mainImage'}),
    defineArrayMember({type: 'video'}),
  ],
}

//by default, we export this as a top-level object type
//but we can also use the object for contexts where we want more/different blocks
export default defineType(rawPortableTextObj)

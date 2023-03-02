import React from 'react'
import {defineField, defineType} from 'sanity'

// import {InlineTimestamp} from '../components/InlineTimestamp'
// import {InlineTimestampWithCollapse} from '../components/InlineTimestampWithCollapse'
import {ClickableInlineTimestampWithCollapse} from '../components/ClickableInlineTimestampWithCollapse'

export default defineType({
  name: 'timestamp',
  title: 'Timestamp',
  type: 'object',
  options: {
    collapsed: true,
  },
  // components: {item: (props) => <InlineTimestamp {...props} />},
  components: {
    item: (props) => <ClickableInlineTimestampWithCollapse {...props} />,
  },
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'timeRange',
      title: 'Time Range',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
      fields: [
        defineField({
          name: 'start',
          title: 'Start',
          type: 'string',
        }),
        defineField({
          name: 'stop',
          title: 'Stop',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{type: 'person'}],
    }),
  ],
  preview: {
    select: {
      title: 'text',
      start: 'timeRange.start',
      stop: 'timeRange.stop',
    },
    prepare(props: any) {
      const {title, start, stop} = props
      return {
        title: title,
        subtitle: `${start ?? ''} - ${stop ?? ''}`,
      }
    },
  },
})

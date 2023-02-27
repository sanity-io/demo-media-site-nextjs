import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'timestamp',
  title: 'Timestamp',
  type: 'object',
  options: {
    collapsed: true,
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

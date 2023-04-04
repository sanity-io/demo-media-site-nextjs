import {defineField, defineType} from 'sanity'

import NutritionalDataInput from './components/NutritonalDataInput'

export default defineType({
  name: 'nutritionalData',
  title: 'Nutritional Data',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  components: {input: NutritionalDataInput},
  fields: [
    {
      name: 'dataSourceDescription',
      title: 'USDA Data Source',
      type: 'string',
    },
    {
      name: 'dataSourceId',
      type: 'number',
      hidden: true,
    },
    defineField({
      name: 'nutritionalInfo',
      title: 'Nutritional Information',
      type: 'object',
      readOnly: true,
      options: {
        columns: 3,
      },
      fields: [
        {
          name: 'sugar',
          title: 'Sugar (in grams)',
          type: 'number',
        },
        {
          name: 'fat',
          title: 'Fat (in grams)',
          type: 'number',
        },
        {
          name: 'kcal',
          title: 'Calories',
          type: 'number',
        },
      ],
    }),
  ],
})

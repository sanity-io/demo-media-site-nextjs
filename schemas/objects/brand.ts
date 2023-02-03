import {defineField} from 'sanity'

import {BRANDS} from '../../lib/constants'

export default defineField({
  name: 'brand',
  title: 'Brands',
  description: 'Used to colocate documents to only those in the same "Brand"',
  type: 'string',
  hidden: true,
  validation: (Rule) => Rule.required(),
  options: {
    list: BRANDS.map((brand) => ({
      value: brand.name,
      title: brand.title,
    })),
  },
})

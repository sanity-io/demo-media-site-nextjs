import { defineField } from 'sanity'

import { BRANDS } from '../../lib/constants'

export default defineField({
  name: 'brand',
  title: 'Brands',
  description: 'Used to colocate documents to only those in the same "Brand"',
  type: 'string',
  // TODO: Hide field completely once initial value templates are configured
  hidden: ({ document, value }) =>
    !document._id.startsWith(`drafts.`) && Boolean(value),
  validation: (Rule) => Rule.required(),
  options: {
    list: BRANDS.map((brand) => ({
      value: brand.name,
      title: brand.title,
    })),
  },
})

import { FiStar } from 'react-icons/fi'
import { defineField, defineType, Rule } from 'sanity'

export default defineType({
  name: 'reviewReference',
  type: 'object',
  title: 'Review',
  icon: FiStar,
  fields: [
    defineField({
      name: 'review',
      type: 'crossDatasetReference',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET_REVIEWS || 'reviews',
      //required by crossDatasetReference type but not actually required?
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      to: [
        {
          type: 'review',
          preview: {
            select: {
              title: 'title',
              media: 'mainImage.image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'titleOverride',
      type: 'string',
      description: 'Use a custom title for this review.',
      validation: (rule: Rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'titleOverride',
      reviewTitle: 'review.title',
      //broken for some reason
      // media: 'review.mainImage.image'
    },
    prepare({ title, reviewTitle }) {
      return {
        title: title || reviewTitle,
        media: FiStar,
      }
    },
  },
})

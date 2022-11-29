import { definePlugin } from 'sanity'
import { dashboardTool } from '@sanity/dashboard'
import updateReviewStatusWidget from './components/UpdateReviewStatus'

export const reviewsPlugin = definePlugin({
  name: 'reviews',
  plugins: [
    dashboardTool({
      widgets: [
        updateReviewStatusWidget({
          title: 'Update review status',
        }),
      ],
    }),
  ],
})

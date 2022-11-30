import { DashboardWidgetContainer } from '@sanity/dashboard'
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Label,
  Stack,
  Text,
  useToast,
} from '@sanity/ui'
import type { DashboardWidget, LayoutConfig } from '@sanity/dashboard'
import { SearchIcon } from '@sanity/icons'
import { useClient } from 'sanity'
import { useCallback, useEffect, useState } from 'react'

export interface UpdateReviewStatusConfig {
  title: string
  layout?: LayoutConfig
}

export default function updateReviewStatusWidget(config): DashboardWidget {
  return {
    name: 'update-review-status-widget',
    component: function component() {
      return <UpdateReviewStatus {...config} />
    },
    layout: config?.layout,
  }
}

interface ReviewDocument {
  _id: string
  title: string
}

interface ReviewOption {
  value: string
  payload: ReviewDocument
}

function UpdateReviewStatus(config: UpdateReviewStatusConfig) {
  const toast = useToast()
  const client = useClient()
  const [loading, setLoading] = useState(true)
  const [markedReviewId, setMarkedReviewId] = useState<string>()
  const [reviews, setReviews] = useState([])

  const handleLoadReviews = useCallback(async () => {
    setLoading(true)
    const reviews = await client.fetch(
      `*[_type == 'review' && (!defined(soldOut) || soldOut == false)]`
    )
    setReviews(
      reviews.map((review) => ({ value: review?._id, payload: review }))
    )
    setLoading(false)
  }, [client])

  const handleMarkAsSoldOut = useCallback(async () => {
    setLoading(true)
    const reviewIntro = reviews.find(
      (review) => review.value === markedReviewId
    ).payload.intro
    const updatedIntroText =
      'Unfortunately no longer available, ' +
      reviewIntro[0].children[0].text[0].toLowerCase() +
      reviewIntro[0].children[0].text.slice(1)
    const newBlock = {
      ...reviewIntro[0],
      children: [
        {
          ...reviewIntro[0].children[0],
          text: updatedIntroText,
        },
        ...reviewIntro[0].children.slice(1),
      ],
    }

    try {
      await client
        .transaction()
        .patch(markedReviewId, {
          insert: { replace: 'intro[0]', items: [newBlock] },
        })
        .commit()
    } catch (e) {
      console.error(e)
      toast.push({
        status: 'error',
        title: 'Error',
        description: 'Could not mark review as sold out',
      })
    }

    setLoading(false)
  }, [client, markedReviewId, toast, reviews])

  useEffect(() => {
    handleLoadReviews().then(() => setLoading(false))
  }, [])

  return (
    <DashboardWidgetContainer header={config.title}>
      <Card padding={3}>
        <Stack space={3}>
          <Autocomplete
            id="review-autocomplete"
            loading={loading}
            // custom search filter
            filterOption={(query, option: ReviewOption) =>
              option.payload.title.toLowerCase().indexOf(query.toLowerCase()) >
              -1
            }
            onSelect={(value: string) => {
              setMarkedReviewId(value)
            }}
            fontSize={[2, 2, 3]}
            icon={SearchIcon}
            openButton
            // options with `payload`
            options={reviews}
            padding={[3, 3, 4]}
            placeholder="Type to find review …"
            // custom option render function
            renderOption={(option: ReviewOption) => (
              <Card as="button">
                <Flex align="center">
                  <Box flex={1} padding={3}>
                    <Text size={[2, 2, 3]}>{option.payload.title}</Text>
                  </Box>
                </Flex>
              </Card>
            )}
            // custom value render function
            renderValue={(value, option: ReviewOption) =>
              option?.payload.title || value
            }
          />
          <Flex align="stretch" gap={2}>
            <Button
              radius={3}
              paddingY={4}
              paddingX={4}
              fontSize={2}
              mode="default"
              tone="primary"
              text="Mark as sold out"
              disabled={!markedReviewId}
              loading={loading}
              onClick={handleMarkAsSoldOut}
            />
            <Button
              paddingY={3}
              mode="bleed"
              tone="primary"
              text="Refresh"
              loading={loading}
              onClick={handleLoadReviews}
            />
          </Flex>
        </Stack>
      </Card>
    </DashboardWidgetContainer>
  )
}

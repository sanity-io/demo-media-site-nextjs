import type { InputProps, SanityDocumentLike } from 'sanity'
import { Button, Card, Flex, Label, Stack, Text } from '@sanity/ui'
import React, { useCallback, useMemo, useState } from 'react'
import { formatRelative, parseISO } from 'date-fns'

const STATUS_PENDING = 'pending'
const STATUS_SYNCED = 'synced'

interface SyncStatus {
  syncStatus: 'pending' | 'syncing' | 'synced'
  id?: string
  dateSynced?: string
}

function randomString(length: number) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

// https://github.com/sanity-io/sanity/releases/tag/v3.0.0-dev-preview.22
// https://mailchimp.com/developer/marketing/api/campaigns/add-campaign/
export function MailchimpStatusWrapper(props: InputProps) {
  const [status, setStatus] = useState(STATUS_PENDING)
  const [statusDetails, setStatusDetails] = useState<SyncStatus>()

  const handleSync = useCallback(async () => {
    setStatusDetails((prev) =>
      prev ? { ...prev, syncStatus: 'syncing' } : { syncStatus: 'syncing' }
    )
    // setStatus(STATUS_PENDING)
    // const { document } = props
    // const { _id, _type } = document as SanityDocumentLike
    // const id = removePrefix(_id)
    // const url = `/api/mailchimp/sync/${_type}/${id}`
    // const response = await fetch(url, {
    //   method: 'POST',
    // })
    // if (response.ok) {
    //   setStatus(STATUS_SYNCED)
    // }
    setTimeout(() => {
      setStatusDetails({
        syncStatus: 'synced',
        id: randomString(10),
        dateSynced: new Date().toISOString(),
      })
    }, 2500)
  }, [])

  const syncDate = useMemo(() => {
    const dateFormatted = statusDetails?.dateSynced
      ? formatRelative(parseISO(statusDetails.dateSynced), new Date())
      : ''
    return statusDetails?.dateSynced ? `Synced ${dateFormatted}` : 'Not pushed'
  }, [statusDetails])

  // const { _id } = props.value as SanityDocumentLike
  return (
    <Stack space={2}>
      <Card
        paddingY={3}
        paddingX={3}
        radius={1}
        shadow={1}
        tone={status === STATUS_SYNCED ? 'primary' : 'default'}
      >
        <Flex align="center" justify="space-between" gap={1}>
          <Stack space={3}>
            <Label as="p">Mailchimp Status</Label>
            <Text as="p">{syncDate}</Text>
          </Stack>
          <Stack>
            <Button
              tone="primary"
              loading={statusDetails?.syncStatus === 'syncing'}
              text={
                statusDetails?.syncStatus === 'synced'
                  ? 'Update in Mailchimp'
                  : 'Send to Mailchimp'
              }
              onClick={handleSync}
            />
          </Stack>
        </Flex>
      </Card>
      {/* Render the default document form */}
      {props.renderDefault(props)}
    </Stack>
  )
}

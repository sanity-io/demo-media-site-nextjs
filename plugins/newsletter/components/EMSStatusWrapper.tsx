import {Button, Card, Flex, Label, Stack, Text} from '@sanity/ui'
// import {formatRelative, parseISO} from 'date-fns'
import React, {useState} from 'react'
import type {InputProps} from 'sanity'

const STATUS_PENDING = 'pending'
const STATUS_SYNCED = 'synced'

// interface SyncStatus {
//   syncStatus: 'pending' | 'syncing' | 'synced'
//   id?: string
//   dateSynced?: string
// }

// function randomString(length: number) {
//   const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//   let result = ''
//   for (let i = length; i > 0; --i)
//     result += chars[Math.floor(Math.random() * chars.length)]
//   return result
// }

// https://github.com/sanity-io/sanity/releases/tag/v3.0.0-dev-preview.22
// https://mailchimp.com/developer/marketing/api/campaigns/add-campaign/
export function EMSStatusWrapper(props: InputProps) {
  const [status] = useState(STATUS_PENDING)
  // const [_, setStatusDetails] = useState<SyncStatus>()

  // const handleSync = useCallback(() => {
  //   setStatusDetails((prev) =>
  //     prev ? {...prev, syncStatus: 'syncing'} : {syncStatus: 'syncing'}
  //   )
  //   setTimeout(() => {
  //     setStatusDetails({
  //       syncStatus: 'synced',
  //       id: randomString(10),
  //       dateSynced: new Date().toISOString(),
  //     })
  //   }, 2500)
  // }, [])

  // const syncDate = useMemo(() => {
  //   const dateFormatted = statusDetails?.dateSynced
  //     ? formatRelative(parseISO(statusDetails.dateSynced), new Date())
  //     : ''
  //   return statusDetails?.dateSynced ? `Synced ${dateFormatted}` : 'Not pushed'
  // }, [statusDetails])

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
            <Label as="p">EMS Status</Label>
            <Text as="p">No EMS set up for this studio.</Text>
          </Stack>
          <Stack>
            <Button
              tone="primary"
              // loading={statusDetails?.syncStatus === 'syncing'}
              text="Sync"
              // {
              //   statusDetails?.syncStatus === 'synced'
              //     ? 'Update in EMS'
              //     : 'Send to EMS'
              // }
              // onClick={handleSync}
              disabled
            />
          </Stack>
        </Flex>
      </Card>
      {/* Render the default document form */}
      {props.renderDefault(props)}
    </Stack>
  )
}

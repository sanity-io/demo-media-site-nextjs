import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Card, Flex, Spinner, useToast } from '@sanity/ui'
import { SanityDocumentLike } from 'sanity'
import styled from 'styled-components'

export type IframeProps = {
  document: {
    displayed: SanityDocumentLike
  }
}

const WRAPPER_STYLE = { height: `100%` }
const IFRAME_STYLE = { width: '100%', maxHeight: '100%', height: `100%` }

const ButtonWrapper = styled(Box)`
  position: absolute;
  right: 0;
  top: 0;
`

async function fetchEmails(_id: string) {
  const res = await fetch(`/api/newsletter/preview?ids=${_id}`)
  const result = await res.json()

  return result?.output?.htmlOutput
}

export function NewsletterPreview(props: IframeProps) {
  const toast = useToast()
  const { document: sanityDocument } = props
  const id = sanityDocument?.displayed?._id
  const [emailContent, setEmailContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleRefresh = useCallback(async () => {
    setIsLoading(true)
    try {
      setEmailContent(await fetchEmails(id))
    } catch (e) {
      console.error(e)
      toast.push({
        id: 'email-preview-error',
        status: 'error',
        title: 'Could not fetch email content',
        description: e.message,
      })
    }
    setIsLoading(false)
    toast.push({
      id: 'email-preview-success',
      status: 'success',
      title: 'Refreshed preview',
    })
  }, [id, toast])

  useEffect(() => {
    handleRefresh()
  }, [id, handleRefresh])

  return (
    <Flex direction="column" style={WRAPPER_STYLE}>
      {emailContent && (
        <ButtonWrapper padding={2}>
          <Button
            text={'Refresh'}
            onClick={handleRefresh}
            loading={isLoading}
          />
        </ButtonWrapper>
      )}
      <Card padding={0} style={WRAPPER_STYLE}>
        <Flex align="center" justify="center" style={{ height: `100%` }}>
          {emailContent ? (
            <iframe
              title="preview"
              srcDoc={emailContent}
              style={IFRAME_STYLE}
              frameBorder="0"
            />
          ) : (
            <div>
              <Spinner muted />
            </div>
          )}
        </Flex>
      </Card>
    </Flex>
  )
}

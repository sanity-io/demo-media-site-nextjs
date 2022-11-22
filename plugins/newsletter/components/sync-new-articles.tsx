import type { InputProps, SanityDocumentLike } from 'sanity'
import { Box, Button, Card, Flex, Label, Stack, Text } from '@sanity/ui'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { format, formatRelative, parseISO } from 'date-fns'
import { useClient, useFormValue } from 'sanity'
import { PortableTextBlock } from '@portabletext/types'
import groq from 'groq'
import { nanoid } from 'nanoid'

function removePrefix(id?: string) {
  return id?.replace('drafts.', '')
}

interface SyncStatus {
  syncStatus: 'loading' | 'done'
  ids?: string[]
}

interface ArticleReferencesBlock extends PortableTextBlock {
  _type: 'articleReferences'
  _key: string
  references: {
    _ref: string
    _key: string
    _type: 'articleReference'
  }[]
}

groq`*[_type == 'newsletter']{content[_type == 'articleReferences']}`
groq`*[_type=="newsletter" && references(*[_type=="article"]._id)]{title}`

export function SyncNewArticlesWrapper(props: InputProps) {
  const [status, setStatus] = useState<SyncStatus>({ syncStatus: 'loading' })
  const client = useClient({ apiVersion: '2022-03-13' })
  const [statusDetails, setStatusDetails] = useState<SyncStatus>()
  const content = useFormValue(['content']) as PortableTextBlock[]
  const TYPE_REFERENCES = 'articleReferences'
  const QUERY = groq`*[_type=="newsletter" && references(*[_type=="article"]._id)]{title, content[_type == 'articleReferences']}`
  const QUERY_NOT_REFERENCED = groq`*[_type == 'article' && !(_id in $referencedArticles) && !(_id in path("drafts.**"))]._id
`
  const articleReferenceBlock = content?.find(
    (block: any) => block._type === TYPE_REFERENCES
  ) ?? {
    _key: nanoid(10),
    _type: 'articleReferences',
    references: [],
  }

  const handleFetch = useCallback(async () => {
    setStatus({ syncStatus: 'loading' })
    const queryResult = await client.fetch(QUERY)

    // @todo Map all documents
    // @todo Get all reference ids

    const existingReferenceIds = [
      ...new Set(
        queryResult
          ?.map((newsletter: SanityDocumentLike) => {
            const content = (newsletter?.content ||
              []) as ArticleReferencesBlock[]
            return (
              content
                ?.filter((block) => block._type === TYPE_REFERENCES)
                ?.map(
                  (block: ArticleReferencesBlock) =>
                    block.references?.map((reference) => reference._ref) ?? []
                ) ?? []
            )
              .flat()
              .filter(Boolean)
          })
          .flat() ?? []
      ),
    ]

    // Then we get any articles not referenced in any newsletter
    const articleRefs = (await client.fetch(QUERY_NOT_REFERENCED, {
      referencedArticles: existingReferenceIds,
    })) as string[]

    setStatus({ syncStatus: 'done', ids: articleRefs })
  }, [client, QUERY, QUERY_NOT_REFERENCED])

  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  const isLoading = useMemo(() => status.syncStatus === 'loading', [status])
  const pendingArticleCount = useMemo(() => status?.ids?.length || 0, [status])
  const hasPendingArticles = useMemo(
    () => pendingArticleCount > 0,
    [pendingArticleCount]
  )

  const existingReferenceIds = (
    content
      ?.filter((block) => block._type === TYPE_REFERENCES)
      ?.map(
        (block: ArticleReferencesBlock) =>
          block.references?.map((reference) => reference._ref) ?? []
      ) ?? []
  )
    .flat()
    .filter(Boolean)

  console.log({ content, articleReferenceBlock })

  const handleSync = useCallback(async () => {
    // Create new block or update existing
    // setStatusDetails(statusDetails ? { ...statusDetails, syncStatus: 'syncing' } : { syncStatus: 'pending' })
    // setTimeout(() => {
    //   setStatusDetails({ syncStatus: 'synced', dateSynced: new Date().toISOString() })
    // }, 2500)
  }, [statusDetails])

  return (
    <Stack space={4}>
      {/* Render the default document form */}
      {props.renderDefault(props)}
      <Card>
        <Flex gap={2} align="center">
          <Button
            tone="primary"
            loading={isLoading}
            disabled={isLoading}
            text="Pull in new articles"
            onClick={handleSync}
          />
          {pendingArticleCount ? (
            <Box padding={2}>
              <Text size={2} muted>
                {pendingArticleCount} new{' '}
                {pendingArticleCount === 1 ? 'article' : 'articles'} to sync
              </Text>
            </Box>
          ) : null}
        </Flex>
      </Card>
    </Stack>
  )
}

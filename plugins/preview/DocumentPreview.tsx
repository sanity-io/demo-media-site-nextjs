/**
 * This component is responsible for rendering a preview of a document inside the Studio.
 */
import { Card, Text } from '@sanity/ui'
import React, {
  memo,
  startTransition,
  Suspense,
  useEffect,
  useState,
} from 'react'

type Props = {
  slug?: string
  _type: string
}

export default function DocumentPreviewPane(props: Props) {
  // Whenever the slug changes there's it's best to wait a little for elastic search to reach eventual consistency
  // this helps prevent seeing "Invalid slug" or 404 errors while editing the slug manually
  const [slug, setSlug] = useState(props.slug)
  useEffect(() => {
    const timeout = setTimeout(
      () => startTransition(() => setSlug(props.slug)),
      3000
    )
    return () => clearTimeout(timeout)
  }, [props.slug])

  // if the document has no slug for the preview iframe
  if (!slug) {
    return (
      <Card tone="primary" margin={5} padding={6}>
        <Text align="center">
          Please add a slug to the post to see the preview!
        </Text>
      </Card>
    )
  }

  return (
    <Card
      scheme="light"
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <Suspense fallback={null}>
        <Iframe slug={slug} _type={props._type} />
      </Suspense>
    </Card>
  )
}

const Iframe = memo(function Iframe(
  props: Omit<Props, 'slug'> & Required<Pick<Props, 'slug'>>
) {
  const { slug, _type } = props

  const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET

  const url = new URL('/api/preview', location.origin)
  url.searchParams.set('slug', slug)
  url.searchParams.set('type', _type)
  if (secret) {
    url.searchParams.set('secret', secret)
  }

  return (
    <iframe
      style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
      src={url.toString()}
    />
  )
})

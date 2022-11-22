import { CollectionPageJsonLd } from 'next-seo'

import {
  articleBySlugQuery,
  personBySlugQuery,
  sectionBySlugQuery,
} from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'

function redirectToPreview(res, Location) {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})
  // Redirect to a preview capable route
  res.writeHead(307, { Location })
  res.end()
}

export default async function preview(req, res) {
  const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
  // Check the secret if it's provided, enables running preview mode locally before the env var is setup
  if (secret && req.query.secret !== secret) {
    return res.status(401).json({ message: 'Invalid secret' })
  }
  // If no slug is provided open preview mode on the frontpage
  if (!req.query.slug) {
    return redirectToPreview(res, '/')
  }

  // Check if content with given slug exists
  let content = { slug: '' }
  let subpath = ''
  switch (req.query.type) {
    case 'article':
      subpath = 'articles'
      content = await getClient(true).fetch(articleBySlugQuery, {
        slug: req.query.slug,
      })
      break
    case 'section':
      subpath = 'sections'
      content = await getClient(true).fetch(sectionBySlugQuery, {
        slug: req.query.slug,
      })
      break
    case 'person':
      subpath = 'authors'
      content = await getClient(true).fetch(personBySlugQuery, {
        slug: req.query.slug,
      })
      break
    default:
      break
  }

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!content) {
    return res.status(401).json({
      message: `Invalid slug ${req.query.slug} for type ${req.query.type}`,
    })
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  redirectToPreview(res, `/${subpath}/${content.slug}`)
}

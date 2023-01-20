import {config} from 'lib/config'
import {NextApiHandler, NextApiResponse, PageConfig} from 'next'
import {createClient} from 'next-sanity'
import {getSecret} from 'plugins/productionUrl/utils'

import {
  articleBySlugQuery,
  personBySlugQuery,
  sectionBySlugQuery,
} from '../../lib/queries'

// res.setPreviewData only exists in the nodejs runtime, setting the config here allows changing the global runtime
// option in next.config.mjs without breaking preview mode
export const runtimeConfig: PageConfig = {runtime: 'nodejs'}

function redirectToPreview(
  res: NextApiResponse<string | void>,
  previewData: {token?: string},
  Location: `/${string}` | `${string}/${string}/${string}`
): void {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData(previewData)
  // Redirect to a preview capable route
  res.writeHead(307, {Location})
  res.end()
}

const {previewSecretId, projectId, dataset, apiVersion, useCdn, readToken} =
  config.sanity
const _client = createClient({projectId, dataset, apiVersion, useCdn})

const preview: NextApiHandler = async (req, res): Promise<void> => {
  const previewData: {token?: string} = {}

  if (!req.query.secret) {
    return res.status(401).json({message: 'Invalid secret'})
  }

  // If a secret is present in the URL, verify it and if valid we upgrade to token based preview mode, which works in Safari and Incognito mode
  if (req.query.secret) {
    if (!readToken) {
      throw new Error(
        `
        A secret is provided but there is no \`SANITY_API_READ_TOKEN\` environment variable setup.
        Please ensure \`SANITY_API_READ_TOKEN\` is in your environment,
        and available in the \`config.ts\` file in the \`lib\` folder.
        `
      )
    }
    const client = _client.withConfig({useCdn: false, token: readToken})
    const secret = await getSecret(client, previewSecretId)
    if (req.query.secret !== secret) {
      return res.status(401).send('Invalid secret')
    }

    previewData.token = readToken
  }

  const slug = req.query.slug
  const brand = req.query.brand ?? 'tech'

  // If no slug is provided open preview mode on the frontpage
  // add brand logic here
  if (!slug) {
    return redirectToPreview(res, previewData, `/${brand}`)
  }

  // Check if content with given slug exists
  let content = {slug: ''}
  let subpath = ''

  //get document type
  const client = _client.withConfig({useCdn: false, token: readToken})
  const docType = await client.fetch(`*[slug.current == $slug][0]._type`, {
    slug,
  })

  switch (docType) {
    case 'article':
      subpath = 'articles'
      content = await client.fetch(articleBySlugQuery, {
        slug,
        brand,
      })
      break
    case 'section':
      subpath = 'sections'
      content = await client.fetch(sectionBySlugQuery, {
        slug,
        brand,
      })
      break
    case 'person':
      subpath = 'authors'
      content = await client.fetch(personBySlugQuery, {
        slug,
      })
      break
    default:
      break
  }

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!content) {
    return res.status(404).json({
      message: `No content found for ${req.query.slug} for type ${req.query.type}`,
    })
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  return redirectToPreview(
    res,
    previewData,
    `/${brand}/${subpath}/${content.slug}`
  )
}

export default preview

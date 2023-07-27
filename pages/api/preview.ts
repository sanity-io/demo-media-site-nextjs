import {config} from 'lib/config'
import {NextApiHandler, NextApiResponse, PageConfig} from 'next'
import {createClient} from 'next-sanity'
import {getSecret} from 'plugins/productionUrl/utils'
import {getUrlForDocumentType} from 'utils/routing'

// res.setPreviewData only exists in the nodejs runtime, setting the config here allows changing the global runtime
// option in next.config.mjs without breaking preview mode
export const runtimeConfig: PageConfig = {runtime: 'nodejs'}

function redirectToPreview(
  res: NextApiResponse<string | void>,
  Location: `/${string}` | `${string}/${string}/${string}`
): void {
  // Enable Preview Mode by setting the cookies
  // Redirect to a preview capable route
  res.writeHead(307, {Location})
  res.end()
}

const {previewSecretId, projectId, dataset, apiVersion, useCdn, readToken} =
  config.sanity
const _client = createClient({projectId, dataset, apiVersion, useCdn})

const preview: NextApiHandler = async (req, res): Promise<void> => {
  const previewData: {token?: string} = {}
  const client = _client.withConfig({useCdn: false, token: readToken})

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

    // @ts-ignore
    const secret = await getSecret(client, previewSecretId)
    if (req.query.secret !== secret) {
      return res.status(401).send('Invalid secret')
    }

    previewData.token = readToken
    res.setPreviewData(previewData)
  }

  const slug = req.query.slug
  const brand = req.query.brand ?? 'tech'

  // If no slug is provided open preview mode on the frontpage
  // add brand logic here
  if (!slug) {
    return redirectToPreview(res, `/${brand}`)
  }

  //get document type
  const docType = await client.fetch(`*[slug.current == $slug][0]._type`, {
    slug,
  })
  const pathname = getUrlForDocumentType(
    docType,
    slug as string,
    brand as string
  )

  //SEO preview logic: SEO panel should receive page as HTML string.
  //we send the "fetch" query param to the preview endpoint to trigger this logic
  if (req.query.fetch) {
    const proto =
      //eslint-disable-next-line no-process-env
      process.env.NODE_ENV === 'development' ? `http://` : `https://`
    const host = req.headers.host
    const absoluteUrl = new URL(`${proto}${host}${pathname}`).toString()

    // Create preview headers from the setPreviewData above
    const previewHeader = res.getHeader('Set-Cookie')
    const previewHeaderString =
      typeof previewHeader === 'string' || typeof previewHeader === 'number'
        ? previewHeader.toString()
        : previewHeader?.join('; ')
    const headers = new Headers()
    headers.append('credentials', 'include')
    headers.append('Cookie', previewHeaderString ?? '')

    const previewHtml = await fetch(absoluteUrl, {
      credentials: `include`,
      headers,
    })
      .then((previewRes) => previewRes.text())
      .catch((err) => console.error(err))
    const corsOrigin =
      //eslint-disable-next-line no-process-env
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3333'
        : 'https://demo-media-site-nextjs.sanity.studio'
    res.setHeader('Access-Control-Allow-Origin', corsOrigin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    return res.send(previewHtml)
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  return redirectToPreview(res, pathname)
}

export default preview

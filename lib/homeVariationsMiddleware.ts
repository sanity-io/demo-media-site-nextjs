/**
 * Logic to fetch the available experiments and determine which to show to a user
 */
import {NextMiddleware, NextRequest, NextResponse} from 'next/server'

import {config} from './config'

const {projectId, dataset, apiVersion} = config.sanity

// this query must match the filter and order of the home page
// but only needs to fetch the ones we are going to experiment on
const query = `
*[_type == "article" && defined(variations) && brand == $brand] | order(date desc, _updatedAt desc) [0...3] {
    _id,
    'variations': variations[]._key
}
`

interface Article {
  _id: string
  variations?: string[]
}

const urlQuery = encodeURIComponent(query)

const queryUrl = (brand: string) =>
  new URL(
    `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${urlQuery}&$brand="${brand}"`
  )

// NOTE this calls the APICDN for every view of the homepage
// Although Netlify has a way to rewrite HTML in edge middleware, and thus not call the API for every page view,
// Vercel does not have such a capability, so we have to do this on every page view for now.
const fetchArticles = async (brand: string) => {
  const response = await fetch(queryUrl(brand))
  const {result} = (await response.json()) as {result: Article[]}
  return result
}

export const homeMiddleware: NextMiddleware = async (request: NextRequest) => {
  const currentExperiments = JSON.parse(
    request.cookies.get('homeContent')?.value || '{}'
  )
  const brand = request.nextUrl.pathname.split('/')[1]

  const articles = await fetchArticles(brand)

  const newExperiments = {}

  articles.forEach((article) => {
    const currentVariant = currentExperiments[article._id]

    if (
      currentVariant &&
      (currentVariant === 'fallback' ||
        article.variations?.includes(currentVariant))
    ) {
      // preserve existing experiments
      //@ts-expect-error
      newExperiments[article._id] = currentExperiments[article._id]
    } else if (article.variations) {
      // add 1 to account for the fallback/baseline content!
      //@ts-expect-error
      newExperiments[article._id] =
        article.variations[
          Math.floor(Math.random() * (article.variations.length + 1))
        ] || 'fallback'
    }
  })

  const path = Object.entries(newExperiments)
    .map((item) => item.join(':'))
    .join('/')

  // console.log('newExperiments', newExperiments)

  const response = NextResponse.rewrite(
    new URL(`/${brand}/home/${path}`, request.url)
  )

  const newExperimentsHeaderValue = JSON.stringify(newExperiments)
  // console.log('header', newExperimentsHeaderValue)

  response.cookies.set('homeContent', newExperimentsHeaderValue)

  return response
}

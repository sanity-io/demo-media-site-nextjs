/**
 * Logic to fetch the available experiments and determine which to show to a user
 */
import { NextMiddleware, NextResponse } from 'next/server'
import { getBrandName } from 'utils/brand'

import { sanityConfig } from './config'

const { projectId, dataset, apiVersion } = sanityConfig

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

const queryUrl = new URL(
  `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${urlQuery}&$brand="${getBrandName()}"`
)

// NOTE this calls the APICDN for every view of the homepage
// Although Netlify has a way to rewrite HTML in edge middleware, and thus not call the API for every page view,
// Vercel does not have such a capability, so we have to do this on every page view for now.
const fetchArticles = async () => {
  const response = await fetch(queryUrl)
  const { result } = (await response.json()) as { result: Article[] }
  return result
}

export const homeMiddleware: NextMiddleware = async (request) => {
  const currentExperiments = JSON.parse(
    request.cookies.get('homeContent')?.value || '{}'
  )

  const articles = await fetchArticles()

  const newExperiments = {}

  articles.forEach((article) => {
    const currentVariant = currentExperiments[article._id]

    if (
      currentVariant &&
      (currentVariant === 'fallback' ||
        article.variations?.includes(currentVariant))
    ) {
      // preserve existing experiments
      newExperiments[article._id] = currentExperiments[article._id]
    } else if (article.variations) {
      // add 1 to account for the fallback/baseline content!
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

  const response = NextResponse.rewrite(new URL(`/home/${path}`, request.url))

  const newExperimentsHeaderValue = JSON.stringify(newExperiments)
  // console.log('header', newExperimentsHeaderValue)

  response.cookies.set('homeContent', newExperimentsHeaderValue)

  return response
}

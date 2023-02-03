/* eslint-disable no-process-env */
export type Config = {
  env: string
  brand: string
  lifestyleBrand: string
  git: {
    repoOwner?: string
    repoProvider?: string
    repoSlug?: string
  }

  sanity: {
    projectId: string
    dataset: string
    apiVersion: string
    projectTitle?: string
    useCdn?: boolean
    readToken?: string
    writeToken?: string
    previewSecretId: `${string}.${string}`
  }
  revalidateSecret?: string
}

export const config: Config = {
  env: process.env.NODE_ENV || 'development',
  brand: process.env.NEXT_PUBLIC_BRAND || 'tech',
  lifestyleBrand: process.env.NEXT_PUBLIC_LIFESTYLE_BRAND || 'lifestyle',
  git: {
    repoOwner: process.env.NEXT_PUBLIC_GIT_REPO_OWNER,
    repoProvider: process.env.NEXT_PUBLIC_GIT_REPO_PROVIDER,
    repoSlug: process.env.NEXT_PUBLIC_GIT_REPO_SLUG,
  },
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ejk8qe4e',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2022-03-13',
    projectTitle: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
    // useCdn == true gives fast, cheap responses using a globally distributed cache.
    // When in production the Sanity API is only queried on build-time, and on-demand when responding to webhooks.
    // Thus the data need to be fresh and API response time is less important.
    // When in development/working locally, it's more important to keep costs down as hot reloading can incurr a lot of API calls
    // And every page load calls getStaticProps.
    // To get the lowest latency, lowest cost, and latest data, use the Instant Preview mode
    // see https://www.sanity.io/docs/api-versioning for how versioning works
    useCdn:
      typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
    readToken: process.env.SANITY_API_READ_TOKEN,
    writeToken: process.env.SANIY_API_WRITE_TOKEN,
    previewSecretId: `preview.secret`,
  },
  revalidateSecret: process.env.SANIY_REVALIDATE_SECRET,
  // This is the document id used for the preview secret that's stored in your dataset.
  // The secret protects against unauthorized access to your draft content and have a lifetime of 60 minutes, to protect against bruteforcing.
}

export const reviewConfig: Config = {
  ...config,
  sanity: {
    ...config.sanity,
    dataset: process.env.NEXT_PUBLIC_SANITY_REVIEW_DATASET || 'reviews',
  },
}

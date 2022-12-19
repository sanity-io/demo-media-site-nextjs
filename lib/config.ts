/* eslint-disable no-process-env */
export type Config = {
  env: string
  brand: string
  git: {
    repoOwner?: string
    repoProvider?: string
    repoSlug?: string
  }

  sanity: {
    projectId?: string
    projectTitle?: string
    dataset?: string
    useCdn?: boolean
    apiVersion?: string
    readToken?: string
    writeToken?: string
  }
  revalidateSecret?: string
  previewSecret?: string
}

export const config: Config = {
  env: process.env.NODE_ENV || 'development',
  brand: process.env.NEXT_PUBLIC_BRAND || 'tech',
  git: {
    repoOwner: process.env.NEXT_PUBLIC_GIT_REPO_OWNER,
    repoProvider: process.env.NEXT_PUBLIC_GIT_REPO_PROVIDER,
    repoSlug: process.env.NEXT_PUBLIC_GIT_REPO_SLUG,
  },
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    projectTitle: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    // useCdn == true gives fast, cheap responses using a globally distributed cache.
    // When in production the Sanity API is only queried on build-time, and on-demand when responding to webhooks.
    // Thus the data need to be fresh and API response time is less important.
    // When in development/working locally, it's more important to keep costs down as hot reloading can incurr a lot of API calls
    // And every page load calls getStaticProps.
    // To get the lowest latency, lowest cost, and latest data, use the Instant Preview mode
    // see https://www.sanity.io/docs/api-versioning for how versioning works
    useCdn:
      typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
    apiVersion: '2022-03-13',
    readToken: process.env.SANITY_API_READ_TOKEN,
    writeToken: process.env.SANIY_API_WRITE_TOKEN,
  },
  revalidateSecret: process.env.SANIY_REVALIDATE_SECRET,
  previewSecret: process.env.NEXT_PUBLIC_PREVIEW_SECRET,
}

export const reviewConfig: Config = {
  ...config,
  sanity: {
    ...config.sanity,
    dataset: process.env.NEXT_PUBLIC_SANITY_REVIEW_DATASET || 'reviews',
  },
}

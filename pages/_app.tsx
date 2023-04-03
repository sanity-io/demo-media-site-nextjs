import '../styles/index.css'

import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import {useRouter} from 'next/router'
import {DefaultSeo} from 'next-seo'
import Home from 'pages'
import type {ReactElement, ReactNode} from 'react'
import * as React from 'react'

import LayoutTech from '../components/Layout'
import LayoutLifestyle from '../components/LayoutLifestyle'
import seoConfig from '../lib/next-seo.config'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {
  // Don't wrap the index page in a brand-specific layout
  const router = useRouter()

  if (router.asPath === '/') {
    return <Home {...pageProps} />
  }

  const brand = pageProps?.data?.brand || pageProps?.brand

  const Layout = brand === 'lifestyle' ? LayoutLifestyle : LayoutTech
  // Use the layout defined at the page level, if available
  const pageWithLayout = (page: ReactElement) => {
    if (Component.getLayout) {
      return Component.getLayout(page)
    }
    return <Layout preview={pageProps.preview}>{page}</Layout>
  }

  return (
    <>
      <DefaultSeo {...seoConfig(brand)} />
      {pageWithLayout(<Component {...pageProps} />)}
    </>
  )
}

export default MyApp

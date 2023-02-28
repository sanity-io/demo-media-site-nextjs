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
import {getBrandName} from '../utils/brand'

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

  const Layout = getBrandName() === 'lifestyle' ? LayoutLifestyle : LayoutTech
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        <DefaultSeo {...seoConfig} />
        <Layout preview={pageProps.preview}>
          {/* @ts-ignore */}
          {page}
        </Layout>
      </>
    ))

  // @ts-ignore
  return getLayout(<Component {...pageProps} />)
}

export default MyApp

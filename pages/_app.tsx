import '../styles/index.css'
import Layout from '../components/layout'
import { DefaultSeo } from 'next-seo';
import seoConfig from '../lib/next-seo.config';
import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type { AppProps } from 'next/app'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
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

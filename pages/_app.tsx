import '../styles/index.css'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return <>
    <DefaultSeo {...seoConfig} />
    <Layout>
      {/* @ts-ignore */}
      {children}
    </Layout>
  </>

  return <Component {...pageProps} />
}

export default MyApp

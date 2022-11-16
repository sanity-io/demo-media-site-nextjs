import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  titleTemplate: '%s - Media Site',
  defaultTitle: 'Media Site',
  description: 'A demo of the Sanity.io editorial workflow',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: 'https://www.url.ie/',
    siteName: 'Media Site',
  },
  additionalLinkTags: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/favicon/site.webmanifest',
    },
    {
      rel: 'mask-icon',
      href: '/favicon/safari-pinned-tab.svg',
      color: '#000000',
    },
    {
      rel: 'shortcut icon',
      href: '/favicon/favicon.ico',
    },
    /*
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
     */
  ],
  additionalMetaTags: [
    {
      name: 'msapplication-TileColor',
      content: 'Jane Doe',
    },
    {
      name: 'msapplication-config',
      content: '/favicon/browserconfig.xml',
    },
    {
      name: 'theme-color',
      content: '#000',
    },
  ],
}

export default config

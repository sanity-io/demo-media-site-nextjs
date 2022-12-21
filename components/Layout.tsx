import * as React from 'react'

import Alert from './Alert'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout({
  preview,
  children,
}: {
  preview: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {preview && <Alert preview={preview} />}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

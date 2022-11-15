import Alert from './alert'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ preview, children }) {
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

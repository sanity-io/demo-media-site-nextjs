import Alert from './Alert'
import Footer from './Footer'
import Navbar from './Navbar'

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

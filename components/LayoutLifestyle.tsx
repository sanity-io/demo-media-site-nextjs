import Alert from './Alert'
import Footer from './Footer'
import NavbarLifestyle from './NavbarLifestyle'

export default function Layout({ preview, children }) {
  return (
    <>
      <NavbarLifestyle />
      <div className="min-h-screen">
        {preview && <Alert preview={preview} />}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

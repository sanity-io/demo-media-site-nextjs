import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const isHomepage = router.pathname === '/'

  return (
    <div
      className={`${
        !isHomepage && `border-b border-gray-200 dark:border-gray-900`
      }`}
    >
      <div className="mx-auto max-w-5xl p-4 text-2xl font-extrabold leading-none tracking-tight sm:text-3xl md:p-5 md:text-4xl lg:px-6">
        <Link className="hover:text-blue-500" href="/">
          ● Media
        </Link>
      </div>
    </div>
  )
}

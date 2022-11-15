import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const isHomepage = router.pathname === '/'

  return (
    <div className={`${!isHomepage && `border-b border-gray-200 dark:border-gray-900`}`}>
      <div className="max-w-5xl mx-auto p-4 md:p-5 lg:px-6 text-2xl font-extrabold leading-none tracking-tight sm:text-3xl md:text-4xl">
        <Link className="hover:text-blue-500" href="/">
          ● Media
        </Link>
      </div>
    </div>
  )
}
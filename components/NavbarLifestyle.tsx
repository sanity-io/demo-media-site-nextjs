import Link from 'next/link'
import { useRouter } from 'next/router'

const SECTIONS = [
  { name: 'Entertainment', href: '/sections/entertainment' },
  { name: 'Wellness', href: '/sections/wellness' },
  { name: 'Beauty', href: '/sections/beauty' },
  { name: 'Fashion', href: '/sections/fashion' },
  { name: 'Must have', href: '/sections/must-have' },
]

const CLASS_NAMES = `uppercase antialiased transition ease-in-out duration-300 text-black-500 hover:text-purple-500`
export default function NavbarLifestyle() {
  const router = useRouter()
  const isLandingPage = router.pathname === '/'

  return (
    <div className={`${!isLandingPage && ``}`}>
      <div className="md:text-2sxl mx-auto flex max-w-5xl flex-col space-y-4 p-4 py-6 text-xl font-extrabold leading-none tracking-tight sm:text-2xl md:p-5 md:py-6 lg:px-6">
        <Link className="mx-auto hover:text-purple-300" href="/">
          <span className="text-purple-300">●</span> Reach
        </Link>

        <nav className="mx-auto flex flex-wrap gap-4 text-sm font-normal leading-snug">
          {SECTIONS.map((section) => (
            <Link
              href={section.href}
              key={section.name.toLowerCase().replace(/\s/g, '-')}
              className={`${
                router.pathname === section.href
                  ? `${CLASS_NAMES} uppercase text-purple-500 antialiased hover:text-purple-700`
                  : CLASS_NAMES
              }`}
            >
              {section.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

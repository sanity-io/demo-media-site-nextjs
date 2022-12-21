import Link from 'next/link'
import * as React from 'react'

export default function SiteHeader({title}: {title: string}) {
  return (
    <h2 className="mt-8 mb-20 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
      <Link href="/" className="hover:underline">
        {title}
      </Link>
    </h2>
  )
}

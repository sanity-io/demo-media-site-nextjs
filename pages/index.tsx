import {BRANDS} from 'lib/constants'
import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <section className="font-merriweather container prose mx-auto max-w-none p-4 font-serif text-lg leading-relaxed dark:prose-invert md:prose-lg lg:prose-xl md:p-12 md:text-xl md:leading-relaxed">
      <h1>Brand sites</h1>
      <ul>
        {BRANDS.map((brand) => (
          <li key={brand.name}>
            <Link href={`/${brand.name}`}>{brand.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

import {BRANDS} from 'lib/constants'
import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <section className="prose mx-auto max-w-prose p-4 font-serif text-lg leading-relaxed dark:prose-invert md:prose-lg lg:prose-xl md:p-12 md:text-xl md:leading-relaxed">
      <h1>Media brands:</h1>
      {BRANDS.map((brand) => (
        <React.Fragment key={brand.name}>
          <h2>{brand.title}</h2>
          <p>
            <Link href={`/${brand.name}`}>{brand.title} Website</Link>
          </p>
          <p>
            <Link href={`/studio/${brand.name}/desk`}>
              {brand.title} Sanity Studio
            </Link>
          </p>
          <hr />
        </React.Fragment>
      ))}
    </section>
  )
}

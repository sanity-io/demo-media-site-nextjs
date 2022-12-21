import * as React from 'react'

export default function Title({children}: {children: React.ReactNode}) {
  return (
    <h1 className="my-3 text-4xl font-extrabold leading-none tracking-tight sm:text-6xl md:text-8xl">
      {children}
    </h1>
  )
}

export function TitleLifeStyle({children}: {children: React.ReactNode}) {
  return (
    <h1 className="mx-auto pt-6 pb-4 text-center text-xl font-extrabold leading-none tracking-tight sm:text-2xl md:p-5 md:py-6 lg:px-6 lg:pt-7">
      <span className="inline text-green-200">●</span> {children}
    </h1>
  )
}

import {ReactNode} from 'react'
import * as React from 'react'

export function Figure(props: {
  caption?: ReactNode
  className?: string
  img?: ReactNode
}) {
  const {caption, className = '', img} = props

  return (
    <figure className={`not-prose ${className}`}>
      {img}

      <figcaption className="mt-1">
        <p className="my-0 text-sm leading-tight">{caption}</p>
      </figcaption>
    </figure>
  )
}

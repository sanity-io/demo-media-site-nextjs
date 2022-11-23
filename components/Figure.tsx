import { ReactNode } from 'react'

export function Figure(props: {
  caption?: ReactNode
  className?: string
  img?: ReactNode
}) {
  const { caption, className, img } = props

  return (
    <figure className={className}>
      {img}

      <figcaption className="mt-1">
        <p className="text-sm leading-tight">{caption}</p>
      </figcaption>
    </figure>
  )
}

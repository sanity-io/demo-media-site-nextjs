import Image from 'next/image'

import { urlForImage } from '../lib/sanity'
import { AuthorProps } from '../types'

export default function Avatar(props: AuthorProps) {
  const { name, image } = props
  return (
    <div className="flex items-center">
      <div className="relative mr-4 h-12 w-12">
        <Image
          src={
            image?.asset?._ref
              ? urlForImage(image).height(96).width(96).fit('crop').url()
              : 'https://source.unsplash.com/96x96/?face'
          }
          className="rounded-full"
          height={96}
          width={96}
          alt={name}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}

import { useId, useRef } from 'react'
import seedrandom from 'seedrandom'

export const useRandom = (values: (string | number)[]) => {
  const seed = useId()
  const random = useRef(values[Math.floor(seedrandom(seed)() * values.length)])

  return random.current
}

export function randomValue(values: (string | number)[]) {
  return values[Math.floor(Math.random() * values.length)]
}

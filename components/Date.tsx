import {format, parseISO} from 'date-fns'
import * as React from 'react'

export default function Date({dateString}: {dateString: string}) {
  if (!dateString) return null

  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}

const padLeft = (value: number, length = 2): string =>
  value.toString().padStart(length, '0')

export function stringifyTimestamp(
  timestamp: number,
) {
  const date = new Date(0, 0, 0, 0, 0, 0, timestamp)

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const ms = Math.floor(
    timestamp - (hours * 3600000 + minutes * 60000 + seconds * 1000)
  )

  return `${padLeft(hours)}:${padLeft(minutes)}:${padLeft(seconds)}${
    ','
  }${padLeft(ms, 3)}`
}
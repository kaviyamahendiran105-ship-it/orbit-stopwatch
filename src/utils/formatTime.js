export function splitTime(milliseconds = 0) {
  const totalCentiseconds = Math.max(0, Math.floor(milliseconds / 10))
  const centiseconds = totalCentiseconds % 100
  const totalSeconds = Math.floor(totalCentiseconds / 100)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)

  return { hours, minutes, seconds, centiseconds }
}

export function pad(value) {
  return String(value).padStart(2, '0')
}

export function formatTime(milliseconds = 0, compact = false) {
  const { hours, minutes, seconds, centiseconds } = splitTime(milliseconds)
  const time = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  return compact ? `${time}.${pad(centiseconds)}` : `${time}.${pad(centiseconds)}`
}

export function formatLap(milliseconds = 0) {
  const { minutes, seconds, centiseconds, hours } = splitTime(milliseconds)
  if (hours > 0) return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`
  return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

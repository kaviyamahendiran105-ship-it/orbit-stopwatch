function splitTime(milliseconds) {
  const centiseconds = Math.floor(milliseconds / 10) % 100
  const seconds = Math.floor(milliseconds / 1000) % 60
  const minutes = Math.floor(milliseconds / 60000) % 60
  return [minutes, seconds, centiseconds]
}

function FlipTile({ value, label }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="flip-unit">
      <div className="flip-tile" aria-hidden="true">
        <span>{text[0]}</span><i /><span>{text[1]}</span>
      </div>
      <span className="flip-unit-label">{label}</span>
    </div>
  )
}

function FlipDigits({ milliseconds }) {
  const [minutes, seconds, centiseconds] = splitTime(milliseconds)
  return (
    <div className="flip-readout" aria-label={`${minutes} minutes, ${seconds} seconds, ${centiseconds} centiseconds`}>
      <FlipTile value={minutes} label="min" />
      <b className="flip-separator">:</b>
      <FlipTile value={seconds} label="sec" />
      <b className="flip-separator flip-separator--small">:</b>
      <FlipTile value={centiseconds} label="cs" />
    </div>
  )
}

export default FlipDigits

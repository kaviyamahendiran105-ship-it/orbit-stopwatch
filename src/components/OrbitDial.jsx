import { memo } from 'react'
import ParticleTrail from './ParticleTrail'
import FlipDigits from './FlipDigits'

const CENTER = 200
const RADIUS = 166
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function pointOnCircle(angle, radius = RADIUS) {
  const radians = (angle - 90) * (Math.PI / 180)
  return { x: CENTER + radius * Math.cos(radians), y: CENTER + radius * Math.sin(radians) }
}

function OrbitDial({ elapsed, laps, isRunning }) {
  const minuteProgress = (elapsed % 60000) / 60000
  const planetAngle = minuteProgress * 360
  const planet = pointOnCircle(planetAngle)
  const arcOffset = CIRCUMFERENCE * (1 - minuteProgress)
  const waveProgress = minuteProgress

  return (
    <div className="dial-wrap orbit-dial" aria-label="Orbit stopwatch dial">
      <svg className="orbit-svg" viewBox="0 0 400 400" role="img" aria-label="Circular dial with minute progress">
        <defs>
          <linearGradient id="orbitArc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
          <radialGradient id="planetGlow">
            <stop offset="0%" stopColor="white" />
            <stop offset="28%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-strong)" stopOpacity="0" />
          </radialGradient>
          <clipPath id="waveClip"><circle cx="200" cy="200" r="130" /></clipPath>
          <filter id="softGlow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <circle className="dial-shadow" cx="200" cy="200" r="142" />
        <circle className="dial-face" cx="200" cy="200" r="136" />
        <circle className="dial-track" cx="200" cy="200" r={RADIUS} />
        <circle className="dial-progress" cx="200" cy="200" r={RADIUS} strokeDasharray={CIRCUMFERENCE} strokeDashoffset={arcOffset} />
        <g className="dial-ticks">
          {Array.from({ length: 60 }, (_, index) => {
            const angle = index * 6
            const outer = pointOnCircle(angle, 184)
            const inner = pointOnCircle(angle, index % 5 === 0 ? 172 : 178)
            return <line key={angle} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} className={index % 5 === 0 ? 'major-tick' : ''} />
          })}
        </g>
        {laps.map((lap) => {
          const marker = pointOnCircle((lap.split / 60000) * 360, 184)
          return <circle key={lap.id} className="lap-marker" cx={marker.x} cy={marker.y} r="4" />
        })}
        <g clipPath="url(#waveClip)" className="wave-group" style={{ '--wave-level': `${(1 - waveProgress) * 100}%` }}>
          <path className="wave wave-back" d="M55 205 C95 186 128 221 166 203 C203 186 225 208 262 196 C303 182 328 203 354 190 L354 360 L55 360 Z" />
          <path className="wave wave-front" d="M45 219 C84 198 112 229 150 215 C186 201 215 228 252 212 C286 198 321 221 360 205 L360 360 L45 360 Z" />
          <rect className="wave-fill" x="50" y="180" width="300" height="180" />
        </g>
        <circle className="inner-ring" cx="200" cy="200" r="130" />
        <ParticleTrail angle={planetAngle} running={isRunning} />
        <circle className="planet-aura" cx={planet.x} cy={planet.y} r="22" />
        <circle className="planet" cx={planet.x} cy={planet.y} r="6" />
        <circle className="planet-core" cx={planet.x - 1} cy={planet.y - 1} r="2" />
      </svg>
      <div className="dial-center-content"><FlipDigits milliseconds={elapsed} /></div>
      <div className="dial-label dial-label--top">01 / 60</div>
      <div className="dial-label dial-label--bottom">ORBIT / {isRunning ? 'LIVE' : 'STANDBY'}</div>
    </div>
  )
}

export default memo(OrbitDial)

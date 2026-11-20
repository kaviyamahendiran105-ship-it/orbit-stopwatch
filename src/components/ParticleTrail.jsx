import { memo } from 'react'

function pointOnCircle(angle, radius, center = 200) {
  const radians = (angle - 90) * (Math.PI / 180)
  return { x: center + radius * Math.cos(radians), y: center + radius * Math.sin(radians) }
}

function ParticleTrail({ angle, running }) {
  const particles = Array.from({ length: 11 }, (_, index) => {
    const point = pointOnCircle(angle - index * 3.6, 166)
    return { ...point, size: Math.max(1.5, 5 - index * 0.35), opacity: Math.max(0.08, 0.66 - index * 0.055) }
  })

  return (
    <g className={`particle-trail ${running ? 'particle-trail--active' : ''}`} aria-hidden="true">
      {particles.map((particle, index) => (
        <circle key={index} cx={particle.x} cy={particle.y} r={particle.size} opacity={particle.opacity} />
      ))}
    </g>
  )
}

export default memo(ParticleTrail)

import { AnimatePresence, motion } from 'framer-motion'
import { Timer } from 'lucide-react'
import { formatLap } from '../utils/formatTime'
import '../styles/lap-list.css'

function LapList({ laps }) {
  const durations = laps.map((lap) => lap.duration)
  const fastest = durations.length > 1 ? Math.min(...durations) : null
  const slowest = durations.length > 1 ? Math.max(...durations) : null
  return (
    <section className="glass-card lap-card" aria-labelledby="laps-title">
      <div className="card-heading">
        <div><span>Telemetry</span><h2 id="laps-title">Lap sequence</h2></div>
      </div>
      <div className="lap-list">
        <AnimatePresence initial={false} mode="popLayout">
          {laps.length === 0 ? (
            <motion.div className="empty-laps" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Timer size={15} /><span>Press Lap to mark a moment.</span></motion.div>
          ) : laps.map((lap) => (
            <motion.div className="lap-row" key={lap.id} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} layout>
              <div className="lap-index"><span>#{String(lap.number).padStart(2, '0')}</span><small>{new Date(lap.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small></div>
              <div className="lap-values"><strong>{formatLap(lap.duration)}</strong><span>split {formatLap(lap.split)}</span></div>
              <div className="lap-badge-wrap">{fastest === lap.duration && <span className="lap-badge lap-badge--fast">FAST</span>}{slowest === lap.duration && <span className="lap-badge lap-badge--slow">SLOW</span>}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default LapList

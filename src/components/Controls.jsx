import { motion } from 'framer-motion'
import { Flag, Pause, Play, RotateCcw } from 'lucide-react'
import '../styles/controls.css'

function Controls({ isRunning, hasElapsed, onToggle, onLap, onReset }) {
  return (
    <div className="controls" aria-label="Stopwatch controls">
      <motion.button className="secondary-control" whileTap={{ scale: .93 }} onClick={onReset} aria-label="Reset stopwatch">
        <RotateCcw size={16} />
        <span>Reset</span>
      </motion.button>
      <motion.button className={`primary-control ${isRunning ? 'primary-control--running' : ''}`} whileTap={{ scale: .94 }} onClick={onToggle} aria-label={isRunning ? 'Pause stopwatch' : 'Start stopwatch'}>
        <span className="control-orbit" />
        {isRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        <span className="sr-only">{isRunning ? 'Pause' : 'Start'}</span>
      </motion.button>
      <motion.button className="secondary-control" whileTap={{ scale: .93 }} onClick={onLap} disabled={!hasElapsed} aria-label="Record lap">
        <Flag size={16} />
        <span>Lap</span>
      </motion.button>
    </div>
  )
}

export default Controls

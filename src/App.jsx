import { useCallback, useEffect, useState } from 'react'
import { History, Maximize2, Minimize2, Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
import OrbitDial from './components/OrbitDial'
import Controls from './components/Controls'
import LapList from './components/LapList'
import HistoryDrawer from './components/HistoryDrawer'
import SeoHead from './components/SeoHead'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useSound } from './hooks/useSound'
import { useStopwatch } from './hooks/useStopwatch'
import { formatTime } from './utils/formatTime'
import './styles/orbit-dial.css'
import './styles/controls.css'
import './styles/utilities.css'

const DEFAULT_SESSION = { elapsed: 0, isRunning: false, savedAt: Date.now() }

function App() {
  const theme = 'neon'
  const [soundEnabled, setSoundEnabled] = useLocalStorage('orbit-sound', true)
  const [laps, setLaps] = useLocalStorage('orbit-laps', [])
  const [history, setHistory] = useLocalStorage('orbit-history', [])
  const [sessionSnapshot, setSessionSnapshot] = useLocalStorage('orbit-session', DEFAULT_SESSION)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [focusMode, setFocusMode] = useState(false)

  const restoredElapsed = sessionSnapshot?.isRunning
    ? sessionSnapshot.elapsed + Math.max(0, Date.now() - sessionSnapshot.savedAt)
    : sessionSnapshot?.elapsed || 0
  const stopwatch = useStopwatch(restoredElapsed, Boolean(sessionSnapshot?.isRunning))
  const { elapsed, isRunning, start, pause, reset, getCurrent } = stopwatch
  const { ping } = useSound(soundEnabled)

  const stateLabel = isRunning ? 'Running' : elapsed > 0 ? 'Paused' : 'Ready'
  const stateClass = isRunning ? 'state-running' : elapsed > 0 ? 'state-paused' : 'state-idle'

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSessionSnapshot({ elapsed: Math.round(getCurrent()), isRunning, savedAt: Date.now() })
    }, 700)
    return () => window.clearInterval(interval)
  }, [getCurrent, isRunning, setSessionSnapshot])

  const recordSession = useCallback(() => {
    const total = Math.round(getCurrent())
    if (total <= 0 && laps.length === 0) return
    setHistory((current) => [{ id: `${Date.now()}-${Math.random()}`, total, laps: laps.length, createdAt: Date.now() }, ...current].slice(0, 18))
  }, [getCurrent, laps.length, setHistory])

  const handleToggle = useCallback(() => {
    if (isRunning) {
      pause()
      ping('pause')
    } else {
      start()
      ping('start')
    }
  }, [isRunning, pause, ping, start])

  const handleLap = useCallback(() => {
    const total = Math.round(getCurrent())
    if (total <= 0) return
    const previousTotal = laps.at(-1)?.split || 0
    const newLap = {
      id: `${Date.now()}-${Math.random()}`,
      number: laps.length + 1,
      duration: total - previousTotal,
      split: total,
      createdAt: Date.now(),
    }
    setLaps((current) => [...current, newLap])
    ping('lap')
  }, [getCurrent, laps, ping, setLaps])

  const handleReset = useCallback(() => {
    recordSession()
    reset()
    setLaps([])
    setSessionSnapshot({ elapsed: 0, isRunning: false, savedAt: Date.now() })
    ping('reset')
  }, [ping, recordSession, reset, setLaps, setSessionSnapshot])

  useKeyboardShortcuts({ onSpace: handleToggle, onLap: handleLap, onReset: handleReset })

  return (
    <div className={`app-shell ${stateClass} ${focusMode ? 'focus-mode' : ''}`} data-theme={theme}>
      <SeoHead />
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><span className="brand-orbit" /></div>
          <div><div className="wordmark">STOPWATCH</div></div>
        </div>
        <div className="topbar-actions">
          <button className="text-button" onClick={() => setHistoryOpen(true)}><History size={14} /> History</button>
          <button className="icon-button" onClick={() => setSoundEnabled((value) => !value)} aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'} title={soundEnabled ? 'Mute sound' : 'Enable sound'}>{soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
          <button className="icon-button" onClick={() => setFocusMode(true)} aria-label="Enter focus mode" title="Focus mode"><Maximize2 size={16} /></button>
        </div>
      </header>

      {focusMode && <button className="focus-exit icon-button" onClick={() => setFocusMode(false)} aria-label="Exit focus mode" title="Exit focus mode"><Minimize2 size={17} /></button>}

      <main className="workspace">
        <section>
          <motion.div className="workspace-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
            <div><div className="eyebrow">Orbit Dial / live instrument</div><h1>Time, in orbit.</h1></div>
          </motion.div>
          <motion.section className="instrument-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .1 }} aria-label="Stopwatch instrument">
            <div className="instrument-meta"><span className="state-label"><i className="state-dot" /> {stateLabel}</span></div>
            <div className="display-stage"><OrbitDial elapsed={elapsed} laps={laps} isRunning={isRunning} /></div>
            <div className="control-row"><Controls isRunning={isRunning} hasElapsed={elapsed > 0} onToggle={handleToggle} onLap={handleLap} onReset={handleReset} /></div>
            <span className="sr-only" aria-live="polite">{formatTime(elapsed)}</span>
          </motion.section>
        </section>
        <motion.aside className="telemetry-rail" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .18 }} aria-label="Session telemetry">
          <div className="telemetry-heading"><span className="eyebrow">Live telemetry</span><span>Session / {laps.length ? `${laps.length} marks` : 'ready'}</span></div>
          <LapList laps={laps} />
        </motion.aside>
      </main>

      <footer className="app-footer">
        <span><i className="footer-pulse" /> Precision timekeeping</span>
        <span className="footer-shortcuts">Space start / pause&nbsp;&nbsp; · &nbsp;&nbsp;L lap&nbsp;&nbsp; · &nbsp;&nbsp;R reset</span>
        <span>Orbit system · 2026</span>
      </footer>

      <HistoryDrawer open={historyOpen} history={history} onClose={() => setHistoryOpen(false)} onClear={() => setHistory([])} />
    </div>
  )
}

export default App

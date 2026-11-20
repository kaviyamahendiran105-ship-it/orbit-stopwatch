import { AnimatePresence, motion } from 'framer-motion'
import { Clock3, Trash2, X } from 'lucide-react'
import { formatDate, formatTime } from '../utils/formatTime'
import '../styles/history-drawer.css'

function HistoryDrawer({ open, history, onClose, onClear }) {
  return <AnimatePresence>{open && <>
    <motion.button className="drawer-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-label="Close history" />
    <motion.aside className="history-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 240 }} aria-label="Session history">
      <div className="drawer-heading"><div><span className="eyebrow">Archive</span><h2>Session history</h2></div><button className="icon-button" onClick={onClose} aria-label="Close history"><X size={17} /></button></div>
      <div className="history-items">{history.length === 0 ? <div className="history-empty"><Clock3 size={20} /><p>Your completed sessions will orbit here.</p></div> : history.map((session) => <div className="history-row" key={session.id}><div className="history-date">{formatDate(session.createdAt)}<span>{new Date(session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div><strong>{formatTime(session.total)}</strong><small>{session.laps} {session.laps === 1 ? 'lap' : 'laps'}</small></div>)}</div>
      <button className="clear-history" onClick={onClear} disabled={!history.length}><Trash2 size={15} /> Clear history</button>
    </motion.aside>
  </>}</AnimatePresence>
}

export default HistoryDrawer

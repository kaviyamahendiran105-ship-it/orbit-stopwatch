import { useEffect } from 'react'

export function useKeyboardShortcuts({ onSpace, onLap, onReset }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable) return
      if (event.code === 'Space') {
        event.preventDefault()
        onSpace()
      } else if (event.key.toLowerCase() === 'l') {
        onLap()
      } else if (event.key.toLowerCase() === 'r') {
        onReset()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSpace, onLap, onReset])
}

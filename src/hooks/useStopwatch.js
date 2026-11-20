import { useCallback, useEffect, useRef, useState } from 'react'

export function useStopwatch(initialElapsed = 0, initialRunning = false) {
  const [elapsed, setElapsed] = useState(initialElapsed)
  const [isRunning, setIsRunning] = useState(initialRunning)
  const elapsedRef = useRef(initialElapsed)
  const baseElapsedRef = useRef(initialElapsed)
  const startedAtRef = useRef(null)
  const frameRef = useRef(null)

  const getCurrent = useCallback(() => {
    if (!startedAtRef.current) return elapsedRef.current
    return baseElapsedRef.current + (performance.now() - startedAtRef.current)
  }, [])

  const tick = useCallback(() => {
    const next = getCurrent()
    elapsedRef.current = next
    setElapsed(next)
    frameRef.current = requestAnimationFrame(tick)
  }, [getCurrent])

  const start = useCallback(() => {
    if (startedAtRef.current) return
    baseElapsedRef.current = elapsedRef.current
    startedAtRef.current = performance.now()
    setIsRunning(true)
    frameRef.current = requestAnimationFrame(tick)
  }, [tick])

  const pause = useCallback(() => {
    if (!startedAtRef.current) return
    const current = getCurrent()
    elapsedRef.current = current
    baseElapsedRef.current = current
    startedAtRef.current = null
    setElapsed(current)
    setIsRunning(false)
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = null
  }, [getCurrent])

  const reset = useCallback(() => {
    startedAtRef.current = null
    elapsedRef.current = 0
    baseElapsedRef.current = 0
    setElapsed(0)
    setIsRunning(false)
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = null
  }, [])

  useEffect(() => {
    if (initialRunning) {
      startedAtRef.current = performance.now()
      frameRef.current = requestAnimationFrame(tick)
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  // The hook intentionally restores only once; the app persists future changes itself.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { elapsed, isRunning, start, pause, reset, getCurrent }
}

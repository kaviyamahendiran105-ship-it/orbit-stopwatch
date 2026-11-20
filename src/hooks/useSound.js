import { useCallback, useRef } from 'react'

export function useSound(enabled = true) {
  const contextRef = useRef(null)

  const ping = useCallback((kind = 'tick') => {
    if (!enabled || typeof window === 'undefined') return
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const context = contextRef.current || new AudioContext()
    contextRef.current = context
    if (context.state === 'suspended') context.resume()

    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const frequency = kind === 'lap' ? 780 : kind === 'reset' ? 280 : kind === 'pause' ? 430 : 620
    oscillator.type = kind === 'lap' ? 'sine' : 'triangle'
    oscillator.frequency.setValueAtTime(frequency, context.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.72, context.currentTime + 0.09)
    gain.gain.setValueAtTime(0.0001, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.045, context.currentTime + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.12)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.13)
  }, [enabled])

  return { ping }
}

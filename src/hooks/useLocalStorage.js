import { useCallback, useState } from 'react'

function readValue(key, initialValue) {
  try {
    const stored = window.localStorage.getItem(key)
    return stored === null ? initialValue : JSON.parse(stored)
  } catch {
    return initialValue
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue))

  const updateValue = useCallback((nextValue) => {
    setValue((current) => {
      const resolved = typeof nextValue === 'function' ? nextValue(current) : nextValue
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved))
      } catch {
        // Storage may be unavailable in private browsing; the in-memory state still works.
      }
      return resolved
    })
  }, [key])

  return [value, updateValue]
}

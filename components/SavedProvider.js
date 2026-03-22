'use client'
import { useState, useEffect, useCallback, createContext, useContext } from 'react'

const SavedContext = createContext({ saved: [], toggle: () => {}, isSaved: () => false })

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sg-saved')
      if (stored) setSaved(JSON.parse(stored))
    } catch {}
    setLoaded(true)
  }, [])

  const toggle = useCallback((type, id) => {
    setSaved(prev => {
      const key = `${type}:${id}`
      const next = prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
      localStorage.setItem('sg-saved', JSON.stringify(next))
      return next
    })
  }, [])

  const isSaved = useCallback((type, id) => {
    return saved.includes(`${type}:${id}`)
  }, [saved])

  return (
    <SavedContext.Provider value={{ saved, toggle, isSaved, loaded }}>
      {children}
    </SavedContext.Provider>
  )
}

export function useSaved() {
  return useContext(SavedContext)
}

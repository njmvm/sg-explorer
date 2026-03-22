'use client'
import { SavedProvider } from './SavedProvider'

export default function ClientProviders({ children }) {
  return (
    <SavedProvider>
      {children}
    </SavedProvider>
  )
}

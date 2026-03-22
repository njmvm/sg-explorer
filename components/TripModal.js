'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import ShareButtons from './ShareButtons'
import { useSaved } from './SavedProvider'

export default function TripModal({ trip, open, onClose }) {
  const [imgError, setImgError] = useState(false)
  const [helpful, setHelpful] = useState(null)
  const { toggle, isSaved } = useSaved()
  const closeRef = useRef(null)
  const saved = isSaved('trip', trip.id)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      closeRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={trip.name}
    >
      <div className="bg-white dark:bg-[#1e1e1c] rounded-t-[18px] sm:rounded-[18px] max-w-[680px] w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          {trip.image && !imgError ? (
            <div className="relative h-[240px] sm:h-[300px] w-full">
              <Image src={trip.image} alt={trip.name} fill className="object-cover rounded-t-[18px]" sizes="680px" onError={() => setImgError(true)} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-[18px]" />
              <div className="absolute bottom-4 left-4 sm:left-6">
                <span className="bg-white/90 backdrop-blur-sm text-[#1a1a18] text-[12px] font-bold px-3 py-1 rounded-full">{trip.transport}</span>
              </div>
            </div>
          ) : (
            <div className="h-[160px] sm:h-[200px] w-full bg-gradient-to-br from-[#2d6a4f] to-[#40916c] rounded-t-[18px] flex items-center justify-center">
              <span className="text-white text-4xl font-bold">{trip.name}</span>
            </div>
          )}
          <button ref={closeRef} onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center text-lg hover:bg-white transition-colors border-none cursor-pointer"
            aria-label="Close">
            {'\u2715'}
          </button>
        </div>
        <div className="p-4 sm:p-8">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-tight mb-1">{trip.name}</h2>
          <p className="text-sm text-[#6b6b66] mb-5">{trip.meta}</p>
          {trip.vibe && (
            <div className="bg-[#f0f9f4] dark:bg-[#1a2e24] border border-[#d4edda] dark:border-[#2d6a4f] rounded-xl p-4 mb-6">
              <div className="text-xs font-bold text-[#2d6a4f] uppercase tracking-widest mb-1">The vibe</div>
              <p className="text-[14px] text-[#2d6a4f] leading-relaxed">{trip.vibe}</p>
            </div>
          )}
          {trip.description && <p className="text-[15px] text-[#6b6b66] leading-[1.7] mb-6">{trip.description}</p>}
          {trip.gettingThere && (
            <div className="mb-6">
              <h3 className="text-[15px] font-bold text-[#1a1a18] dark:text-[#e0e0dc] mb-2">How to get there</h3>
              <p className="text-[14px] text-[#6b6b66] leading-[1.7]">{trip.gettingThere}</p>
            </div>
          )}
          {trip.thingsToDo && trip.thingsToDo.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[15px] font-bold text-[#1a1a18] dark:text-[#e0e0dc] mb-3">What to do & see</h3>
              <div className="flex flex-col gap-2">
                {trip.thingsToDo.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[14px] text-[#6b6b66]">
                    <span className="text-accent mt-0.5 shrink-0">{'\u2192'}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-3 flex-wrap mb-4">
            {trip.website && (
              <a href={trip.website} target="_blank" rel="noopener noreferrer"
                className="flex-1 py-3 px-5 bg-accent text-white rounded-[10px] text-sm font-semibold hover:bg-accent-hover transition-colors no-underline text-center min-w-[140px]">
                Plan this trip {'\u2192'}
              </a>
            )}
            <button onClick={() => toggle('trip', trip.id)} className={`py-3 px-5 rounded-[10px] text-sm font-semibold transition-colors cursor-pointer ${saved ? 'bg-accent-light text-accent' : 'bg-[#f0f0ec] text-[#1a1a18] hover:bg-[#e8e8e4]'}`}>
              {saved ? '\u2764\uFE0F Saved' : 'Save \u2661'}
            </button>
          </div>
          {/* Share buttons */}
          <div className="mb-6">
            <span className="text-xs text-[#6b6b66] block mb-2">Share this trip</span>
            <ShareButtons title={trip.name} text={trip.meta} />
          </div>
          <div className="border-t border-[#f0f0ec] pt-4 flex items-center justify-between">
            <span className="text-xs text-[#6b6b66]">Was this helpful?</span>
            <div className="flex gap-2">
              <button onClick={() => setHelpful(true)} className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${helpful === true ? 'bg-accent-light text-accent font-semibold' : 'bg-[#f0f0ec] text-[#6b6b66] hover:bg-[#e8e8e4]'}`} aria-label="Helpful">
                {'\uD83D\uDC4D'}
              </button>
              <button onClick={() => setHelpful(false)} className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${helpful === false ? 'bg-red-50 text-red-500 font-semibold' : 'bg-[#f0f0ec] text-[#6b6b66] hover:bg-[#e8e8e4]'}`} aria-label="Not helpful">
                {'\uD83D\uDC4E'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { badgeColors } from '@/data/constants'
import ShareButtons from './ShareButtons'
import { useSaved } from './SavedProvider'

export default function ActivityModal({ activity, open, onClose }) {
  const badge = badgeColors[activity.category] || 'bg-gray-100 text-gray-700'
  const [imgError, setImgError] = useState(false)
  const [helpful, setHelpful] = useState(null)
  const { toggle, isSaved } = useSaved()
  const closeRef = useRef(null)
  const saved = isSaved('activity', activity.id)

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
      aria-label={activity.title}
    >
      <div className="bg-white dark:bg-[#1e1e1c] rounded-t-[18px] sm:rounded-[18px] max-w-[680px] w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <div className="relative h-[220px] sm:h-[280px] w-full">
            {imgError ? (
              <div className="w-full h-full bg-gradient-to-br from-[#2d6a4f] to-[#40916c] flex items-center justify-center rounded-t-[18px]">
                <span className="text-white/80 text-5xl">{'\uD83C\uDFA8'}</span>
              </div>
            ) : (
              <Image src={activity.image} alt={activity.title} fill className="object-cover rounded-t-[18px]" sizes="680px" onError={() => setImgError(true)} />
            )}
          </div>
          <button ref={closeRef} onClick={onClose} className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center text-lg hover:bg-white transition-colors border-none cursor-pointer" aria-label="Close">
            {'\u2715'}
          </button>
        </div>
        <div className="p-4 sm:p-8">
          <span className={`badge ${badge} mb-3 inline-block`}>{activity.category}</span>
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-tight mb-3">{activity.title}</h2>
          <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-[#6b6b66] mb-5">
            <span>{'\uD83D\uDCCD'} {activity.location}</span>
            <span>{'\u23F1'} {activity.duration}</span>
            <span>{'\uD83D\uDCB5'} {activity.price}</span>
          </div>
          <p className="text-[15px] text-[#6b6b66] leading-[1.7] mb-6">{activity.fullDesc}</p>
          <div className="flex gap-2 flex-wrap mb-6">
            {activity.tags.map(tag => (
              <span key={tag} className="text-[11px] font-medium text-[#6b6b66] bg-[#f0f0ec] px-2.5 py-1 rounded-md">{tag}</span>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap mb-6">
            {activity.website && (
              <a href={activity.website} target="_blank" rel="noopener noreferrer"
                className="flex-1 py-3 px-5 bg-accent text-white rounded-[10px] text-sm font-semibold hover:bg-accent-hover transition-colors no-underline text-center min-w-[140px]">
                Official website {'\u2192'}
              </a>
            )}
            <a href={`https://www.google.com/maps/search/${encodeURIComponent(activity.title + ' ' + activity.location)}`}
              target="_blank" rel="noopener noreferrer"
              className="py-3 px-5 bg-[#f0f0ec] text-[#1a1a18] rounded-[10px] text-sm font-semibold hover:bg-[#e8e8e4] transition-colors no-underline whitespace-nowrap">
              {'\uD83D\uDCCD'} Directions
            </a>
            <button onClick={() => toggle('activity', activity.id)} className={`py-3 px-5 rounded-[10px] text-sm font-semibold transition-colors cursor-pointer ${saved ? 'bg-accent-light text-accent' : 'bg-[#f0f0ec] text-[#1a1a18] hover:bg-[#e8e8e4]'}`}>
              {saved ? '\u2764\uFE0F Saved' : 'Save \u2661'}
            </button>
          </div>
          {/* Share buttons */}
          <div className="mb-6">
            <span className="text-xs text-[#6b6b66] block mb-2">Share this activity</span>
            <ShareButtons title={activity.title} text={activity.shortDesc} />
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

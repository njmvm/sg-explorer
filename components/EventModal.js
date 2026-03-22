'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import { badgeColors } from '@/data/content'

function makeGoogleCalUrl(event) {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
  return `${base}&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.location)}`
}

export default function EventModal({ event, open, onClose }) {
  const badge = badgeColors[event.category] || 'bg-gray-100 text-gray-700'

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const hasImage = !!event.image

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-[18px] max-w-[680px] w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          {hasImage ? (
            <div className="relative h-[280px] w-full">
              <Image src={event.image} alt={event.title} fill className="object-cover rounded-t-[18px]" sizes="680px" />
            </div>
          ) : (
            <div className="h-[200px] w-full bg-gradient-to-br from-[#2d6a4f] to-[#40916c] rounded-t-[18px] flex items-center justify-center">
              <span className="text-white/80 text-6xl">
                {event.category === 'sports' ? '🏃' : event.category === 'nightlife' ? '🎵' : event.category === 'food' ? '🍜' : event.category === 'culture' ? '🎨' : event.category === 'social' ? '🤝' : '📅'}
              </span>
            </div>
          )}
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center text-lg hover:bg-white transition-colors border-none cursor-pointer">✕</button>
        </div>

        <div className="p-8">
          <span className={`badge ${badge} mb-3 inline-block`}>{event.category}</span>
          <h2 className="text-[26px] font-bold tracking-tight mb-3">{event.title}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-[#6b6b66] mb-5">
            <span>📍 {event.location}</span>
            <span>🕐 {event.time}</span>
            <span>📅 {event.date.label}</span>
            <span>💵 {event.price}</span>
          </div>
          {event.fullDesc && <p className="text-[15px] text-[#6b6b66] leading-[1.7] mb-6">{event.fullDesc}</p>}
          {event.tags && event.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {event.tags.map(tag => (
                <span key={tag} className="text-[11px] font-medium text-[#6b6b66] bg-[#f0f0ec] px-2.5 py-1 rounded-md">{tag}</span>
              ))}
            </div>
          )}
          <div className="flex gap-3">
            <a href={makeGoogleCalUrl(event)} target="_blank" rel="noopener noreferrer"
              className="flex-1 py-3 px-5 bg-[#4285F4] text-white rounded-[10px] text-sm font-semibold hover:bg-[#3367c4] transition-colors no-underline text-center">
              Add to Google Calendar
            </a>
            <button onClick={() => {
              const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.title}\nLOCATION:${event.location}\nDESCRIPTION:${event.time}\nEND:VEVENT\nEND:VCALENDAR`
              const blob = new Blob([ics], { type: 'text/calendar' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url; a.download = 'event.ics'; a.click()
              URL.revokeObjectURL(url)
            }} className="py-3 px-5 bg-[#f0f0ec] text-[#1a1a18] rounded-[10px] text-sm font-semibold hover:bg-[#e8e8e4] transition-colors">
              Apple Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

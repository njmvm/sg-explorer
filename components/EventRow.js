'use client'
import { useState } from 'react'
import { badgeColors } from '@/data/content'
import EventModal from '@/components/EventModal'

function makeGoogleCalUrl(event) {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
  return `${base}&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.location)}`
}

export default function EventRow({ event }) {
  const [open, setOpen] = useState(false)
  const badge = badgeColors[event.category] || 'bg-gray-100 text-gray-700'
  const isRecurring = event.tab === 'recurring'

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="grid grid-cols-[80px_1fr_auto] gap-4 items-center bg-white border border-[#e8e8e4] rounded-card p-4 cursor-pointer hover:border-accent hover:shadow-card transition-all duration-150"
      >
        <div className="text-center bg-[#f0f0ec] rounded-[10px] py-2.5 px-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-accent">{event.date.month}</div>
          <div className={`font-bold text-[#1a1a18] leading-tight ${isRecurring ? 'text-base mt-0.5' : 'text-2xl'}`}>
            {event.date.day}
          </div>
        </div>
        <div>
          <div className="text-[15px] font-semibold mb-1">{event.title}</div>
          <div className="flex flex-wrap items-center gap-2.5 text-sm text-[#6b6b66]">
            <span>{'\uD83D\uDCCD'} {event.location}</span>
            <span>{'\uD83D\uDD50'} {event.time}</span>
            <span className={`badge ${badge}`}>{event.category}</span>
            <span className="text-xs font-medium text-accent">{event.price}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 items-end">
          <a href={makeGoogleCalUrl(event)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border-[1.5px] border-[#4285F4] text-[#4285F4] hover:bg-[#e8f0fe] transition-colors no-underline whitespace-nowrap">
            + Google
          </a>
          <button onClick={e => {
            e.stopPropagation()
            const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.title}\nLOCATION:${event.location}\nDESCRIPTION:${event.time}\nEND:VEVENT\nEND:VCALENDAR`
            const blob = new Blob([ics], { type: 'text/calendar' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url; a.download = 'event.ics'; a.click()
            URL.revokeObjectURL(url)
          }} className="text-xs font-semibold px-3 py-1.5 rounded-lg border-[1.5px] border-[#555] text-[#555] hover:bg-[#f5f5f5] transition-colors whitespace-nowrap">
            + Apple
          </button>
        </div>
      </div>

      <EventModal event={event} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

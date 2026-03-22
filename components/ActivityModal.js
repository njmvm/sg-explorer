'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import { badgeColors } from '@/data/content'

export default function ActivityModal({ activity, open, onClose }) {
  const badge = badgeColors[activity.category] || 'bg-gray-100 text-gray-700'

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-[18px] max-w-[680px] w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <div className="relative h-[280px] w-full">
            <Image src={activity.image} alt={activity.title} fill className="object-cover rounded-t-[18px]" sizes="680px" />
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center text-lg hover:bg-white transition-colors border-none cursor-pointer">
            ✕
          </button>
        </div>

        <div className="p-8">
          <span className={`badge ${badge} mb-3 inline-block`}>{activity.category}</span>
          <h2 className="text-[26px] font-bold tracking-tight mb-3">{activity.title}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-[#6b6b66] mb-5">
            <span>📍 {activity.location}</span>
            <span>⏱ {activity.duration}</span>
            <span>💵 {activity.price}</span>
          </div>
          <p className="text-[15px] text-[#6b6b66] leading-[1.7] mb-6">{activity.fullDesc}</p>
          <div className="flex gap-2 flex-wrap mb-6">
            {activity.tags.map(tag => (
              <span key={tag} className="text-[11px] font-medium text-[#6b6b66] bg-[#f0f0ec] px-2.5 py-1 rounded-md">{tag}</span>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-3 px-5 bg-accent text-white rounded-[10px] text-sm font-semibold hover:bg-accent-hover transition-colors">Get directions 📍</button>
            <button className="py-3 px-5 bg-[#f0f0ec] text-[#1a1a18] rounded-[10px] text-sm font-semibold hover:bg-[#e8e8e4] transition-colors">Save ♡</button>
          </div>
        </div>
      </div>
    </div>
  )
}

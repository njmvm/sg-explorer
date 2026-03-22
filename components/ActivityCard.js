'use client'
import Image from 'next/image'
import { useState } from 'react'
import { badgeColors } from '@/data/content'
import ActivityModal from './ActivityModal'

export default function ActivityCard({ activity }) {
  const [open, setOpen] = useState(false)
  const badge = badgeColors[activity.category] || 'bg-gray-100 text-gray-700'

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-white rounded-card border border-[#e8e8e4] overflow-hidden cursor-pointer card-hover flex flex-col"
      >
        <div className="relative h-[200px] w-full">
          <Image src={activity.image} alt={activity.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <span className={`badge ${badge} self-start mb-2`}>{activity.category}</span>
          <h3 className="text-[16px] font-semibold tracking-tight mb-2">{activity.title}</h3>
          <p className="text-[13.5px] text-[#6b6b66] leading-relaxed flex-1 mb-4">{activity.shortDesc}</p>
          <div className="flex items-center justify-between pt-3 border-t border-[#f0f0ec]">
            <div className="flex gap-1.5 flex-wrap">
              {activity.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[11px] font-medium text-[#6b6b66] bg-[#f0f0ec] px-2 py-1 rounded-md">{tag}</span>
              ))}
            </div>
            <span className="text-accent text-lg">→</span>
          </div>
        </div>
      </div>

      <ActivityModal activity={activity} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

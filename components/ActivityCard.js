'use client'
import Image from 'next/image'
import { useState } from 'react'
import { badgeColors } from '@/data/constants'
import ActivityModal from './ActivityModal'
import { useSaved } from './SavedProvider'

const POPULAR_IDS = ['karting', 'skypark', 'gardens-by-the-bay', 'hawker-tour']

export default function ActivityCard({ activity }) {
  const [open, setOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const badge = badgeColors[activity.category] || 'bg-gray-100 text-gray-700'
  const { isSaved } = useSaved()
  const saved = isSaved('activity', activity.id)
  const isPopular = POPULAR_IDS.includes(activity.id)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-white dark:bg-[#1e1e1c] rounded-card border border-[#e8e8e4] dark:border-[#333330] overflow-hidden cursor-pointer card-hover flex flex-col"
        role="article"
        tabIndex={0}
        aria-label={`${activity.title} - ${activity.category}`}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true) } }}
      >
        <div className="relative h-[200px] w-full">
          {imgError ? (
            <div className="w-full h-full bg-gradient-to-br from-[#2d6a4f] to-[#40916c] flex items-center justify-center">
              <span className="text-white/80 text-4xl">{'\uD83C\uDFA8'}</span>
            </div>
          ) : (
            <Image src={activity.image} alt={activity.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" onError={() => setImgError(true)} />
          )}
          {/* Social proof badge */}
          {isPopular && (
            <span className="popular-badge absolute top-3 left-3 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {'\u2B50'} Popular
            </span>
          )}
          {/* Saved indicator */}
          {saved && (
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-accent text-sm w-7 h-7 flex items-center justify-center rounded-full shadow-sm">
              {'\u2764\uFE0F'}
            </span>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          <span className={`badge ${badge} self-start mb-2`}>{activity.category}</span>
          <h3 className="text-[16px] font-semibold tracking-tight mb-2">{activity.title}</h3>
          <p className="text-[13.5px] text-[#6b6b66] leading-relaxed flex-1 mb-4">{activity.shortDesc}</p>
          <div className="flex items-center justify-between pt-3 border-t border-[#f0f0ec] dark:border-[#2a2a28]">
            <div className="flex gap-1.5 flex-wrap">
              {activity.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[11px] font-medium text-[#6b6b66] bg-[#f0f0ec] dark:bg-[#2a2a28] px-2 py-1 rounded-md">{tag}</span>
              ))}
            </div>
            <span className="text-accent text-lg">{'\u2192'}</span>
          </div>
        </div>
      </div>

      <ActivityModal activity={activity} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

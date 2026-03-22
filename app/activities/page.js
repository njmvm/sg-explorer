'use client'
import { useState } from 'react'
import ActivityCard from '@/components/ActivityCard'
import MapView from '@/components/MapView'
import { activities, categories } from '@/data/content'

export default function ActivitiesPage() {
  const [activeCat, setActiveCat] = useState('all')

  const filtered = activeCat === 'all'
    ? activities
    : activities.filter(a => a.category === activeCat)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight mb-3">Activities & Places</h1>
        <p className="text-[15px] sm:text-[16px] text-[#6b6b66] max-w-[560px]">
          Karting, climbing, nightlife, food, nature {'\u2014'} everything worth doing in Singapore, curated for you.
        </p>
      </div>

      <MapView items={filtered} />

      <div className="flex gap-2 mb-10 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {categories.filter(c => c.id !== 'travel').map(cat => (
          <button key={cat.id} onClick={() => setActiveCat(cat.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer select-none whitespace-nowrap shrink-0
              ${activeCat === cat.id ? 'bg-accent text-white border-accent' : 'bg-white text-[#6b6b66] border-[#e8e8e4] hover:border-accent hover:text-accent'}`}>
            <span>{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-[#6b6b66] mb-6">{filtered.length} {filtered.length === 1 ? 'activity' : 'activities'}</p>
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">{'\uD83D\uDD0D'}</div>
          <p className="text-[#6b6b66]">No activities in this category yet {'\u2014'} check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(a => <ActivityCard key={a.id} activity={a} />)}
        </div>
      )}
    </div>
  )
}

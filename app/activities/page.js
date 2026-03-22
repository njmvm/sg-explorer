'use client'
import { useState, useMemo } from 'react'
import ActivityCard from '@/components/ActivityCard'
import MapView from '@/components/MapView'
import { activities, categories } from '@/data/content'

const SORT_OPTIONS = [
  { id: 'default', label: 'Default' },
  { id: 'name', label: 'A \u2192 Z' },
  { id: 'price-low', label: 'Price: Low' },
  { id: 'price-high', label: 'Price: High' },
]

function parsePrice(p) {
  const m = p.match(/\d+/)
  return m ? parseInt(m[0]) : 0
}

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

export default function ActivitiesPage() {
  const [activeCat, setActiveCat] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [userLoc, setUserLoc] = useState(null)
  const [nearMe, setNearMe] = useState(false)

  const filtered = useMemo(() => {
    let result = activities
    if (activeCat !== 'all') result = result.filter(a => a.category === activeCat)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.shortDesc.toLowerCase().includes(q)
      )
    }
    if (nearMe && userLoc) {
      result = [...result].sort((a, b) => {
        const dA = (a.lat && a.lng) ? getDistance(userLoc.lat, userLoc.lng, a.lat, a.lng) : Infinity
        const dB = (b.lat && b.lng) ? getDistance(userLoc.lat, userLoc.lng, b.lat, b.lng) : Infinity
        return dA - dB
      })
    } else if (sort === 'name') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'price-low') {
      result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    } else if (sort === 'price-high') {
      result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    }
    return result
  }, [activeCat, search, sort, nearMe, userLoc])

  function handleNearMe() {
    if (nearMe) { setNearMe(false); return }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setNearMe(true)
        setSort('default')
      })
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight mb-3">Activities & Places</h1>
        <p className="text-[15px] sm:text-[16px] text-[#6b6b66] max-w-[560px]">
          Karting, climbing, nightlife, food, nature {'\u2014'} everything worth doing in Singapore, curated for you.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b6b66] text-lg pointer-events-none">{'\uD83D\uDD0D'}</span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search activities, locations, tags..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1e1e1c] border border-[#e8e8e4] dark:border-[#333330] rounded-xl text-[15px] text-[#1a1a18] dark:text-[#e0e0dc] placeholder:text-[#6b6b66] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          aria-label="Search activities"
        />
      </div>

      <MapView items={filtered} />

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {categories.filter(c => c.id !== 'travel').map(cat => (
          <button key={cat.id} onClick={() => setActiveCat(cat.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer select-none whitespace-nowrap shrink-0
              ${activeCat === cat.id ? 'bg-accent text-white border-accent' : 'bg-white dark:bg-[#1e1e1c] text-[#6b6b66] border-[#e8e8e4] dark:border-[#333330] hover:border-accent hover:text-accent'}`}>
            <span>{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Sort & Near me bar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p className="text-sm text-[#6b6b66]">{filtered.length} {filtered.length === 1 ? 'activity' : 'activities'}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={handleNearMe}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${nearMe ? 'border-accent bg-accent-light text-accent' : 'border-[#e8e8e4] dark:border-[#333330] text-[#6b6b66] hover:border-accent hover:text-accent'}`}
            aria-label="Sort by distance from me"
          >
            {'\uD83D\uDCCD'} Near me
          </button>
          <select
            value={sort}
            onChange={e => { setSort(e.target.value); setNearMe(false) }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#e8e8e4] dark:border-[#333330] bg-white dark:bg-[#1e1e1c] text-[#6b6b66] cursor-pointer focus:outline-none focus:border-accent"
            aria-label="Sort activities"
          >
            {SORT_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">{'\uD83D\uDD0D'}</div>
          <p className="text-[#6b6b66]">No activities found {'\u2014'} try a different search or category!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(a => <ActivityCard key={a.id} activity={a} />)}
        </div>
      )}
    </div>
  )
}

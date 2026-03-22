'use client'
import { useState, useEffect, useMemo } from 'react'
import TripCard from '@/components/TripCard'
import MapView from '@/components/MapView'

const TRANSPORT_TABS = [
  { id: 'all', label: 'All', icon: '\uD83C\uDF0F' },
  { id: 'ferry', label: 'Ferry', icon: '\uD83D\uDEA4' },
  { id: 'drive', label: 'Car / Bus', icon: '\uD83D\uDE97' },
  { id: 'flight', label: 'Plane', icon: '\u2708\uFE0F' },
]

export default function TripsPage() {
  const [search, setSearch] = useState('')
  const [transport, setTransport] = useState('all')
  const [allTrips, setAllTrips] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/trips').then(r => r.json()).then(data => {
      setAllTrips(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    let result = allTrips
    if (transport !== 'all') {
      result = result.filter(t => t.transport.includes(transport))
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.meta.toLowerCase().includes(q) ||
        (t.vibe && t.vibe.toLowerCase().includes(q))
      )
    }
    return result
  }, [search, transport])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight mb-3">Weekend Escapes</h1>
        <p className="text-[15px] sm:text-[16px] text-[#6b6b66] max-w-[560px]">
          Singapore is your gateway to Southeast Asia. These are the best weekend trips you can do from the city.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b6b66] text-lg pointer-events-none">{'\uD83D\uDD0D'}</span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search destinations..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1e1e1c] border border-[#e8e8e4] dark:border-[#333330] rounded-xl text-[15px] text-[#1a1a18] dark:text-[#e0e0dc] placeholder:text-[#6b6b66] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          aria-label="Search trips"
        />
      </div>

      <MapView items={filtered} regional={true} zoom={5} center={[3.5, 108.0]} />

      {/* Transport filter tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {TRANSPORT_TABS.map(tab => (
          <button key={tab.id} onClick={() => setTransport(tab.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer select-none whitespace-nowrap shrink-0
              ${transport === tab.id ? 'bg-accent text-white border-accent' : 'bg-white dark:bg-[#1e1e1c] text-[#6b6b66] border-[#e8e8e4] dark:border-[#333330] hover:border-accent hover:text-accent'}`}>
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-[#6b6b66] mb-6">{filtered.length} {filtered.length === 1 ? 'destination' : 'destinations'}</p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="skeleton h-[280px] rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">{'\u2708\uFE0F'}</div>
          <p className="text-[#6b6b66]">No destinations found {'\u2014'} try a different search!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(t => <TripCard key={t.id} trip={t} />)}
        </div>
      )}

      <div className="mt-10 p-4 bg-accent-light rounded-xl flex items-center gap-3">
        <span className="text-accent text-lg">{'\u2708\uFE0F'}</span>
        <p className="text-sm text-accent font-medium">More destination guides coming soon {'\u2014'} AI agent is working on it!</p>
      </div>
    </div>
  )
}

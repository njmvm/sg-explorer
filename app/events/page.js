'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import EventRow from '@/components/EventRow'
import EventModal from '@/components/EventModal'
import MapView from '@/components/MapView'
import CalendarView from '@/components/CalendarView'
import { events, categories } from '@/data/content'

const tabs = [
  { id: 'week',      label: 'This week' },
  { id: 'month',     label: 'This month' },
  { id: 'recurring', label: 'Recurring' },
]

const eventCategories = categories.filter(c => c.id !== 'all' && c.id !== 'travel')

const MONTH_MAP = { JAN:0,FEB:1,MAR:2,APR:3,MAY:4,JUN:5,JUL:6,AUG:7,SEP:8,OCT:9,NOV:10,DEC:11 }

function isExpired(event) {
  if (event.tab === 'recurring') return false
  const month = MONTH_MAP[event.date.month]
  if (month === undefined) return false
  const day = parseInt(event.date.day)
  if (isNaN(day)) return false
  const now = new Date()
  const eventDate = new Date(now.getFullYear(), month, day, 23, 59, 59)
  if (eventDate < new Date(now.getFullYear(), 0, 1)) {
    eventDate.setFullYear(now.getFullYear() + 1)
  }
  return eventDate < now
}

const SORT_OPTIONS = [
  { id: 'default', label: 'Default' },
  { id: 'date', label: 'Date' },
  { id: 'name', label: 'A \u2192 Z' },
  { id: 'price-low', label: 'Price: Low' },
]

function parsePrice(p) {
  if (!p) return 0
  const m = p.match(/\d+/)
  return m ? parseInt(m[0]) : 0
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('week')
  const [activeCat, setActiveCat] = useState('all')
  const [viewMode, setViewMode] = useState('list')
  const [calendarEvent, setCalendarEvent] = useState(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [hideExpired, setHideExpired] = useState(true)

  const activeEvents = useMemo(() => {
    return hideExpired ? events.filter(e => !isExpired(e)) : events
  }, [hideExpired])

  const filtered = useMemo(() => {
    let result = activeEvents.filter(e => {
      const tabMatch = e.tab === activeTab
      const catMatch = activeCat === 'all' || e.category === activeCat
      return tabMatch && catMatch
    })
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        (e.tags && e.tags.some(t => t.toLowerCase().includes(q)))
      )
    }
    if (sort === 'name') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'price-low') {
      result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    } else if (sort === 'date') {
      result = [...result].sort((a, b) => {
        const mA = MONTH_MAP[a.date.month] ?? 99
        const mB = MONTH_MAP[b.date.month] ?? 99
        return mA - mB || parseInt(a.date.day) - parseInt(b.date.day)
      })
    }
    return result
  }, [activeEvents, activeTab, activeCat, search, sort])

  const mapItems = activeCat === 'all' ? activeEvents : activeEvents.filter(e => e.category === activeCat)

  const tabCounts = {
    week: activeEvents.filter(e => e.tab === 'week').length,
    month: activeEvents.filter(e => e.tab === 'month').length,
    recurring: activeEvents.filter(e => e.tab === 'recurring').length,
  }

  const expiredCount = events.filter(e => isExpired(e)).length

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight mb-3">Upcoming Events</h1>
        <p className="text-[15px] sm:text-[16px] text-[#6b6b66] max-w-[560px]">
          Concerts, races, festivals, networking nights, and more. Save anything to your calendar in one click.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b6b66] text-lg pointer-events-none">{'\uD83D\uDD0D'}</span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search events, locations, tags..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1e1e1c] border border-[#e8e8e4] dark:border-[#333330] rounded-xl text-[15px] text-[#1a1a18] dark:text-[#e0e0dc] placeholder:text-[#6b6b66] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          aria-label="Search events"
        />
      </div>

      <MapView items={mapItems} />

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex border-b-2 border-[#e8e8e4] dark:border-[#333330] gap-0 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2.5 text-sm font-semibold border-none bg-transparent cursor-pointer transition-all border-b-2 -mb-[2px] whitespace-nowrap flex items-center gap-1.5
                ${activeTab === tab.id ? 'text-[#1a1a18] dark:text-white border-b-[#1a1a18] dark:border-b-white' : 'text-[#6b6b66] border-b-transparent hover:text-[#1a1a18] dark:hover:text-white'}`}>
              {tab.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-accent text-white' : 'bg-[#f0f0ec] dark:bg-[#2a2a28] text-[#6b6b66]'}`}>
                {tabCounts[tab.id]}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {expiredCount > 0 && (
            <button
              onClick={() => setHideExpired(v => !v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${hideExpired ? 'border-accent bg-accent-light text-accent' : 'border-[#e8e8e4] dark:border-[#333330] text-[#6b6b66]'}`}
              aria-label={hideExpired ? 'Show expired events' : 'Hide expired events'}
            >
              {hideExpired ? `${expiredCount} past hidden` : 'Show all'}
            </button>
          )}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#e8e8e4] dark:border-[#333330] bg-white dark:bg-[#1e1e1c] text-[#6b6b66] cursor-pointer focus:outline-none focus:border-accent"
            aria-label="Sort events"
          >
            {SORT_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
          <div className="flex items-center gap-1 bg-[#f0f0ec] dark:bg-[#2a2a28] rounded-lg p-1">
            <button onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${viewMode === 'list' ? 'bg-white dark:bg-[#1e1e1c] text-[#1a1a18] dark:text-white shadow-sm' : 'text-[#6b6b66] hover:text-[#1a1a18] dark:hover:text-white'}`}>
              {'\u2630'} List
            </button>
            <button onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${viewMode === 'calendar' ? 'bg-white dark:bg-[#1e1e1c] text-[#1a1a18] dark:text-white shadow-sm' : 'text-[#6b6b66] hover:text-[#1a1a18] dark:hover:text-white'}`}>
              {'\uD83D\uDCC5'} Calendar
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        <button onClick={() => setActiveCat('all')}
          className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border-[1.5px] transition-all cursor-pointer whitespace-nowrap shrink-0
            ${activeCat === 'all' ? 'border-accent text-accent bg-accent-light' : 'border-[#e8e8e4] dark:border-[#333330] text-[#6b6b66] bg-white dark:bg-[#1e1e1c] hover:border-accent hover:text-accent'}`}>
          All
        </button>
        {eventCategories.map(cat => (
          <button key={cat.id} onClick={() => setActiveCat(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border-[1.5px] transition-all cursor-pointer whitespace-nowrap shrink-0
              ${activeCat === cat.id ? 'border-accent text-accent bg-accent-light' : 'border-[#e8e8e4] dark:border-[#333330] text-[#6b6b66] bg-white dark:bg-[#1e1e1c] hover:border-accent hover:text-accent'}`}>
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {viewMode === 'calendar' ? (
        <>
          <CalendarView events={mapItems} onEventClick={setCalendarEvent} />
          {calendarEvent && (
            <EventModal event={calendarEvent} open={!!calendarEvent} onClose={() => setCalendarEvent(null)} />
          )}
        </>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">{'\uD83D\uDCC5'}</div>
          <p className="text-[#6b6b66]">No events found for this filter. Try another category!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(e => <EventRow key={e.id} event={e} />)}
        </div>
      )}

      <div className="mt-10 p-4 bg-accent-light rounded-xl flex items-center gap-3">
        <span className="text-accent text-lg">{'\uD83E\uDD16'}</span>
        <p className="text-sm text-accent font-medium">
          Events are updated every Monday & Wednesday by an AI agent.{' '}
          <Link href="/suggest" className="underline">Submit an event {'\u2192'}</Link>
        </p>
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
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

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('week')
  const [activeCat, setActiveCat] = useState('all')
  const [viewMode, setViewMode] = useState('list')
  const [calendarEvent, setCalendarEvent] = useState(null)

  const filtered = events.filter(e => {
    const tabMatch = e.tab === activeTab
    const catMatch = activeCat === 'all' || e.category === activeCat
    return tabMatch && catMatch
  })

  const mapItems = activeCat === 'all' ? events : events.filter(e => e.category === activeCat)

  const tabCounts = {
    week: events.filter(e => e.tab === 'week').length,
    month: events.filter(e => e.tab === 'month').length,
    recurring: events.filter(e => e.tab === 'recurring').length,
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight mb-3">Upcoming Events</h1>
        <p className="text-[15px] sm:text-[16px] text-[#6b6b66] max-w-[560px]">
          Concerts, races, festivals, networking nights, and more. Save anything to your calendar in one click.
        </p>
      </div>

      <MapView items={mapItems} />

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex border-b-2 border-[#e8e8e4] gap-0 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2.5 text-sm font-semibold border-none bg-transparent cursor-pointer transition-all border-b-2 -mb-[2px] whitespace-nowrap flex items-center gap-1.5
                ${activeTab === tab.id ? 'text-[#1a1a18] border-b-[#1a1a18]' : 'text-[#6b6b66] border-b-transparent hover:text-[#1a1a18]'}`}>
              {tab.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-accent text-white' : 'bg-[#f0f0ec] text-[#6b6b66]'}`}>
                {tabCounts[tab.id]}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-[#f0f0ec] rounded-lg p-1">
          <button onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${viewMode === 'list' ? 'bg-white text-[#1a1a18] shadow-sm' : 'text-[#6b6b66] hover:text-[#1a1a18]'}`}>
            {'\u2630'} List
          </button>
          <button onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${viewMode === 'calendar' ? 'bg-white text-[#1a1a18] shadow-sm' : 'text-[#6b6b66] hover:text-[#1a1a18]'}`}>
            {'\uD83D\uDCC5'} Calendar
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        <button onClick={() => setActiveCat('all')}
          className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border-[1.5px] transition-all cursor-pointer whitespace-nowrap shrink-0
            ${activeCat === 'all' ? 'border-accent text-accent bg-accent-light' : 'border-[#e8e8e4] text-[#6b6b66] bg-white hover:border-accent hover:text-accent'}`}>
          All
        </button>
        {eventCategories.map(cat => (
          <button key={cat.id} onClick={() => setActiveCat(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border-[1.5px] transition-all cursor-pointer whitespace-nowrap shrink-0
              ${activeCat === cat.id ? 'border-accent text-accent bg-accent-light' : 'border-[#e8e8e4] text-[#6b6b66] bg-white hover:border-accent hover:text-accent'}`}>
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

'use client'
import { useState } from 'react'
import EventRow from '@/components/EventRow'
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

  const filtered = events.filter(e => {
    const tabMatch = e.tab === activeTab
    const catMatch = activeCat === 'all' || e.category === activeCat
    return tabMatch && catMatch
  })

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-10">
        <h1 className="text-[36px] font-bold tracking-tight mb-3">Upcoming Events</h1>
        <p className="text-[16px] text-[#6b6b66] max-w-[560px]">
          Concerts, races, festivals, networking nights, and more. Save anything to your calendar in one click.
        </p>
      </div>
      <div className="flex border-b-2 border-[#e8e8e4] mb-8 gap-0">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 text-sm font-semibold border-none bg-transparent cursor-pointer transition-all border-b-2 -mb-[2px]
              ${activeTab === tab.id ? 'text-[#1a1a18] border-b-[#1a1a18]' : 'text-[#6b6b66] border-b-transparent hover:text-[#1a1a18]'}`}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setActiveCat('all')}
          className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border-[1.5px] transition-all
            ${activeCat === 'all' ? 'border-accent text-accent bg-accent-light' : 'border-[#e8e8e4] text-[#6b6b66] bg-white hover:border-accent hover:text-accent'}`}>
          All
        </button>
        {eventCategories.map(cat => (
          <button key={cat.id} onClick={() => setActiveCat(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border-[1.5px] transition-all
              ${activeCat === cat.id ? 'border-accent text-accent bg-accent-light' : 'border-[#e8e8e4] text-[#6b6b66] bg-white hover:border-accent hover:text-accent'}`}>
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#6b6b66]">No events found for this filter. Try another category!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(e => <EventRow key={e.id} event={e} />)}
        </div>
      )}
      <div className="mt-10 p-4 bg-accent-light rounded-xl flex items-center gap-3">
        <span className="text-accent text-lg">🤖</span>
        <p className="text-sm text-accent font-medium">
          Events are updated every Monday by an AI agent scanning Singapore event listings. See something missing?{' '}
          <a href="#" className="underline">Submit an event →</a>
        </p>
      </div>
    </div>
  )
}

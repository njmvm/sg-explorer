'use client'
import { useState } from 'react'
import Link from 'next/link'
import ActivityCard from '@/components/ActivityCard'
import EventRow from '@/components/EventRow'
import TripCard from '@/components/TripCard'
import { activities, events, trips, categories } from '@/data/content'

export default function Home() {
  const [activeCat, setActiveCat] = useState('all')

  const filtered = activeCat === 'all'
    ? activities
    : activities.filter(a => a.category === activeCat)

  const weekEvents = events.filter(e => e.tab === 'week').slice(0, 3)

  return (
    <>
      <section className="max-w-6xl mx-auto px-8 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.08em] uppercase text-accent bg-accent-light px-3 py-1.5 rounded-full mb-5">
          🇸🇬 Updated weekly by an AI agent
        </div>
        <h1 className="text-[clamp(32px,5vw,54px)] font-bold tracking-[-1.5px] leading-[1.15] mb-4">
          Everything to do<br />in <em className="not-italic text-accent">Singapore</em>
        </h1>
        <p className="text-[17px] text-[#6b6b66] max-w-[520px] mx-auto mb-10">
          From rooftop bars to weekend escapes — a curated guide for people in their late 20s who want to make the most of the city.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer select-none
                ${activeCat === cat.id ? 'bg-accent text-white border-accent' : 'bg-white text-[#6b6b66] border-[#e8e8e4] hover:border-accent hover:text-accent'}`}>
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-16">
        <div className="flex items-baseline justify-between mb-7">
          <h2 className="text-[22px] font-bold tracking-tight">Activities &amp; Places</h2>
          <Link href="/activities" className="text-sm font-medium text-accent hover:opacity-70 transition-opacity">View all →</Link>
        </div>
        {filtered.length === 0 ? (
          <p className="text-[#6b6b66] text-center py-16">No activities in this category yet — check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.slice(0, 6).map(a => <ActivityCard key={a.id} activity={a} />)}
          </div>
        )}
      </section>

      <hr className="border-[#e8e8e4] max-w-6xl mx-auto" />

      <section className="max-w-6xl mx-auto px-8 py-14">
        <div className="flex items-baseline justify-between mb-7">
          <h2 className="text-[22px] font-bold tracking-tight">This Week in Singapore</h2>
          <Link href="/events" className="text-sm font-medium text-accent hover:opacity-70 transition-opacity">Full calendar →</Link>
        </div>
        <div className="flex flex-col gap-3">
          {weekEvents.map(e => <EventRow key={e.id} event={e} />)}
        </div>
        <div className="text-center mt-6">
          <Link href="/events" className="inline-block px-6 py-3 bg-[#f0f0ec] text-[#1a1a18] rounded-xl text-sm font-semibold hover:bg-[#e8e8e4] transition-colors">
            See all upcoming events →
          </Link>
        </div>
      </section>

      <hr className="border-[#e8e8e4] max-w-6xl mx-auto" />

      <section className="max-w-6xl mx-auto px-8 py-14">
        <div className="flex items-baseline justify-between mb-7">
          <h2 className="text-[22px] font-bold tracking-tight">Weekend Escapes</h2>
          <Link href="/trips" className="text-sm font-medium text-accent hover:opacity-70 transition-opacity">View all →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {trips.map(t => <TripCard key={t.id} trip={t} />)}
        </div>
      </section>
    </>
  )
}

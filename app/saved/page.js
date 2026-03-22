'use client'
import { useState, useEffect } from 'react'
import { useSaved } from '@/components/SavedProvider'
import ActivityCard from '@/components/ActivityCard'
import EventRow from '@/components/EventRow'
import TripCard from '@/components/TripCard'
import Link from 'next/link'

export default function SavedPage() {
  const { saved, loaded } = useSaved()
  const [activities, setActivities] = useState([])
  const [events, setEvents] = useState([])
  const [trips, setTrips] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) return
    Promise.all([
      fetch('/api/activities').then(r => r.json()),
      fetch('/api/events').then(r => r.json()),
      fetch('/api/trips').then(r => r.json()),
    ]).then(([a, e, t]) => {
      setActivities(a)
      setEvents(e)
      setTrips(t)
      setDataLoaded(true)
    }).catch(() => setDataLoaded(true))
  }, [loaded])

  if (!loaded || !dataLoaded) return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      <div className="skeleton h-8 w-48 mb-4" />
      <div className="skeleton h-4 w-64 mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3].map(i => <div key={i} className="skeleton h-[300px]" />)}
      </div>
    </div>
  )

  const savedActivities = activities.filter(a => saved.includes(`activity:${a.id}`))
  const savedEvents = events.filter(e => saved.includes(`event:${e.id}`))
  const savedTrips = trips.filter(t => saved.includes(`trip:${t.id}`))
  const isEmpty = savedActivities.length === 0 && savedEvents.length === 0 && savedTrips.length === 0

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight mb-3">
          Saved {'\u2661'}
        </h1>
        <p className="text-[15px] sm:text-[16px] text-[#6b6b66] dark:text-[#a0a09b] max-w-[560px]">
          Your personal collection of activities, events, and trips. Stored locally on your device.
        </p>
      </div>

      {isEmpty ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">{'\uD83D\uDD16'}</div>
          <h2 className="text-xl font-semibold mb-2">Nothing saved yet</h2>
          <p className="text-[#6b6b66] dark:text-[#a0a09b] mb-6">Tap the heart icon on any activity, event, or trip to save it here.</p>
          <Link href="/activities" className="inline-block px-6 py-3 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors no-underline">
            Browse activities {'\u2192'}
          </Link>
        </div>
      ) : (
        <>
          {savedActivities.length > 0 && (
            <section className="mb-12">
              <h2 className="text-[20px] font-bold tracking-tight mb-5">Activities ({savedActivities.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedActivities.map(a => <ActivityCard key={a.id} activity={a} />)}
              </div>
            </section>
          )}
          {savedEvents.length > 0 && (
            <section className="mb-12">
              <h2 className="text-[20px] font-bold tracking-tight mb-5">Events ({savedEvents.length})</h2>
              <div className="flex flex-col gap-3">
                {savedEvents.map(e => <EventRow key={e.id} event={e} />)}
              </div>
            </section>
          )}
          {savedTrips.length > 0 && (
            <section className="mb-12">
              <h2 className="text-[20px] font-bold tracking-tight mb-5">Trips ({savedTrips.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {savedTrips.map(t => <TripCard key={t.id} trip={t} />)}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

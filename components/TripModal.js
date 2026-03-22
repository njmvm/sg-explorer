'use client'
import Image from 'next/image'
import { useEffect } from 'react'

export default function TripModal({ trip, open, onClose }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const hasImage = !!trip.image

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-[18px] max-w-[680px] w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          {hasImage ? (
            <div className="relative h-[300px] w-full">
              <Image src={trip.image} alt={trip.name} fill className="object-cover rounded-t-[18px]" sizes="680px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-[18px]" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-white/90 backdrop-blur-sm text-[#1a1a18] text-[12px] font-bold px-3 py-1 rounded-full">
                  {trip.transport}
                </span>
              </div>
            </div>
          ) : (
            <div className="h-[200px] w-full bg-gradient-to-br from-[#2d6a4f] to-[#40916c] rounded-t-[18px] flex items-center justify-center">
              <span className="text-white text-4xl font-bold">{trip.name}</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center text-lg hover:bg-white transition-colors border-none cursor-pointer"
          >
            {'\u2715'}
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-[26px] font-bold tracking-tight mb-1">{trip.name}</h2>
          <p className="text-sm text-[#6b6b66] mb-5">{trip.meta}</p>

          {trip.vibe && (
            <div className="bg-[#f0f9f4] border border-[#d4edda] rounded-xl p-4 mb-6">
              <div className="text-xs font-bold text-[#2d6a4f] uppercase tracking-widest mb-1">The vibe</div>
              <p className="text-[14px] text-[#2d6a4f] leading-relaxed">{trip.vibe}</p>
            </div>
          )}

          {trip.description && (
            <p className="text-[15px] text-[#6b6b66] leading-[1.7] mb-6">{trip.description}</p>
          )}

          {trip.gettingThere && (
            <div className="mb-6">
              <h3 className="text-[15px] font-bold text-[#1a1a18] mb-2">How to get there</h3>
              <p className="text-[14px] text-[#6b6b66] leading-[1.7]">{trip.gettingThere}</p>
            </div>
          )}

          {trip.thingsToDo && trip.thingsToDo.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[15px] font-bold text-[#1a1a18] mb-3">What to do & see</h3>
              <div className="flex flex-col gap-2">
                {trip.thingsToDo.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[14px] text-[#6b6b66]">
                    <span className="text-accent mt-0.5 shrink-0">{'\u2192'}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button className="flex-1 py-3 px-5 bg-accent text-white rounded-[10px] text-sm font-semibold hover:bg-accent-hover transition-colors">
              Plan this trip
            </button>
            <button className="py-3 px-5 bg-[#f0f0ec] text-[#1a1a18] rounded-[10px] text-sm font-semibold hover:bg-[#e8e8e4] transition-colors">
              Save {'\u2661'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

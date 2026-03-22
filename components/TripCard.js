'use client'
import { useState } from 'react'
import Image from 'next/image'
import TripModal from '@/components/TripModal'

export default function TripCard({ trip }) {
  const [open, setOpen] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="relative rounded-card overflow-hidden cursor-pointer group"
        style={{ aspectRatio: '3/4' }}
      >
        {imgError ? (
          <div className="w-full h-full bg-gradient-to-br from-[#2d6a4f] to-[#40916c] flex items-center justify-center">
            <span className="text-white/80 text-4xl">{'\u2708\uFE0F'}</span>
          </div>
        ) : (
          <Image
            src={trip.image}
            alt={trip.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, 25vw"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1a1a18] text-[11px] font-bold px-2.5 py-1 rounded-full">
          {trip.transport}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-white text-[17px] font-bold mb-1">{trip.name}</div>
          <div className="text-white/80 text-[12px] font-medium">{trip.meta}</div>
        </div>
      </div>

      <TripModal trip={trip} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

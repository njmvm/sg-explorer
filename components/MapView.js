'use client'
import { useEffect, useRef, useState } from 'react'

const categoryColors = {
  sports:    '#3b82f6',
  nightlife: '#8b5cf6',
  food:      '#f59e0b',
  nature:    '#10b981',
  culture:   '#ec4899',
  social:    '#f97316',
  travel:    '#0ea5e9',
}

const categoryLabels = {
  sports:    'Sports',
  nightlife: 'Nightlife',
  food:      'Food',
  nature:    'Nature',
  culture:   'Culture',
  social:    'Social',
  travel:    'Travel',
}

function makeSvgIcon(L, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="${color}" stroke="white" stroke-width="2"/>
    <circle cx="12" cy="11" r="4" fill="white"/>
  </svg>`
  return L.divIcon({
    className: '',
    html: svg,
    iconSize: [24, 32],
    iconAnchor: [12, 32],
    popupAnchor: [0, -30],
  })
}

export default function MapView({ items, center, zoom = 12, regional = false }) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markersRef = useRef([])
  const [expanded, setExpanded] = useState(false)
  const [showLegend, setShowLegend] = useState(false)

  useEffect(() => {
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
    if (window.L) { initMap() }
    else if (!document.querySelector('#leaflet-js')) {
      const script = document.createElement('script')
      script.id = 'leaflet-js'
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = initMap
      document.head.appendChild(script)
    } else {
      const check = setInterval(() => { if (window.L) { clearInterval(check); initMap() } }, 50)
      return () => clearInterval(check)
    }
    return () => {
      if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null }
    }
  }, [])

  useEffect(() => {
    setTimeout(() => { if (mapInstance.current) mapInstance.current.invalidateSize() }, 50)
  }, [expanded])

  useEffect(() => {
    if (!mapInstance.current || !window.L) return
    const L = window.L
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []
    items.forEach(item => {
      if (!item.lat || !item.lng) return
      const color = categoryColors[item.category] || '#6b7280'
      const marker = L.marker([item.lat, item.lng], { icon: makeSvgIcon(L, color) }).addTo(mapInstance.current)
      const name = item.title || item.name || ''
      const sub = item.location || item.meta || ''
      marker.bindPopup(`<strong style="font-size:13px">${name}</strong>${sub ? `<br/><span style="font-size:11px;color:#6b6b66">${sub}</span>` : ''}`)
      markersRef.current.push(marker)
    })
  }, [items])

  function initMap() {
    if (!mapRef.current || mapInstance.current) return
    const L = window.L
    const defaultCenter = regional ? [3.5, 108.0] : [1.3521, 103.8198]
    const defaultZoom = regional ? 5 : 12
    const map = L.map(mapRef.current, {
      center: center || defaultCenter,
      zoom: zoom || defaultZoom,
      zoomControl: true,
      scrollWheelZoom: false,
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '\u00A9 <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map)
    items.forEach(item => {
      if (!item.lat || !item.lng) return
      const color = categoryColors[item.category] || '#6b7280'
      const marker = L.marker([item.lat, item.lng], { icon: makeSvgIcon(L, color) }).addTo(map)
      const name = item.title || item.name || ''
      const sub = item.location || item.meta || ''
      marker.bindPopup(`<strong style="font-size:13px">${name}</strong>${sub ? `<br/><span style="font-size:11px;color:#6b6b66">${sub}</span>` : ''}`)
      markersRef.current.push(marker)
    })
    mapInstance.current = map
  }

  function locateMe() {
    if (!mapInstance.current || !navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords
      mapInstance.current.setView([latitude, longitude], 14)
      const L = window.L
      L.circleMarker([latitude, longitude], {
        radius: 8, fillColor: '#2d6a4f', fillOpacity: 0.9, color: 'white', weight: 2,
      }).addTo(mapInstance.current).bindPopup('You are here').openPopup()
    })
  }

  const usedCategories = [...new Set(items.map(i => i.category).filter(Boolean))]

  return (
    <div className={`map-wrapper relative mb-8 rounded-xl overflow-hidden border border-[#e8e8e4] bg-[#f0f0ec] transition-all duration-300 ${expanded ? 'h-[460px]' : 'h-[200px]'}`}>
      <div ref={mapRef} className="w-full h-full" />

      {showLegend && (
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg p-2.5 shadow-sm border border-[#e8e8e4] flex flex-col gap-1" style={{ zIndex: 1000 }}>
          {usedCategories.map(cat => (
            <div key={cat} className="flex items-center gap-2 text-[11px] font-medium text-[#1a1a18]">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: categoryColors[cat] || '#6b7280' }} />
              {categoryLabels[cat] || cat}
            </div>
          ))}
        </div>
      )}

      <div className="absolute bottom-3 right-3 flex gap-2" style={{ zIndex: 1000 }}>
        {!regional && (
          <button
            onClick={locateMe}
            className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1a1a18] border border-[#e8e8e4] shadow-sm hover:bg-white transition-colors cursor-pointer"
            title="Find my location"
          >
            {'\uD83D\uDCCD'} Locate me
          </button>
        )}
        <button
          onClick={() => setShowLegend(v => !v)}
          className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1a1a18] border border-[#e8e8e4] shadow-sm hover:bg-white transition-colors cursor-pointer"
        >
          {showLegend ? '\u2715 Legend' : '\u2726 Legend'}
        </button>
        <button
          onClick={() => setExpanded(v => !v)}
          className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1a1a18] border border-[#e8e8e4] shadow-sm hover:bg-white transition-colors cursor-pointer"
        >
          {expanded ? '\u2715 Collapse' : '\u26F2 Expand map'}
        </button>
      </div>
    </div>
  )
}

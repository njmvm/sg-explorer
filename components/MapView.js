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

function makeIcon(L, color) {
  return L.divIcon({
    className: '',
    html: `<div style="width:12px;height:12px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -8],
  })
}

export default function MapView({ items, center, zoom = 12, regional = false }) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
    if (window.L) { initMap() }
    else {
      const script = document.createElement('script')
      script.id = 'leaflet-js'
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = initMap
      document.head.appendChild(script)
    }
    return () => {
      if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null }
    }
  }, [])

  useEffect(() => {
    setTimeout(() => { if (mapInstance.current) mapInstance.current.invalidateSize() }, 50)
  }, [expanded])

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
      const marker = L.marker([item.lat, item.lng], { icon: makeIcon(L, color) }).addTo(map)
      const name = item.title || item.name || ''
      const sub = item.location || item.meta || ''
      marker.bindPopup(`<strong style="font-size:13px">${name}</strong>${sub ? `<br/><span style="font-size:11px;color:#6b6b66">${sub}</span>` : ''}`)
    })
    mapInstance.current = map
  }

  return (
    <div className={`relative mb-8 rounded-xl overflow-hidden border border-[#e8e8e4] bg-[#f0f0ec] transition-all duration-300 ${expanded ? 'h-[460px]' : 'h-[200px]'}`}>
      <div ref={mapRef} className="w-full h-full" />
      <button
        onClick={() => setExpanded(v => !v)}
        className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1a1a18] border border-[#e8e8e4] shadow-sm hover:bg-white transition-colors cursor-pointer"
        style={{ zIndex: 1000 }}
      >
        {expanded ? '\u2715 Collapse' : '\u26F2 Expand map'}
      </button>
    </div>
  )
}

'use client'
import { useState } from 'react'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTH_MAP = { JAN:0,FEB:1,MAR:2,APR:3,MAY:4,JUN:5,JUL:6,AUG:7,SEP:8,OCT:9,NOV:10,DEC:11 }
const DAY_MAP = { SUN:0,MON:1,TUE:2,WED:3,THU:4,FRI:5,SAT:6 }

const BG = { sports:'#dbeafe',nightlife:'#ede9fe',food:'#fef3c7',culture:'#fce7f3',social:'#ffedd5',nature:'#d1fae5' }
const FG = { sports:'#1e40af',nightlife:'#5b21b6',food:'#92400e',culture:'#9d174d',social:'#c2410c',nature:'#065f46' }

export default function CalendarView({ events, onEventClick }) {
  const today = new Date()
  const [yr, setYr] = useState(today.getFullYear())
  const [mo, setMo] = useState(today.getMonth())

  function prevMonth() { if (mo === 0) { setMo(11); setYr(y => y - 1) } else setMo(m => m - 1) }
  function nextMonth() { if (mo === 11) { setMo(0); setYr(y => y + 1) } else setMo(m => m + 1) }

  const daysInMonth = new Date(yr, mo + 1, 0).getDate()
  const firstDay = new Date(yr, mo, 1).getDay()

  function getEventsForDay(day) {
    const dow = new Date(yr, mo, day).getDay()
    return events.filter(e => {
      if (e.tab === 'recurring') {
        const key = e.date.day.toUpperCase().replace('EVERY ', '')
        return DAY_MAP[key] === dow
      }
      const em = MONTH_MAP[e.date.month]
      const ed = parseInt(e.date.day)
      return em === mo && ed === day
    })
  }

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="bg-white rounded-xl border border-[#e8e8e4] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#e8e8e4]">
        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f0f0ec] text-[#6b6b66] text-lg font-bold cursor-pointer">&#8249;</button>
        <span className="text-[15px] font-semibold text-[#1a1a18]">{MONTHS[mo]} {yr}</span>
        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f0f0ec] text-[#6b6b66] text-lg font-bold cursor-pointer">&#8250;</button>
      </div>
      <div className="grid grid-cols-7 border-b border-[#e8e8e4]">
        {DAYS.map(d => <div key={d} className="text-center text-[10px] font-bold uppercase tracking-widest text-[#6b6b66] py-2">{d}</div>)}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} className={`min-h-[88px] bg-[#fafaf8] ${i % 7 !== 6 ? 'border-r' : ''} border-b border-[#f0f0ec]`} />
          const evs = getEventsForDay(day)
          const isToday = yr === today.getFullYear() && mo === today.getMonth() && day === today.getDate()
          return (
            <div key={day} className={`min-h-[88px] p-1 ${i % 7 !== 6 ? 'border-r' : ''} border-b border-[#f0f0ec] hover:bg-[#fafaf8]`}>
              <div className={`text-[12px] font-semibold w-6 h-6 flex items-center justify-center rounded-full mb-0.5 ${isToday ? 'bg-accent text-white' : 'text-[#1a1a18]'}`}>{day}</div>
              <div className="flex flex-col gap-0.5 overflow-hidden">
                {evs.slice(0, 2).map(e => (
                  <button key={e.id} onClick={() => onEventClick(e)}
                    style={{ background: BG[e.category]||'#f0f0ec', color: FG[e.category]||'#1a1a18' }}
                    className="text-[9px] font-semibold px-1 py-0.5 rounded truncate text-left w-full leading-tight cursor-pointer hover:opacity-80" title={e.title}>
                    {e.title}
                  </button>
                ))}
                {evs.length > 2 && (
                  <button onClick={() => onEventClick(evs[2])} className="text-[9px] text-accent font-semibold px-1 cursor-pointer hover:underline text-left">
                    +{evs.length - 2} more
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

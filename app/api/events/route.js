import sql from '@/db'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  // Force dynamic rendering
  headers()

  try {
    const rows = await sql`SELECT * FROM events ORDER BY created_at DESC`

    const events = rows.map(row => ({
      id: row.id,
      tab: row.tab,
      category: row.category,
      title: row.title,
      location: row.location,
      time: row.time,
      price: row.price,
      date: {
        month: row.date_month,
        day: row.date_day,
        label: row.date_label,
      },
      image: row.image,
      fullDesc: row.full_desc,
      tags: row.tags || [],
      lat: row.lat,
      lng: row.lng,
      website: row.website,
    }))

    return NextResponse.json(events)
  } catch (error) {
    console.error('GET /api/events error:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

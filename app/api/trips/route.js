import sql from '@/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM trips ORDER BY created_at DESC`

    const trips = rows.map(row => ({
      id: row.id,
      name: row.name,
      meta: row.meta,
      transport: row.transport,
      image: row.image,
      vibe: row.vibe,
      description: row.description,
      gettingThere: row.getting_there,
      thingsToDo: row.things_to_do || [],
      lat: row.lat,
      lng: row.lng,
      website: row.website,
    }))

    return NextResponse.json(trips)
  } catch (error) {
    console.error('GET /api/trips error:', error)
    return NextResponse.json({ error: 'Failed to fetch trips' }, { status: 500 })
  }
}

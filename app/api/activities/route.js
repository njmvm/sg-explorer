import sql from '@/db'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request) {
  // Force dynamic rendering
  headers()

  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    let rows
    if (slug) {
      rows = await sql`SELECT * FROM activities WHERE slug = ${slug} LIMIT 1`
    } else {
      rows = await sql`SELECT * FROM activities ORDER BY created_at DESC`
    }

    const activities = rows.map(row => ({
      id: row.id,
      slug: row.slug,
      category: row.category,
      title: row.title,
      shortDesc: row.short_desc,
      fullDesc: row.full_desc,
      image: row.image,
      location: row.location,
      duration: row.duration,
      price: row.price,
      tags: row.tags || [],
      lat: row.lat,
      lng: row.lng,
      website: row.website,
    }))

    if (slug) {
      return NextResponse.json(activities[0] || null)
    }

    return NextResponse.json(activities)
  } catch (error) {
    console.error('GET /api/activities error:', error)
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}

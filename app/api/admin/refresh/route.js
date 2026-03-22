import sql from '@/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function checkAdmin(request) {
  const secret = request.headers.get('x-admin-secret')
  return secret === process.env.ADMIN_SECRET
}

export async function POST(request) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { activities = [], events = [], trips = [] } = body

    let activityCount = 0
    let eventCount = 0
    let tripCount = 0

    for (const a of activities) {
      await sql`
        INSERT INTO activities (id, slug, category, title, short_desc, full_desc, image, location, duration, price, tags, lat, lng, website)
        VALUES (${a.id}, ${a.slug}, ${a.category}, ${a.title}, ${a.shortDesc}, ${a.fullDesc}, ${a.image}, ${a.location}, ${a.duration}, ${a.price}, ${a.tags}, ${a.lat}, ${a.lng}, ${a.website})
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          category = EXCLUDED.category,
          title = EXCLUDED.title,
          short_desc = EXCLUDED.short_desc,
          full_desc = EXCLUDED.full_desc,
          image = EXCLUDED.image,
          location = EXCLUDED.location,
          duration = EXCLUDED.duration,
          price = EXCLUDED.price,
          tags = EXCLUDED.tags,
          lat = EXCLUDED.lat,
          lng = EXCLUDED.lng,
          website = EXCLUDED.website,
          updated_at = NOW()
      `
      activityCount++
    }

    for (const e of events) {
      const dateMonth = e.date ? e.date.month : e.dateMonth
      const dateDay = e.date ? e.date.day : e.dateDay
      const dateLabel = e.date ? e.date.label : e.dateLabel

      await sql`
        INSERT INTO events (id, tab, category, title, location, time, price, date_month, date_day, date_label, image, full_desc, tags, lat, lng, website)
        VALUES (${e.id}, ${e.tab}, ${e.category}, ${e.title}, ${e.location}, ${e.time}, ${e.price}, ${dateMonth}, ${dateDay}, ${dateLabel}, ${e.image}, ${e.fullDesc}, ${e.tags}, ${e.lat}, ${e.lng}, ${e.website})
        ON CONFLICT (id) DO UPDATE SET
          tab = EXCLUDED.tab,
          category = EXCLUDED.category,
          title = EXCLUDED.title,
          location = EXCLUDED.location,
          time = EXCLUDED.time,
          price = EXCLUDED.price,
          date_month = EXCLUDED.date_month,
          date_day = EXCLUDED.date_day,
          date_label = EXCLUDED.date_label,
          image = EXCLUDED.image,
          full_desc = EXCLUDED.full_desc,
          tags = EXCLUDED.tags,
          lat = EXCLUDED.lat,
          lng = EXCLUDED.lng,
          website = EXCLUDED.website,
          updated_at = NOW()
      `
      eventCount++
    }

    for (const t of trips) {
      await sql`
        INSERT INTO trips (id, name, meta, transport, image, vibe, description, getting_there, things_to_do, lat, lng, website)
        VALUES (${t.id}, ${t.name}, ${t.meta}, ${t.transport}, ${t.image}, ${t.vibe}, ${t.description}, ${t.gettingThere}, ${t.thingsToDo}, ${t.lat}, ${t.lng}, ${t.website})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          meta = EXCLUDED.meta,
          transport = EXCLUDED.transport,
          image = EXCLUDED.image,
          vibe = EXCLUDED.vibe,
          description = EXCLUDED.description,
          getting_there = EXCLUDED.getting_there,
          things_to_do = EXCLUDED.things_to_do,
          lat = EXCLUDED.lat,
          lng = EXCLUDED.lng,
          website = EXCLUDED.website,
          updated_at = NOW()
      `
      tripCount++
    }

    return NextResponse.json({
      success: true,
      counts: {
        activities: activityCount,
        events: eventCount,
        trips: tripCount,
      },
    })
  } catch (error) {
    console.error('POST /api/admin/refresh error:', error)
    return NextResponse.json({ error: 'Failed to refresh data' }, { status: 500 })
  }
}

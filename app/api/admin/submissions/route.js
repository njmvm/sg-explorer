import sql from '@/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function checkAdmin(request) {
  const secret = request.headers.get('x-admin-secret')
  return secret === process.env.ADMIN_SECRET
}

export async function GET(request) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const rows = await sql`
      SELECT * FROM submissions WHERE status = 'pending'
      ORDER BY created_at DESC
    `
    return NextResponse.json(rows)
  } catch (error) {
    console.error('GET /api/admin/submissions error:', error)
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}

export async function PATCH(request) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, status, reviewed_by } = body

    if (!id || !status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'id and status (approved/rejected) are required' },
        { status: 400 }
      )
    }

    await sql`
      UPDATE submissions
      SET status = ${status},
          reviewed_by = ${reviewed_by || null},
          reviewed_at = NOW()
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PATCH /api/admin/submissions error:', error)
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 })
  }
}

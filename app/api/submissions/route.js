import sql from '@/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const body = await request.json()
    const { type, name, description, url, email } = body

    if (!type || !name || !description) {
      return NextResponse.json(
        { error: 'type, name, and description are required' },
        { status: 400 }
      )
    }

    await sql`
      INSERT INTO submissions (type, name, description, url, email)
      VALUES (${type}, ${name}, ${description}, ${url || null}, ${email || null})
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('POST /api/submissions error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}

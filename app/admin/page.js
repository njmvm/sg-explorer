'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: { 'x-admin-secret': password },
      })
      if (res.status === 401) {
        setError('Invalid password')
        setLoading(false)
        return
      }
      const data = await res.json()
      setSubmissions(data)
      setAuthed(true)
    } catch {
      setError('Failed to connect')
    }
    setLoading(false)
  }

  async function handleReview(id, status) {
    try {
      await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': password,
        },
        body: JSON.stringify({ id, status, reviewed_by: 'admin' }),
      })
      setSubmissions(prev => prev.filter(s => s.id !== id))
    } catch {
      alert('Failed to update submission')
    }
  }

  if (!authed) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-8 py-20">
        <div className="mb-8">
          <Link href="/" className="text-sm text-accent font-medium hover:opacity-70 transition-opacity no-underline">
            {'\u2190'} Back to home
          </Link>
        </div>
        <h1 className="text-[28px] font-bold tracking-tight mb-3">Admin</h1>
        <p className="text-[15px] text-[#6b6b66] mb-8">Enter the admin password to view pending submissions.</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full px-4 py-3 rounded-xl border border-[#e8e8e4] bg-white text-[15px] text-[#1a1a18] placeholder:text-[#c0c0bc] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Checking...' : 'Log in'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-accent font-medium hover:opacity-70 transition-opacity no-underline">
          {'\u2190'} Back to home
        </Link>
      </div>
      <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight mb-3">Pending Submissions</h1>
      <p className="text-[15px] text-[#6b6b66] mb-8">{submissions.length} pending {submissions.length === 1 ? 'submission' : 'submissions'}</p>

      {submissions.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">{'\u2705'}</div>
          <p className="text-[#6b6b66]">No pending submissions. All caught up!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {submissions.map(s => (
            <div key={s.id} className="border border-[#e8e8e4] dark:border-[#333330] rounded-xl p-5 bg-white dark:bg-[#1e1e1c]">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase bg-accent-light text-accent mb-2">
                    {s.type}
                  </span>
                  <h3 className="text-[16px] font-semibold text-[#1a1a18] dark:text-white">{s.name}</h3>
                </div>
                <span className="text-[11px] text-[#6b6b66] whitespace-nowrap">
                  #{s.id}
                </span>
              </div>
              <p className="text-[14px] text-[#6b6b66] dark:text-[#a0a09b] mb-3 leading-relaxed">{s.description}</p>
              {s.url && (
                <p className="text-[13px] mb-2">
                  <span className="text-[#6b6b66]">URL: </span>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{s.url}</a>
                </p>
              )}
              {s.email && (
                <p className="text-[13px] text-[#6b6b66] mb-3">Email: {s.email}</p>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleReview(s.id, 'approved')}
                  className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-semibold hover:bg-emerald-200 transition-colors cursor-pointer"
                >
                  {'\u2705'} Approve
                </button>
                <button
                  onClick={() => handleReview(s.id, 'rejected')}
                  className="px-4 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors cursor-pointer"
                >
                  {'\u274C'} Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

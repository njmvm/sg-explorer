'use client'
import { useState } from 'react'
import Link from 'next/link'

const TYPES = ['Event', 'Activity', 'Trip', 'Bug Report']

export default function SuggestPage() {
  const [type, setType] = useState('Event')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          name,
          description,
          url: url || null,
          email: email || null,
        }),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
    setSending(false)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-20 text-center">
        <div className="text-5xl mb-4">{'\u2705'}</div>
        <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight mb-3">Thanks for your submission!</h1>
        <p className="text-[15px] sm:text-[16px] text-[#6b6b66] mb-8">
          We{'\u2019'}ll review it and our AI agent may include it in a future update.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="px-6 py-3 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors no-underline">
            Back to home
          </Link>
          <button onClick={() => { setSubmitted(false); setName(''); setDescription(''); setUrl(''); setEmail('') }}
            className="px-6 py-3 bg-[#f0f0ec] text-[#1a1a18] rounded-xl text-sm font-semibold hover:bg-[#e8e8e4] transition-colors cursor-pointer">
            Submit another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-accent font-medium hover:opacity-70 transition-opacity no-underline">
          {'\u2190'} Back to home
        </Link>
      </div>

      <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight mb-3">Submit a spot</h1>
      <p className="text-[15px] sm:text-[16px] text-[#6b6b66] mb-10 max-w-[480px]">
        Know a great activity, event, or weekend trip? Found a bug? Let us know and our AI agent may add it to the site.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#1a1a18] mb-2">Type</label>
          <div className="flex gap-2 flex-wrap">
            {TYPES.map(t => (
              <button key={t} type="button" onClick={() => setType(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border-[1.5px] transition-all cursor-pointer
                  ${type === t ? 'border-accent text-accent bg-accent-light' : 'border-[#e8e8e4] text-[#6b6b66] bg-white hover:border-accent hover:text-accent'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#1a1a18] mb-2">
            {type === 'Bug Report' ? 'Issue title' : 'Name / Title'} <span className="text-red-400">*</span>
          </label>
          <input id="name" type="text" required value={name} onChange={e => setName(e.target.value)}
            placeholder={type === 'Bug Report' ? 'e.g. Map markers overlap on mobile' : 'e.g. Night Safari Singapore'}
            className="w-full px-4 py-3 rounded-xl border border-[#e8e8e4] bg-white text-[15px] text-[#1a1a18] placeholder:text-[#c0c0bc] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
        </div>

        <div>
          <label htmlFor="desc" className="block text-sm font-semibold text-[#1a1a18] mb-2">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea id="desc" required rows={4} value={description} onChange={e => setDescription(e.target.value)}
            placeholder={type === 'Bug Report' ? 'Describe the issue and steps to reproduce...' : 'Tell us about this place, event, or trip...'}
            className="w-full px-4 py-3 rounded-xl border border-[#e8e8e4] bg-white text-[15px] text-[#1a1a18] placeholder:text-[#c0c0bc] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y" />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-semibold text-[#1a1a18] mb-2">URL (optional)</label>
          <input id="url" type="url" value={url} onChange={e => setUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-3 rounded-xl border border-[#e8e8e4] bg-white text-[15px] text-[#1a1a18] placeholder:text-[#c0c0bc] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#1a1a18] mb-2">Your email (optional)</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-[#e8e8e4] bg-white text-[15px] text-[#1a1a18] placeholder:text-[#c0c0bc] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
          <p className="text-xs text-[#6b6b66] mt-1.5">Only used if we need to follow up. Never shared.</p>
        </div>

        <button type="submit" disabled={sending}
          className="w-full py-3.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer">
          {sending ? 'Submitting...' : `Submit ${type.toLowerCase()}`}
        </button>
      </form>

      <div className="mt-10 p-4 bg-accent-light rounded-xl flex items-center gap-3">
        <span className="text-accent text-lg">{'\uD83E\uDD16'}</span>
        <p className="text-sm text-accent font-medium">
          Submissions are reviewed manually or picked up by our AI agent during its Monday & Wednesday updates.
        </p>
      </div>
    </div>
  )
}

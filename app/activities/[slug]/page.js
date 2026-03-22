import Image from 'next/image'
import Link from 'next/link'
import { activities, badgeColors } from '@/data/content'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return activities.map(a => ({ slug: a.slug }))
}

export function generateMetadata({ params }) {
  const activity = activities.find(a => a.slug === params.slug)
  if (!activity) return {}
  return {
    title: `${activity.title} \u2014 SG Explorer`,
    description: activity.shortDesc,
  }
}

export default function ActivityPage({ params }) {
  const activity = activities.find(a => a.slug === params.slug)
  if (!activity) notFound()

  const badge = badgeColors[activity.category] || 'bg-gray-100 text-gray-700'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
      <Link href="/activities" className="inline-flex items-center gap-1.5 text-sm text-accent hover:opacity-70 transition-opacity no-underline mb-6">
        {'\u2190'} All activities
      </Link>

      <div className="relative h-[240px] sm:h-[360px] w-full rounded-xl overflow-hidden mb-8">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
          priority
        />
      </div>

      <span className={`badge ${badge} mb-3 inline-block`}>{activity.category}</span>
      <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight mb-4">{activity.title}</h1>

      <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-[#6b6b66] mb-6">
        <span>{'\uD83D\uDCCD'} {activity.location}</span>
        <span>{'\u23F1'} {activity.duration}</span>
        <span>{'\uD83D\uDCB5'} {activity.price}</span>
      </div>

      <p className="text-[16px] text-[#6b6b66] leading-[1.8] mb-8">{activity.fullDesc}</p>

      <div className="flex gap-2 flex-wrap mb-8">
        {activity.tags.map(tag => (
          <span key={tag} className="text-[11px] font-medium text-[#6b6b66] bg-[#f0f0ec] px-2.5 py-1 rounded-md">{tag}</span>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        {activity.website && (
          <a href={activity.website} target="_blank" rel="noopener noreferrer"
            className="py-3 px-6 bg-accent text-white rounded-[10px] text-sm font-semibold hover:bg-accent-hover transition-colors no-underline">
            Official website {'\u2192'}
          </a>
        )}
        <a href={`https://www.google.com/maps/search/${encodeURIComponent(activity.title + ' ' + activity.location)}`}
          target="_blank" rel="noopener noreferrer"
          className="py-3 px-6 bg-[#f0f0ec] text-[#1a1a18] rounded-[10px] text-sm font-semibold hover:bg-[#e8e8e4] transition-colors no-underline">
          {'\uD83D\uDCCD'} Directions
        </a>
      </div>
    </div>
  )
}

'use client'
import { useState, useMemo } from 'react'
import TripCard from '@/components/TripCard'
import MapView from '@/components/MapView'
import { trips } from '@/data/content'

const allTrips = [
  ...trips,
  {
    id: 'melaka', name: 'Melaka, Malaysia',
    meta: 'Heritage \u00B7 Street Food \u00B7 Architecture',
    transport: '\uD83D\uDE97 3.5h drive',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop&q=80',
    vibe: 'A UNESCO World Heritage city with colonial charm, incredible Peranakan food, and a vibrant night market along the river.',
    description: "Melaka (Malacca) is one of Southeast Asia's most historically rich cities. Once a major trading port, it blends Portuguese, Dutch, British, and Malay influences into a colorful, walkable old town.",
    gettingThere: 'Drive from Singapore via the Second Link (3.5 hours, less traffic than the causeway). Alternatively, take a bus from Lavender Street \u2014 several operators run direct coaches (4\u20135 hours).',
    thingsToDo: [
      'Jonker Street Night Market \u2014 Friday and Saturday nights, incredible street food',
      "Chicken rice balls \u2014 Melaka's famous twist on the classic dish",
      'A Famosa fortress \u2014 Portuguese colonial ruins from 1511',
      'Melaka River cruise \u2014 colorful murals and heritage buildings along the banks',
      'Baba & Nyonya Heritage Museum \u2014 stunning Peranakan townhouse',
    ],
    lat: 2.1896, lng: 102.2501,
    website: 'https://www.tourismmelaka.com',
  },
  {
    id: 'tioman', name: 'Tioman Island, Malaysia',
    meta: 'Diving \u00B7 Beaches \u00B7 Rainforest',
    transport: '\u2708\uFE0F 4\u20135h flight',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80',
    vibe: 'A true tropical island escape \u2014 pristine coral reefs, jungle-covered mountains, and zero pretense. Think Robinson Crusoe, not resort chic.',
    description: 'Tioman is consistently rated one of the most beautiful islands in the world. Unlike commercialized beach destinations, it still feels wild \u2014 dense rainforest right down to white sand beaches.',
    gettingThere: 'Fly from Singapore to Mersing (bus to Mersing jetty, ~4 hours), then take a ferry to Tioman (1.5\u20132 hours). Best visited March\u2013October.',
    thingsToDo: [
      'Scuba diving \u2014 world-class coral reefs, PADI courses from ~S$300',
      'Snorkeling at Coral Island \u2014 boat trip from ABC Village',
      'Jungle trekking \u2014 cross-island trail from Tekek to Juara (3 hours)',
      'Asah Waterfall \u2014 swim in a natural jungle pool',
      'Fresh seafood BBQ dinners \u2014 right on the beach',
    ],
    lat: 2.7998, lng: 104.1650,
    website: 'https://www.tioman.net',
  },
  {
    id: 'kuala-lumpur', name: 'Kuala Lumpur, Malaysia',
    meta: 'Nightlife \u00B7 Food \u00B7 Shopping',
    transport: '\u2708\uFE0F 50min flight',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop&q=80',
    vibe: "A buzzing, affordable metropolis with incredible food diversity, rooftop bars, and the iconic Petronas Towers. Like Singapore's louder, cheaper sibling.",
    description: "KL is one of the easiest weekend trips from Singapore \u2014 a 50-minute flight puts you in a city that rivals Singapore for food but costs a fraction.",
    gettingThere: 'Fly from Changi \u2014 flights take 50 minutes and are often under S$100 return on AirAsia or Scoot. KLIA Ekspres train takes you from the airport to KL Sentral in 28 minutes.',
    thingsToDo: [
      'Petronas Twin Towers \u2014 book skybridge tickets in advance',
      "Jalan Alor \u2014 KL's most famous street food strip, best after dark",
      'Batu Caves \u2014 Hindu temple inside dramatic limestone caves (272 steps)',
      'Heli Lounge Bar \u2014 rooftop bar on an actual helipad',
      'Bangsar nightlife \u2014 bars, restaurants, and live music',
    ],
    lat: 3.1390, lng: 101.6869,
    website: 'https://www.visitkl.gov.my',
  },
  {
    id: 'langkawi', name: 'Langkawi, Malaysia',
    meta: 'Beaches \u00B7 Cable Car \u00B7 Duty-free',
    transport: '\u2708\uFE0F 1.5h flight',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=600&fit=crop&q=80',
    vibe: "Island paradise with duty-free everything. Stunning nature, the famous Sky Bridge, and beaches that rival the Maldives \u2014 at a fraction of the price.",
    description: "Langkawi is a duty-free island off Malaysia's northwest coast, famous for its dramatic landscapes, mangrove forests, and gorgeous beaches.",
    gettingThere: 'Direct flights from Changi take about 1.5 hours. AirAsia has the most frequent service. Once on the island, rent a car or scooter \u2014 public transport is limited.',
    thingsToDo: [
      'Langkawi SkyCab & Sky Bridge \u2014 cable car to 700m with a curved suspension bridge',
      'Pantai Cenang \u2014 main beach strip with restaurants, bars, water sports',
      'Kilim Geoforest Park \u2014 mangrove boat tour with eagle feeding',
      'Duty-free shopping \u2014 chocolate, alcohol, and perfume at rock-bottom prices',
      'Island hopping tour \u2014 visit Dayang Bunting Lake and Beras Basah Island',
    ],
    lat: 6.3500, lng: 99.8000,
    website: 'https://www.lada.gov.my',
  },
]

const TRANSPORT_TABS = [
  { id: 'all', label: 'All', icon: '\uD83C\uDF0F' },
  { id: 'ferry', label: 'Ferry', icon: '\uD83D\uDEA4' },
  { id: 'drive', label: 'Car / Bus', icon: '\uD83D\uDE97' },
  { id: 'flight', label: 'Plane', icon: '\u2708\uFE0F' },
]

export default function TripsPage() {
  const [search, setSearch] = useState('')
  const [transport, setTransport] = useState('all')

  const filtered = useMemo(() => {
    let result = allTrips
    if (transport !== 'all') {
      result = result.filter(t => t.transport.includes(transport))
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.meta.toLowerCase().includes(q) ||
        (t.vibe && t.vibe.toLowerCase().includes(q))
      )
    }
    return result
  }, [search, transport])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight mb-3">Weekend Escapes</h1>
        <p className="text-[15px] sm:text-[16px] text-[#6b6b66] max-w-[560px]">
          Singapore is your gateway to Southeast Asia. These are the best weekend trips you can do from the city.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b6b66] text-lg pointer-events-none">{'\uD83D\uDD0D'}</span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search destinations..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1e1e1c] border border-[#e8e8e4] dark:border-[#333330] rounded-xl text-[15px] text-[#1a1a18] dark:text-[#e0e0dc] placeholder:text-[#6b6b66] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          aria-label="Search trips"
        />
      </div>

      <MapView items={filtered} regional={true} zoom={5} center={[3.5, 108.0]} />

      {/* Transport filter tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {TRANSPORT_TABS.map(tab => (
          <button key={tab.id} onClick={() => setTransport(tab.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer select-none whitespace-nowrap shrink-0
              ${transport === tab.id ? 'bg-accent text-white border-accent' : 'bg-white dark:bg-[#1e1e1c] text-[#6b6b66] border-[#e8e8e4] dark:border-[#333330] hover:border-accent hover:text-accent'}`}>
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-[#6b6b66] mb-6">{filtered.length} {filtered.length === 1 ? 'destination' : 'destinations'}</p>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">{'\u2708\uFE0F'}</div>
          <p className="text-[#6b6b66]">No destinations found {'\u2014'} try a different search!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(t => <TripCard key={t.id} trip={t} />)}
        </div>
      )}

      <div className="mt-10 p-4 bg-accent-light rounded-xl flex items-center gap-3">
        <span className="text-accent text-lg">{'\u2708\uFE0F'}</span>
        <p className="text-sm text-accent font-medium">More destination guides coming soon {'\u2014'} AI agent is working on it!</p>
      </div>
    </div>
  )
}

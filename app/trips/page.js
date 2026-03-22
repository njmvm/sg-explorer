import TripCard from '@/components/TripCard'
import { trips } from '@/data/content'

const allTrips = [
  ...trips,
  {
    id: 'melaka',
    name: 'Melaka, Malaysia',
    meta: 'Heritage \u00B7 Street Food \u00B7 Architecture',
    transport: '\uD83D\uDE97 3.5h drive',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400&h=600&fit=crop&q=80',
    vibe: 'A UNESCO World Heritage city with colonial charm, incredible Peranakan food, and a vibrant night market along the river.',
    description: "Melaka (Malacca) is one of Southeast Asia's most historically rich cities. Once a major trading port, it blends Portuguese, Dutch, British, and Malay influences into a colorful, walkable old town. The Jonker Street night market on weekends is legendary.",
    gettingThere: 'Drive from Singapore via the Second Link (3.5 hours, less traffic than the causeway). Alternatively, take a bus from Lavender Street \u2014 several operators run direct coaches (4\u20135 hours). Once there, everything in the old town is walkable or reachable by trishaw.',
    thingsToDo: [
      'Jonker Street Night Market \u2014 Friday and Saturday nights, incredible street food',
      "Chicken rice balls \u2014 Melaka's famous twist on the classic dish",
      'A Famosa fortress \u2014 Portuguese colonial ruins from 1511',
      'Melaka River cruise \u2014 colorful murals and heritage buildings along the banks',
      'Baba & Nyonya Heritage Museum \u2014 stunning Peranakan townhouse',
      'Cendol at Jonker 88 \u2014 the best in Malaysia, according to many',
    ],
  },
  {
    id: 'tioman',
    name: 'Tioman Island, Malaysia',
    meta: 'Diving \u00B7 Beaches \u00B7 Rainforest',
    transport: '\u2708\uFE0F 4\u20135h flight',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=600&fit=crop&q=80',
    vibe: 'A true tropical island escape \u2014 pristine coral reefs, jungle-covered mountains, and zero pretense. Think Robinson Crusoe, not resort chic.',
    description: 'Tioman is consistently rated one of the most beautiful islands in the world. Unlike commercialized beach destinations, it still feels wild \u2014 dense rainforest right down to white sand beaches, with some of the best and cheapest diving in Southeast Asia.',
    gettingThere: 'Fly from Singapore to Mersing (bus to Mersing jetty, ~4 hours), then take a ferry to Tioman (1.5\u20132 hours). Alternatively, Berjaya Air sometimes runs direct flights from Changi to Tioman airport. Best visited March\u2013October (monsoon season closes most places Nov\u2013Feb).',
    thingsToDo: [
      'Scuba diving \u2014 world-class coral reefs, PADI courses from ~S$300',
      'Snorkeling at Coral Island \u2014 boat trip from ABC Village',
      'Jungle trekking \u2014 cross-island trail from Tekek to Juara (3 hours)',
      'Asah Waterfall \u2014 swim in a natural jungle pool',
      'Firefly watching \u2014 kayak tours at night through mangroves',
      'Fresh seafood BBQ dinners \u2014 right on the beach',
    ],
  },
  {
    id: 'kuala-lumpur',
    name: 'Kuala Lumpur, Malaysia',
    meta: 'Nightlife \u00B7 Food \u00B7 Shopping',
    transport: '\u2708\uFE0F 50min flight',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=600&fit=crop&q=80',
    vibe: "A buzzing, affordable metropolis with incredible food diversity, rooftop bars, and the iconic Petronas Towers. Like Singapore's louder, cheaper sibling.",
    description: "KL is one of the easiest weekend trips from Singapore \u2014 a 50-minute flight puts you in a city that rivals Singapore for food but costs a fraction. The nightlife is livelier and more varied, the street food is legendary, and there's a genuine energy to the city.",
    gettingThere: 'Fly from Changi \u2014 flights take 50 minutes and are often under S$100 return on AirAsia or Scoot. KLIA Ekspres train takes you from the airport to KL Sentral in 28 minutes. Grab is dirt cheap for getting around. Alternatively, drive (4.5h) or take a bus.',
    thingsToDo: [
      'Petronas Twin Towers \u2014 book skybridge tickets in advance',
      "Jalan Alor \u2014 KL's most famous street food strip, best after dark",
      'Batu Caves \u2014 Hindu temple inside dramatic limestone caves (272 steps)',
      'Heli Lounge Bar \u2014 rooftop bar on an actual helipad',
      'Bangsar nightlife \u2014 bars, restaurants, and live music',
      'Central Market \u2014 art, crafts, and Malay batik',
    ],
  },
  {
    id: 'langkawi',
    name: 'Langkawi, Malaysia',
    meta: 'Beaches \u00B7 Cable Car \u00B7 Duty-free',
    transport: '\u2708\uFE0F 1.5h flight',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&h=600&fit=crop&q=80',
    vibe: "Island paradise with duty-free everything. Stunning nature, the famous Sky Bridge, and beaches that rival the Maldives \u2014 at a fraction of the price.",
    description: "Langkawi is a duty-free island off Malaysia's northwest coast, famous for its dramatic landscapes, mangrove forests, and gorgeous beaches. It's more developed than Tioman but still feels relaxed and natural. The cable car and Sky Bridge alone are worth the trip.",
    gettingThere: 'Direct flights from Changi take about 1.5 hours. AirAsia has the most frequent service. Once on the island, rent a car or scooter \u2014 public transport is limited. The island is compact enough to drive around in a couple of hours.',
    thingsToDo: [
      'Langkawi SkyCab & Sky Bridge \u2014 cable car to 700m with a curved suspension bridge',
      'Pantai Cenang \u2014 main beach strip with restaurants, bars, water sports',
      'Kilim Geoforest Park \u2014 mangrove boat tour with eagle feeding',
      'Duty-free shopping \u2014 chocolate, alcohol, and perfume at rock-bottom prices',
      'Island hopping tour \u2014 visit Dayang Bunting Lake and Beras Basah Island',
      'Underwater World Langkawi \u2014 aquarium with a walk-through tunnel',
    ],
  },
]

export default function TripsPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-10">
        <h1 className="text-[36px] font-bold tracking-tight mb-3">Weekend Escapes</h1>
        <p className="text-[16px] text-[#6b6b66] max-w-[560px]">
          Singapore is your gateway to Southeast Asia. These are the best weekend trips you can do from the city.
        </p>
      </div>
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-[#6b6b66] uppercase tracking-widest text-sm">{'\uD83D\uDEA4'} By Ferry (under 2h)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {allTrips.filter(t => t.transport.includes('ferry')).map(t => <TripCard key={t.id} trip={t} />)}
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-[#6b6b66] uppercase tracking-widest text-sm">{'\uD83D\uDE97'} By Car / Bus</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {allTrips.filter(t => t.transport.includes('drive')).map(t => <TripCard key={t.id} trip={t} />)}
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-[#6b6b66] uppercase tracking-widest text-sm">{'\u2708\uFE0F'} By Plane</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {allTrips.filter(t => t.transport.includes('flight')).map(t => <TripCard key={t.id} trip={t} />)}
        </div>
      </div>
      <div className="p-4 bg-accent-light rounded-xl flex items-center gap-3">
        <span className="text-accent text-lg">{'\u2708\uFE0F'}</span>
        <p className="text-sm text-accent font-medium">More destination guides coming soon \u2014 AI agent is working on it!</p>
      </div>
    </div>
  )
}

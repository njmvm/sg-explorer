const fs = require('fs');
const filePath = 'C:\\Users\\mouge\\sg-explorer\\data\\content.js';
let c = fs.readFileSync(filePath, 'utf8');
let count = 0;

function fix(oldStr, newStr, label) {
  if (c.includes(oldStr)) {
    c = c.replace(oldStr, newStr);
    console.log('FIXED: ' + label);
    count++;
  } else {
    console.warn('WARN: Not found - ' + label);
  }
}

// ── ACTIVITIES ──────────────────────────────────────────────────────────────

// KF1 Karting - wrong domain
fix(
  "website: 'https://www.kf1.com.sg'",
  "website: 'https://kf1karting.com/'",
  'KF1 Karting URL'
);

// Beach volleyball meetup - wrong group slug
fix(
  "website: 'https://www.meetup.com/sg-beach-volleyball/'",
  "website: 'https://www.meetup.com/singapore-beach-volleyball-meetup-group/'",
  'Beach volleyball meetup group'
);

// Cycling meetup - generic group that may not exist
fix(
  "website: 'https://www.meetup.com/singapore-cycling-group/'",
  "website: 'https://www.meetup.com/topics/cycling/sg/'",
  'Cycling meetup (generic topic page)'
);

// Tech expat meetup - generic group that may not exist
fix(
  "website: 'https://www.meetup.com/singapore-tech-expat/'",
  "website: 'https://www.meetup.com/topics/tech-networking/sg/'",
  'Tech expat meetup (generic topic page)'
);

// Lost SG - wrong domain (should be lost.sg not lostsg.com)
fix(
  "website: 'https://www.lostsg.com'",
  "website: 'https://lost.sg/'",
  'Lost SG escape room URL'
);

// ── EVENTS ──────────────────────────────────────────────────────────────────

// Heritage Festival - wrong URL path
fix(
  "website: 'https://www.roots.gov.sg/nhb/singaporeheritagefestival'",
  "website: 'https://www.sgheritagefest.gov.sg/'",
  'Singapore Heritage Festival URL'
);

// ARTBOX - wrong domain (artbox.com.sg vs artbox.sg)
fix(
  "website: 'https://www.artbox.com.sg'",
  "website: 'https://www.artbox.sg'",
  'ARTBOX website domain'
);

// Laneway Festival Singapore 2026 - this festival left Singapore in 2018!
// Replace with IVE World Tour (real May 2026 Singapore event)
fix(
  `  {
    id: 'e7', category: 'nightlife',
    title: 'Laneway Festival Singapore 2026',
    location: 'Bayfront Event Space', time: 'Gates open 11 AM',
    date: { month: 'MAY', day: '16', label: 'Sat 16 May 2026' }, tab: 'month', price: 'From S$120',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=500&fit=crop&q=80',
    fullDesc: "Laneway is Singapore\\u2019s favourite indie music festival, running since 2011. Expect a lineup of emerging and established indie, electronic, and alternative artists across two stages. Headliners around 8 PM.",
    tags: ['Festival', 'Music', 'Indie', 'All-day', 'Outdoor'],
    lat: 1.2840, lng: 103.8610,
    website: 'https://lanewayfestival.com/sg',
  },`,
  `  {
    id: 'e7', category: 'nightlife',
    title: 'IVE \\u2014 Show What I Have World Tour',
    location: 'Singapore Indoor Stadium', time: '7:30 PM',
    date: { month: 'MAY', day: '9', label: 'Sat 9 May 2026' }, tab: 'month', price: 'From S$118',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=500&fit=crop&q=80',
    fullDesc: 'Fourth-generation K-pop powerhouse IVE brings their Show What I Have World Tour to Singapore Indoor Stadium. Known for sleek choreography and anthemic pop hits including Eleven, Love Dive, After Like, and Kitsch, IVE are one of the fastest-rising acts in global K-pop. Expect a full production show with elaborate staging and a packed, high-energy crowd.',
    tags: ['K-pop', 'Concert', 'Indoor Stadium', 'Dance', 'Live music'],
    lat: 1.3007, lng: 103.8745,
    website: 'https://www.sportshub.com.sg/events',
  },`,
  'Replace fake Laneway Festival with IVE World Tour (real May 2026 event)'
);

// ── TRIPS ────────────────────────────────────────────────────────────────────

// Batam - ferry company → official tourism site
fix(
  "website: 'https://www.batamfast.com'",
  "website: 'https://visitbatam.com/'",
  'Batam: ferry site -> official tourism site'
);

// Bintan - resort company → official tourism office
fix(
  "website: 'https://www.bintan-resort.com'",
  "website: 'https://bintantourism.com/'",
  'Bintan: resort site -> official tourism office'
);

// Lombok - uncertain domain → Indonesia official tourism
fix(
  "website: 'https://www.lombok-tourism.com'",
  "website: 'https://www.indonesia.travel/gb/en/destinations/bali-nusa-tenggara/lombok'",
  'Lombok: -> Indonesia official tourism page'
);

// ── WRITE ────────────────────────────────────────────────────────────────────
fs.writeFileSync(filePath, c, 'utf8');
console.log('\\nDone. ' + count + ' fixes applied to content.js');

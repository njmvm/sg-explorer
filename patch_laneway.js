const fs = require('fs');
const filePath = 'C:\\Users\\mouge\\sg-explorer\\data\\content.js';
let c = fs.readFileSync(filePath, 'utf8');

// Check e7 is the Laneway entry
if (!c.includes("title: 'Laneway Festival Singapore 2026'")) {
  console.log('Laneway title not found - already fixed or different content');
  process.exit(0);
}

// Fix each field of the e7 Laneway entry individually
const fixes = [
  ["title: 'Laneway Festival Singapore 2026'",
   "title: 'IVE \\u2014 Show What I Have World Tour'"],
  ["location: 'Bayfront Event Space', time: 'Gates open 11 AM'",
   "location: 'Singapore Indoor Stadium', time: '7:30 PM'"],
  ["date: { month: 'MAY', day: '16', label: 'Sat 16 May 2026' }, tab: 'month', price: 'From S$120'",
   "date: { month: 'MAY', day: '9', label: 'Sat 9 May 2026' }, tab: 'month', price: 'From S$118'"],
  ["image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=500&fit=crop&q=80'",
   "image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=500&fit=crop&q=80'"],
  ["fullDesc: \"Laneway is Singapore\\u2019s favourite indie music festival, running since 2011. Expect a lineup of emerging and established indie, electronic, and alternative artists across two stages. Headliners around 8 PM.\"",
   "fullDesc: 'Fourth-generation K-pop powerhouse IVE brings their Show What I Have World Tour to Singapore Indoor Stadium. Known for sleek choreography and anthemic pop hits including Eleven, Love Dive, After Like, and Kitsch, IVE are one of the fastest-rising acts in global K-pop. Expect a full production show with elaborate staging.'"],
  ["tags: ['Festival', 'Music', 'Indie', 'All-day', 'Outdoor']",
   "tags: ['K-pop', 'Concert', 'Indoor Stadium', 'Dance', 'Live music']"],
  ["lat: 1.2840, lng: 103.8610",
   "lat: 1.3007, lng: 103.8745"],
  ["website: 'https://lanewayfestival.com/sg'",
   "website: 'https://www.sportshub.com.sg/events'"],
];

let count = 0;
for (const [from, to] of fixes) {
  if (c.includes(from)) {
    c = c.replace(from, to);
    console.log('FIXED: ' + from.slice(0, 50) + '...');
    count++;
  } else {
    console.warn('WARN: Not found: ' + from.slice(0, 60));
  }
}

fs.writeFileSync(filePath, c, 'utf8');
console.log('Done. ' + count + '/' + fixes.length + ' Laneway->IVE fixes applied.');

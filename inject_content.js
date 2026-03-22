const fs = require('fs');
const filePath = 'C:\\Users\\mouge\\sg-explorer\\data\\content.js';
let content = fs.readFileSync(filePath, 'utf8');

// Each \\uXXXX below writes as literal \uXXXX in the output file (ASCII-safe)
let A = ''; // new activities
let E = ''; // new events
let T = ''; // new trips

// ── ACTIVITY 1 ──────────────────────────────────────────────────────────────
A += `
  {
    id: 'scentopia', slug: 'scentopia-perfume-workshop', category: 'culture',
    title: 'Scentopia Perfume Workshop',
    shortDesc: 'Blend your own signature fragrance at Singapore\\u2019s first fragrance attraction on Sentosa. Choose from 150+ botanicals and take home a custom 30ml perfume.',
    fullDesc: 'Scentopia is a one-of-a-kind fragrance attraction on Sentosa where you design your own personalised perfume guided by an expert perfumer. Pick from over 150 Singaporean botanical ingredients \\u2014 each tied to local culture and stories. The 1.5-hour session ends with your custom 30ml bottle to take home.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=500&fit=crop&q=80',
    location: 'Palawan Beach Walk, Sentosa', duration: '1.5 hours', price: 'From S$58',
    tags: ['Unique', 'Creative', 'Date night', 'Sentosa', 'Indoor'],
    lat: 1.2494, lng: 103.8197,
    website: 'https://www.scentopia.com.sg',
  },`;

// ── ACTIVITY 2 ──────────────────────────────────────────────────────────────
A += `
  {
    id: 'southern-islands', slug: 'southern-islands-day-trip', category: 'nature',
    title: 'Southern Islands Day Trip \\u2014 Lazarus & St John\\u2019s',
    shortDesc: 'Escape to Singapore\\u2019s secret beaches. Lazarus Island has crystal-clear water and white sand with zero crowds \\u2014 a 20-minute ferry from Marina South Pier.',
    fullDesc: 'Singapore\\u2019s Southern Islands are one of the city-state\\u2019s best-kept secrets. Lazarus Island offers a stunning sheltered lagoon with the clearest water in Singapore \\u2014 bring snorkel gear and a picnic. St John\\u2019s Island next door has a swimming lagoon and relaxed walking trails. The islands are car-free and crowd-free, giving you a taste of tropical escape without leaving Singapore.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&q=80',
    location: 'Marina South Pier (MRT: Marina South Pier)', duration: 'Full day (6\\u20138 hours)', price: 'S$18 return ferry',
    tags: ['Beach', 'Nature', 'Island', 'Picnic', 'Budget-friendly'],
    lat: 1.2264, lng: 103.8397,
    website: 'https://www.sentosa.com.sg/en/things-to-do/attractions/southern-islands/',
  },`;

// ── ACTIVITY 3 ──────────────────────────────────────────────────────────────
A += `
  {
    id: 'rug-tufting', slug: 'rug-tufting-tuft-club', category: 'culture',
    title: 'Rug Tufting Workshop at Tuft Club',
    shortDesc: 'The hottest craft trend in Singapore. Use a tufting gun to create your own custom rug or wall art in a 3-hour guided session.',
    fullDesc: 'Tuft Club is Singapore\\u2019s leading rug tufting studio, where you use an electric tufting gun to punch yarn into fabric to create a custom rug or wall hanging. You choose the pattern, colours, and size before your session. The result is a one-of-a-kind handmade piece you take home. Sessions are beginner-friendly and guided throughout \\u2014 a great activity for groups, couples, or solo creatives.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&q=80',
    location: 'Chinatown / Tanjong Pagar area', duration: '3 hours', price: 'From S$85',
    tags: ['Creative', 'Unique', 'Craft', 'Date night', 'Group activity'],
    lat: 1.3003, lng: 103.8563,
    website: 'https://www.tuftclub.com.sg',
  },`;

// ── ACTIVITY 4 ──────────────────────────────────────────────────────────────
A += `
  {
    id: 'vespa-tour', slug: 'vespa-sidecar-heritage-tour', category: 'culture',
    title: 'Vespa Sidecar Heritage Tour',
    shortDesc: 'Cruise through Singapore\\u2019s historic kampungs, temples, and colonial streets in a vintage Vespa sidecar. The most stylish way to explore the city.',
    fullDesc: 'Sidecar Adventures offers guided tours through Singapore\\u2019s heritage neighbourhoods on a fleet of classic Vespa sidecar motorcycles. Each private tour is led by a knowledgeable local guide through Little India, Joo Chiat, Geylang, and the colonial district. You ride in the sidecar while the guide shares stories about Singapore\\u2019s past. Half-day and full-day options available.',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=500&fit=crop&q=80',
    location: 'Departures from various heritage districts', duration: '2\\u20134 hours', price: 'From S$120/person',
    tags: ['Unique', 'Heritage', 'Photography', 'Date night', 'Guided'],
    lat: 1.3034, lng: 103.8585,
    website: 'https://www.tripadvisor.com/Attraction_Review-g294264-d12661601-Reviews-Sidecar_Adventures_Singapore.html',
  },`;

// ── ACTIVITY 5 ──────────────────────────────────────────────────────────────
A += `
  {
    id: 'gardens-night', slug: 'gardens-by-the-bay-supertrees', category: 'nature',
    title: 'Gardens by the Bay \\u2014 Supertree Grove Night Walk',
    shortDesc: 'The Supertrees are spectacular at night. Watch the Garden Rhapsody light show at 7:45 PM and 8:45 PM, then explore the two climate-controlled conservatories.',
    fullDesc: 'Gardens by the Bay is one of Singapore\\u2019s most iconic attractions, and the Supertree Grove is genuinely stunning after dark. The free Garden Rhapsody light and music show runs twice nightly (7:45 PM and 8:45 PM). For the full experience, buy tickets to the Flower Dome and Cloud Forest conservatories \\u2014 open until 9 PM and consistently rated among Singapore\\u2019s best indoor attractions.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&q=80',
    location: 'Marina Bay, Singapore', duration: '2\\u20134 hours', price: 'Free (Grove) \\u00B7 From S$28 (Conservatories)',
    tags: ['Iconic', 'Night out', 'Marina Bay', 'Photography', 'Nature'],
    lat: 1.2816, lng: 103.8636,
    website: 'https://www.gardensbythebay.com.sg',
  },`;

// ── ACTIVITY 6 ──────────────────────────────────────────────────────────────
A += `
  {
    id: 'clarke-quay-crawl', slug: 'clarke-quay-bar-crawl', category: 'nightlife',
    title: 'Clarke Quay Bar Crawl',
    shortDesc: 'Singapore\\u2019s original nightlife district \\u2014 colourful shophouses, rooftop bars, riverside cocktails, and clubs all within a 5-minute walk of each other.',
    fullDesc: 'Clarke Quay is the go-to neighbourhood for a Singapore night out. The shophouse-lined riverbank hosts craft beer bars, electronic music clubs, and upscale cocktail lounges. Start with sunset drinks at a riverside terrace, progress through a few bars, and end the night dancing. The party doesn\\u2019t really get going until 11 PM.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop&q=80',
    location: 'Clarke Quay, River Valley Road', duration: 'Evening (8 PM \\u2013 late)', price: 'S$30\\u201370+ depending on drinks',
    tags: ['Nightlife', 'Bar crawl', 'Clarke Quay', 'Groups', 'Social'],
    lat: 1.2888, lng: 103.8467,
    website: 'https://www.clarkequay.com.sg',
  },`;

// ── ACTIVITY 7 ──────────────────────────────────────────────────────────────
A += `
  {
    id: 'joo-chiat-walk', slug: 'joo-chiat-peranakan-food-walk', category: 'food',
    title: 'Joo Chiat Peranakan Food Walk',
    shortDesc: 'Walk Singapore\\u2019s most colourful heritage street and eat your way through Peranakan kueh, popiah, laksa, and kaya toast at century-old shops.',
    fullDesc: 'Joo Chiat Road is one of Singapore\\u2019s most photogenic streets \\u2014 lined with pastel-painted Peranakan shophouses, old-school bakeries, and neighbourhood hawker stalls. A self-guided food walk takes you through Bengawan Solo (Peranakan kueh), Kim Choo Kueh Chang (popiah), 328 Katong Laksa, and countless heritage cafes. Best explored on a weekend morning.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=500&fit=crop&q=80',
    location: 'Joo Chiat Road / Katong, East Singapore', duration: '2\\u20133 hours', price: '~S$15\\u201330 (food costs)',
    tags: ['Food', 'Heritage', 'Walking', 'Peranakan', 'Photography'],
    lat: 1.3161, lng: 103.9007,
    website: 'https://www.visitsingapore.com/see-do-singapore/culture-heritage/historic-districts/katong-joo-chiat/',
  },`;

// ── ACTIVITY 8 ──────────────────────────────────────────────────────────────
A += `
  {
    id: 'ifly', slug: 'ifly-indoor-skydiving', category: 'sports',
    title: 'iFly Indoor Skydiving',
    shortDesc: 'Experience the freefall sensation of skydiving without the plane. iFly Sentosa has the world\\u2019s largest wind tunnel attraction \\u2014 perfect for first-timers and all ages.',
    fullDesc: 'iFly Singapore at Sentosa is one of the world\\u2019s largest wind tunnel facilities, where you float on a column of air in a fully controlled indoor environment. No experience required \\u2014 a certified instructor trains you and flies alongside you the whole time. Each session includes two flights. The adrenaline rush is real, and it\\u2019s one of the most memorable experiences you can have in Singapore.',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=500&fit=crop&q=80',
    location: 'Imbiah Lookout, Sentosa Island', duration: '1.5\\u20132 hours (incl. briefing)', price: 'From S$89',
    tags: ['Adventure', 'Adrenaline', 'Sentosa', 'Unique', 'All ages'],
    lat: 1.2537, lng: 103.8205,
    website: 'https://www.iflysingapore.com',
  },`;

// ── ACTIVITY 9 ──────────────────────────────────────────────────────────────
A += `
  {
    id: 'orchid-garden', slug: 'national-orchid-garden', category: 'nature',
    title: 'National Orchid Garden \\u2014 Botanic Gardens',
    shortDesc: 'Over 1,000 species and 2,000 hybrids on a 3-hectare hillside in the UNESCO-listed Botanic Gardens. Features orchids named after world leaders.',
    fullDesc: 'The National Orchid Garden within Singapore Botanic Gardens is the world\\u2019s largest display of tropical orchids. Walk through themed gardens including the Cool House and the VIP Orchid Garden \\u2014 where you\\u2019ll find blooms named after celebrities and heads of state. The garden is stunning year-round and best explored in the cooler morning hours.',
    image: 'https://images.unsplash.com/photo-1526397751294-331021109fbd?w=800&h=500&fit=crop&q=80',
    location: 'Singapore Botanic Gardens, Cluny Road', duration: '1\\u20132 hours', price: 'S$15 (adults)',
    tags: ['Nature', 'Photography', 'UNESCO', 'Relaxed', 'Morning'],
    lat: 1.3138, lng: 103.8159,
    website: 'https://www.nparks.gov.sg/sbg/our-gardens/tyersall-gallop-core/national-orchid-garden',
  },`;

// ── ACTIVITY 10 ─────────────────────────────────────────────────────────────
A += `
  {
    id: 'haw-par-villa', slug: 'haw-par-villa', category: 'culture',
    title: 'Haw Par Villa \\u2014 Singapore\\u2019s Strangest Attraction',
    shortDesc: 'A surreal, free theme park of Chinese mythology with 1,000+ statues depicting heaven, hell, and everything in between. Unlike anything else in Singapore.',
    fullDesc: 'Built in 1937 by the Tiger Balm brothers, Haw Par Villa is one of Singapore\\u2019s most bizarre and fascinating attractions. Over 1,000 hand-painted plaster statues depict scenes from Chinese mythology, folklore, and moral tales \\u2014 some disturbing, some hilarious, all unforgettable. The centrepiece is the Ten Courts of Hell diorama. Entry is free \\u2014 allow 1\\u20132 hours to wander properly.',
    image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&h=500&fit=crop&q=80',
    location: 'Pasir Panjang Road (Haw Par Villa MRT)', duration: '1\\u20132 hours', price: 'Free',
    tags: ['Free', 'Unique', 'Culture', 'Weird', 'Photography'],
    lat: 1.2820, lng: 103.7832,
    website: 'https://www.hawparvilla.sg',
  },`;

// ── ACTIVITY 11 ─────────────────────────────────────────────────────────────
A += `
  {
    id: 'night-cycling', slug: 'night-cycling-eastern-coastal-loop', category: 'sports',
    title: 'Night Cycling \\u2014 Eastern Coastal Park Connector',
    shortDesc: 'Join hundreds of cyclists on the 47km Eastern Coastal Loop at night \\u2014 cool breeze, lit paths, zero traffic, and a supper stop at Changi Village hawker centre.',
    fullDesc: 'Night cycling along Singapore\\u2019s Park Connector Network is a beloved local tradition, best attempted after 10 PM when temps drop. The Eastern Coastal Loop covers about 47km from Marina Bay through East Coast Park, Pasir Ris, and back via Changi. Rent a bicycle from any Giant or Donkey Bike station, and build in a midnight supper stop at Changi Village Hawker Centre for nasi lemak or roti prata.',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=500&fit=crop&q=80',
    location: 'East Coast Park to Changi (full loop)', duration: '3\\u20135 hours (after 10 PM)', price: '~S$10\\u201315 (bike rental)',
    tags: ['Cycling', 'Night out', 'Outdoors', 'Social', 'Budget-friendly'],
    lat: 1.3005, lng: 103.9157,
    website: 'https://www.nparks.gov.sg/gardens-parks-and-nature/park-connector-network',
  },`;

// ── ACTIVITY 12 ─────────────────────────────────────────────────────────────
A += `
  {
    id: 'escape-room', slug: 'escape-room-lost-sg', category: 'culture',
    title: 'Escape Room at Lost SG',
    shortDesc: 'Singapore\\u2019s most immersive escape room \\u2014 cinematic sets, live actors, and genuinely challenging puzzles across multiple unique game rooms.',
    fullDesc: 'Lost SG is widely considered one of Singapore\\u2019s best escape room operators, with multiple locations and a rotating selection of highly produced game rooms. Each scenario features professional set design, original soundtracks, and puzzles ranging from logic challenges to physical tasks. Sessions are 60\\u201375 minutes for groups of 2\\u20136. Great for team building, date nights, or a proper challenge with friends.',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&h=500&fit=crop&q=80',
    location: 'Multiple locations across Singapore', duration: '60\\u201375 minutes', price: 'From S$35/person',
    tags: ['Groups', 'Puzzle', 'Indoor', 'Date night', 'Team building'],
    lat: 1.3003, lng: 103.8563,
    website: 'https://www.lostsg.com',
  },`;

// ── EVENT 1 ──────────────────────────────────────────────────────────────────
E += `
  {
    id: 'e11', category: 'culture',
    title: 'ARTBOX CAMP 2026',
    location: 'Singapore Expo, Halls 7 & 8', time: '4 PM \\u2013 11 PM',
    date: { month: 'APR', day: '3', label: 'Fri 3 Apr 2026' }, tab: 'month', price: 'From S$7',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop&q=80',
    fullDesc: 'ARTBOX \\u2014 Asia\\u2019s biggest creative lifestyle market \\u2014 returns to Singapore in camping festival format. Over 450 vendors sell handmade crafts, vintage clothing, street food, and art prints across a neon-lit outdoor fairground. Live DJ stages, carnival games, and art installations fill the space across two weekends (Apr 3\\u20135 and Apr 10\\u201312).',
    tags: ['Festival', 'Creative', 'Night market', 'Food', 'Shopping'],
    lat: 1.3350, lng: 103.9609,
    website: 'https://www.artbox.com.sg',
  },`;

// ── EVENT 2 ──────────────────────────────────────────────────────────────────
E += `
  {
    id: 'e12', category: 'nightlife',
    title: 'DAY6 10th Anniversary Concert \\u2014 Singapore',
    location: 'Singapore Indoor Stadium', time: '7:30 PM',
    date: { month: 'APR', day: '18', label: 'Sat 18 Apr 2026' }, tab: 'month', price: 'From S$108',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=500&fit=crop&q=80',
    fullDesc: 'K-pop band DAY6 celebrates their 10th anniversary with a world tour stop in Singapore. Known for playing their own instruments, DAY6 puts on a high-energy rock-influenced live show with hits spanning a decade. One of the most acclaimed live acts in the Korean music scene.',
    tags: ['K-pop', 'Concert', 'Indoor Stadium', 'Live music'],
    lat: 1.3007, lng: 103.8745,
    website: 'https://www.singaporeindoorstadium.com.sg',
  },`;

// ── EVENT 3 ──────────────────────────────────────────────────────────────────
E += `
  {
    id: 'e13', category: 'nightlife',
    title: 'Eric Chou \\u2014 How Have You Been? World Tour',
    location: 'Singapore Indoor Stadium', time: '8 PM',
    date: { month: 'APR', day: '11', label: 'Sat 11 Apr 2026' }, tab: 'month', price: 'From S$98',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=500&fit=crop&q=80',
    fullDesc: 'Taiwanese singer-songwriter Eric Chou brings his emotional ballads and R&B-tinged pop to Singapore. Known for heartfelt lyrics and a stripped-back acoustic style, Eric Chou is one of the most popular Mandopop artists among young audiences. Expect a sold-out crowd singing along to every word.',
    tags: ['Concert', 'Mandopop', 'Live music', 'Indoor Stadium'],
    lat: 1.3007, lng: 103.8745,
    website: 'https://www.sportshub.com.sg/events',
  },`;

// ── EVENT 4 ──────────────────────────────────────────────────────────────────
E += `
  {
    id: 'e14', category: 'culture',
    title: 'LATINADA Festival Singapore 2026',
    location: 'Dempsey Hill', time: '12 PM \\u2013 10 PM',
    date: { month: 'APR', day: '10', label: 'Fri 10 Apr 2026' }, tab: 'month', price: 'Free entry',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=500&fit=crop&q=80',
    fullDesc: 'LATINADA brings three days of Latin American food, music, dance, and culture to the lush grounds of Dempsey Hill (Apr 10\\u201312). Live salsa and cumbia bands perform across two stages, while food trucks serve Venezuelan arepas, Colombian empanadas, and Brazilian churrasco. Free salsa dance lessons run throughout the afternoon.',
    tags: ['Free', 'Latin', 'Dance', 'Food', 'Dempsey', 'Music'],
    lat: 1.3048, lng: 103.8093,
    website: 'https://www.dempseyhill.com/events',
  },`;

// ── EVENT 5 ──────────────────────────────────────────────────────────────────
E += `
  {
    id: 'e15', category: 'culture',
    title: 'Charlie and the Chocolate Factory \\u2014 The Musical',
    location: 'Sands Theatre, Marina Bay Sands', time: '7:30 PM',
    date: { month: 'MAY', day: '19', label: 'Tue 19 May 2026' }, tab: 'month', price: 'From S$75',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=500&fit=crop&q=80',
    fullDesc: 'Roald Dahl\\u2019s beloved story comes to life in a spectacular West End-style production at Marina Bay Sands. The show runs May 19 \\u2013 Jun 7, with evening performances Tue\\u2013Sun and weekend matinees. Featuring dazzling sets, inventive puppetry, and original songs \\u2014 book early, previous runs sold out weeks in advance.',
    tags: ['Theatre', 'Musical', 'Family', 'Marina Bay Sands', 'Roald Dahl'],
    lat: 1.2834, lng: 103.8607,
    website: 'https://www.marinabaysands.com/entertainment/shows.html',
  },`;

// ── EVENT 6 ──────────────────────────────────────────────────────────────────
E += `
  {
    id: 'e16', category: 'nightlife',
    title: '(G)I-DLE Singapore Concert 2026',
    location: 'Singapore Indoor Stadium', time: '7 PM',
    date: { month: 'JUN', day: '13', label: 'Sat 13 Jun 2026' }, tab: 'month', price: 'From S$118',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=500&fit=crop&q=80',
    fullDesc: '(G)I-DLE, one of the most creatively ambitious acts in fourth-generation K-pop, brings their world tour to Singapore. With members who write, produce, and choreograph their own music, the group is known for powerful stage presence and genre-bending hits. Expect elaborate staging and one of the most energetic crowd atmospheres in Singapore.',
    tags: ['K-pop', 'Concert', 'Indoor Stadium', 'Dance'],
    lat: 1.3007, lng: 103.8745,
    website: 'https://www.singaporeindoorstadium.com.sg',
  },`;

// ── EVENT 7 ──────────────────────────────────────────────────────────────────
E += `
  {
    id: 'e17', category: 'culture',
    title: 'Kumar Got Balls \\u2014 Comedy Show',
    location: 'Sands Theatre, Marina Bay Sands', time: '8 PM',
    date: { month: 'JUN', day: '25', label: 'Thu 25 Jun 2026' }, tab: 'month', price: 'From S$45',
    image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&h=500&fit=crop&q=80',
    fullDesc: 'Singapore\\u2019s most beloved drag comedian Kumar returns with a new solo show running Jun 25 \\u2013 Jul 12. Known for fearless social commentary, sharp Singlish wit, and outrageous characters, Kumar is one of Singapore\\u2019s most iconic performers. Adults-only and relentlessly funny.',
    tags: ['Comedy', 'Stand-up', 'Local', 'Adults only', 'Marina Bay Sands'],
    lat: 1.2834, lng: 103.8607,
    website: 'https://www.marinabaysands.com/entertainment/shows.html',
  },`;

// ── EVENT 8 ──────────────────────────────────────────────────────────────────
E += `
  {
    id: 'e18', category: 'food',
    title: 'Singapore Food Festival 2026',
    location: 'Multiple venues across Singapore', time: 'All day',
    date: { month: 'JUL', day: '17', label: 'Fri 17 Jul 2026' }, tab: 'month', price: 'Free entry (food from S$5)',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop&q=80',
    fullDesc: 'Singapore Food Festival is the biggest annual celebration of Singapore\\u2019s culinary culture, running the last two weeks of July. Expect special menus at hawker centres and restaurants, pop-up supper clubs, celebrity chef appearances, food tours, and immersive dining experiences celebrating everything from heritage hawker food to innovative modern Singapore cuisine.',
    tags: ['Food', 'Festival', 'Hawker', 'Local culture', 'Annual'],
    lat: 1.3521, lng: 103.8198,
    website: 'https://www.singaporefoodfestival.sg',
  },`;

// ── EVENT 9 (recurring) ──────────────────────────────────────────────────────
E += `
  {
    id: 'r5', category: 'sports',
    title: 'Parkrun Singapore \\u2014 Free 5K Every Saturday',
    location: 'Bishan Park (and multiple other venues)', time: '7:30 AM',
    date: { month: 'EVERY', day: 'SAT', label: 'Every Saturday' }, tab: 'recurring', price: 'Free',
    image: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&h=500&fit=crop&q=80',
    fullDesc: 'Parkrun is a worldwide free, weekly, timed 5K run held every Saturday morning. Singapore has multiple venues including Bishan Park, Gardens by the Bay, and Bedok Reservoir. Register once at parkrun.com.sg and run at any location globally for free. A welcoming community of walkers, joggers, and runners of all levels. Bring your printed barcode and turn up by 7:25 AM.',
    tags: ['Running', 'Free', 'Community', 'Morning', 'All levels'],
    lat: 1.3617, lng: 103.8481,
    website: 'https://www.parkrun.com.sg',
  },`;

// ── EVENT 10 (recurring) ─────────────────────────────────────────────────────
E += `
  {
    id: 'r6', category: 'food',
    title: 'Dempsey Farmers & Artisan Market',
    location: 'Dempsey Hill, Block 9', time: '9 AM \\u2013 2 PM',
    date: { month: 'EVERY', day: 'SUN', label: 'Every 2nd Sunday' }, tab: 'recurring', price: 'Free entry',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=500&fit=crop&q=80',
    fullDesc: 'Every second Sunday of the month, Dempsey Hill hosts a farmers and artisan market with local produce, artisan food products, homemade preserves, plants, and handcrafted goods. Browse the stalls, grab a flat white from one of the pop-up cafes, and enjoy the relaxed jungle setting. Arrive before 11 AM for the best selection.',
    tags: ['Market', 'Food', 'Free', 'Weekend', 'Dempsey', 'Local'],
    lat: 1.3048, lng: 103.8093,
    website: 'https://www.dempseyhill.com',
  },`;

// ── TRIP 1 ───────────────────────────────────────────────────────────────────
T += `
  {
    id: 'krabi', name: 'Krabi, Thailand', meta: 'Rock Climbing \\u00B7 Beaches \\u00B7 Kayaking',
    transport: '\\u2708\\uFE0F 1h55 flight',
    image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&h=600&fit=crop&q=80',
    vibe: 'Dramatic limestone karsts rising from turquoise water, Railay Beach accessible only by longtail boat, world-class rock climbing, and jaw-dropping island-hopping.',
    description: 'Krabi is one of Thailand\\u2019s most scenic destinations \\u2014 dramatic karst limestone cliffs, hidden lagoons, and some of the best rock climbing in Southeast Asia. Railay Beach is the standout destination: accessible only by boat, ringed by towering cliffs. The 4-island tour by longtail is a must-do.',
    gettingThere: 'Scoot flies direct Singapore to Krabi (KBV) in about 1h55. Flights from S$80\\u2013150 return. Take a shared minibus or taxi from Krabi International Airport to your resort.',
    thingsToDo: [
      'Railay Beach \\u2014 take a longtail boat from Ao Nang (15 min), swim and relax on one of Thailand\\u2019s best beaches',
      'Rock climbing at Railay \\u2014 world-famous routes on limestone karsts for all levels, half-day guided sessions from S$60',
      '4 Islands Tour \\u2014 longtail boat day trip hitting Phra Nang Cave, Tup Island, Chicken Island, and Poda Island',
      'Kayaking through Hong Island mangroves \\u2014 paddle into sea caves and hidden lagoons',
      'Tiger Cave Temple (Wat Tham Suea) \\u2014 climb 1,237 steps for panoramic views over Krabi',
      'Ao Nang Night Market \\u2014 cheap pad thai, fresh seafood, and mango sticky rice',
    ],
    lat: 8.0863, lng: 98.9063,
    website: 'https://www.tourismthailand.org/Destinations/Provinces/Krabi/235',
  },`;

// ── TRIP 2 ───────────────────────────────────────────────────────────────────
T += `
  {
    id: 'lombok', name: 'Lombok, Indonesia', meta: 'Hiking \\u00B7 Gili Islands \\u00B7 Surf',
    transport: '\\u2708\\uFE0F 2h40 flight',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop&q=80',
    vibe: 'Bali\\u2019s quieter, wilder neighbour. Trek an active volcano, laze on the world-famous Gili Islands, or surf uncrowded waves at Kuta Lombok.',
    description: 'Lombok is often called "Bali without the crowds" \\u2014 but that undersells it. The island has its own distinct identity: the sacred Mount Rinjani volcano, the laid-back Sasak culture, beautiful surf beaches at Kuta Lombok, and the legendary Gili Islands just a short boat ride away.',
    gettingThere: 'Scoot flies direct Singapore to Lombok International Airport (LOP) 4x per week in about 2h40. Return fares from S$150\\u2013250. Book resorts on Gili Trawangan or Gili Air for the island experience.',
    thingsToDo: [
      'Mount Rinjani trek \\u2014 2\\u20133 day hike to the crater rim (3,726m) with incredible caldera lake views; book a guide in Senaru',
      'Gili Trawangan \\u2014 the liveliest of the three Gili Islands; snorkel with sea turtles, watch the sunset from the east beach',
      'Gili Air \\u2014 quieter and more romantic; excellent diving and calm beach vibes',
      'Kuta Lombok \\u2014 uncrowded surf beach surrounded by dramatic hills; great for intermediate surfers',
      'Selong Belanak Beach \\u2014 a wide, gentle bay perfect for beginner surfers and swimming',
      'Sasak Village tour \\u2014 visit a traditional Sasak community, learn about local weaving and architecture',
    ],
    lat: -8.6500, lng: 116.3242,
    website: 'https://www.lombok-tourism.com',
  },`;

// ── TRIP 3 ───────────────────────────────────────────────────────────────────
T += `
  {
    id: 'siem-reap', name: 'Siem Reap, Cambodia', meta: 'Temples \\u00B7 History \\u00B7 Night Market',
    transport: '\\u2708\\uFE0F 1h45 flight',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=600&fit=crop&q=80',
    vibe: 'One of the great wonders of the world, under 2 hours from Singapore. Angkor Wat at sunrise is a life-changing experience that justifies every long weekend.',
    description: 'Siem Reap is the gateway to the Angkor Archaeological Park \\u2014 a UNESCO World Heritage Site containing the largest religious monument on Earth. Beyond the temples, the town has a lively Pub Street, excellent food, and is one of the most affordable destinations in Southeast Asia.',
    gettingThere: 'Multiple airlines fly direct from Changi to Siem Reap International Airport in about 1h45. Return fares from S$180\\u2013280. Visa on arrival available (US$30). Tuk-tuks are the best way to get around.',
    thingsToDo: [
      'Angkor Wat sunrise \\u2014 arrive by 5 AM to watch the temple emerge from darkness; book a tuk-tuk driver the night before',
      'Angkor Thom & the Bayon \\u2014 the walled city with its 54 towers bearing 216 serene stone faces',
      'Ta Prohm (the "Jungle Temple") \\u2014 where tree roots have grown through the ruins; atmospheric and less crowded in the afternoon',
      'Banteay Srei \\u2014 a 10th century temple with the finest decorative stone carvings in the Angkor region',
      'Tonle Sap Lake \\u2014 the largest freshwater lake in SE Asia; take a boat tour at sunset',
      'Old Market (Psar Chas) \\u2014 browse Cambodian spices, silk scarves, and handicrafts; bargain politely',
    ],
    lat: 13.3671, lng: 103.8448,
    website: 'https://www.tourismcambodia.com/destinations/siem-reap/',
  },`;

// ── TRIP 4 ───────────────────────────────────────────────────────────────────
T += `
  {
    id: 'phuket', name: 'Phuket, Thailand', meta: 'Beaches \\u00B7 Nightlife \\u00B7 Island Hopping',
    transport: '\\u2708\\uFE0F 1h25 flight',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop&q=80',
    vibe: 'Thailand\\u2019s most popular island \\u2014 stunning beaches, epic Phi Phi Islands day trips, buzzing Patong nightlife, and great-value resorts.',
    description: 'Phuket is Thailand\\u2019s largest island and a Southeast Asian institution. Patong delivers the classic beach holiday \\u2014 sun loungers, fresh seafood, and nightlife that runs until dawn. Venture beyond Patong and you find quiet coves, rubber tree forests, and jumping-off points for Phi Phi, James Bond Island, and the Similan Islands.',
    gettingThere: 'Multiple airlines fly direct from Changi to Phuket International Airport (HKT) in about 1h25. Budget options on Scoot and AirAsia from S$80\\u2013180 return. Taxi/Grab from the airport costs 600\\u2013800 THB to most beach areas.',
    thingsToDo: [
      'Phi Phi Islands day trip \\u2014 speedboat from Phuket, snorkelling at Maya Bay, and lunch on Phi Phi Don',
      'Phang Nga Bay kayaking \\u2014 paddle through sea caves and the famous "James Bond Island" (Khao Phing Kan)',
      'Kata Noi and Karon beaches \\u2014 quieter alternatives to Patong with beautiful sand and fewer crowds',
      'Big Buddha viewpoint \\u2014 walk up to the 45m white marble Buddha statue for panoramic island views',
      'Patong night market & Bangla Road \\u2014 the classic Phuket nightlife experience',
      'Old Phuket Town \\u2014 pastel Sino-Portuguese shophouses, street art murals, and excellent local food',
    ],
    lat: 7.9519, lng: 98.3381,
    website: 'https://www.tourismthailand.org/Destinations/Provinces/Phuket/197',
  },`;

// ── TRIP 5 ───────────────────────────────────────────────────────────────────
T += `
  {
    id: 'danang', name: 'Da Nang & Hoi An, Vietnam', meta: 'Beach \\u00B7 Old Town \\u00B7 Cuisine',
    transport: '\\u2708\\uFE0F 2h flight',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&q=80',
    vibe: 'Da Nang\\u2019s beach resorts by day, then hire a scooter to Hoi An\\u2019s ancient lantern-lit streets for the best food and tailoring in Southeast Asia.',
    description: 'Da Nang is Vietnam\\u2019s most modern beach city, with a long sandy coastline and easy access to Hoi An (30 min by taxi). Hoi An is the must-see: a UNESCO-listed ancient trading port with beautifully preserved historic architecture, lantern-lit streets, excellent tailor shops, and arguably the best food scene in all of Vietnam.',
    gettingThere: 'Multiple airlines fly direct from Changi to Da Nang International Airport (DAD) in about 2 hours. Return fares from S$150\\u2013280. E-visa available for Vietnam (US$25). Hire a scooter in Hoi An (S$8/day) to explore at your own pace.',
    thingsToDo: [
      'Hoi An Ancient Town \\u2014 walk the lantern-lit old streets at dusk, cross the Japanese Covered Bridge, and browse the silk shops',
      'My Son Sanctuary \\u2014 ancient Cham temple complex in the jungle, 40km from Hoi An, best visited early morning',
      'Hoi An tailor \\u2014 have a custom suit, dress, or shirt made in 24\\u201348 hours; dozens of reputable tailors along Tran Phu Street',
      'White Rose dumplings and Cao Lau \\u2014 two Hoi An-only dishes you must try before leaving',
      'My Khe Beach (Da Nang) \\u2014 long, clean, uncrowded beach; good waves for beginner surfing',
      'Ba Na Hills & Golden Bridge \\u2014 the iconic bridge held up by giant stone hands; worth a half-day trip',
    ],
    lat: 16.0544, lng: 108.2022,
    website: 'https://vietnam.travel/places-to-go/central-vietnam/da-nang',
  },`;

// ── INJECTION LOGIC ──────────────────────────────────────────────────────────
const actAnchor  = "    website: 'https://www.maniax.com.sg',\n  },\n]";
const evAnchor   = "    website: 'https://www.nparks.gov.sg/sbg',\n  },\n]";
const tripAnchor = "    website: 'https://www.visitpenang.gov.my',\n  },\n]";

if (!content.includes(actAnchor))  { console.error('ERROR: Activity anchor not found!'); process.exit(1); }
if (!content.includes(evAnchor))   { console.error('ERROR: Event anchor not found!');    process.exit(1); }
if (!content.includes(tripAnchor)) { console.error('ERROR: Trip anchor not found!');     process.exit(1); }

content = content.replace(actAnchor,  "    website: 'https://www.maniax.com.sg',\n  }," + A + "\n]");
content = content.replace(evAnchor,   "    website: 'https://www.nparks.gov.sg/sbg',\n  }," + E + "\n]");
content = content.replace(tripAnchor, "    website: 'https://www.visitpenang.gov.my',\n  }," + T + "\n]");

fs.writeFileSync(filePath, content, 'utf8');

const aC = (A.match(/id: '/g)||[]).length;
const eC = (E.match(/id: '/g)||[]).length;
const tC = (T.match(/id: '/g)||[]).length;
console.log('OK content.js written: +' + aC + ' activities, +' + eC + ' events, +' + tC + ' trips');
console.log('Total new lines: ' + content.split('\n').length);

// ── INJECTION LOGIC ──────────────────────────────────────────────────────────
// File uses CRLF line endings, so anchors must use \r\n
const actAnchor  = "    website: 'https://www.maniax.com.sg',\r\n  },\r\n]";
const evAnchor   = "    website: 'https://www.nparks.gov.sg/sbg',\r\n  },\r\n]";
const tripAnchor = "    website: 'https://www.visitpenang.gov.my',\r\n  },\r\n]";

if (!content.includes(actAnchor))  { console.error('ERROR: Activity anchor not found!'); process.exit(1); }
if (!content.includes(evAnchor))   { console.error('ERROR: Event anchor not found!');    process.exit(1); }
if (!content.includes(tripAnchor)) { console.error('ERROR: Trip anchor not found!');     process.exit(1); }

content = content.replace(actAnchor,  "    website: 'https://www.maniax.com.sg',\r\n  }," + A + "\r\n]");
content = content.replace(evAnchor,   "    website: 'https://www.nparks.gov.sg/sbg',\r\n  }," + E + "\r\n]");
content = content.replace(tripAnchor, "    website: 'https://www.visitpenang.gov.my',\r\n  }," + T + "\r\n]");

fs.writeFileSync(filePath, content, 'utf8');

const aC = (A.match(/id: '/g)||[]).length;
const eC = (E.match(/id: '/g)||[]).length;
const tC = (T.match(/id: '/g)||[]).length;
console.log('OK content.js written: +' + aC + ' activities, +' + eC + ' events, +' + tC + ' trips');
console.log('Total lines: ' + content.split('\n').length);

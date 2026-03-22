const BASE = 'https://sg-explorer.vercel.app';

async function main() {
  try {
    // Fetch activities
    const actRes = await fetch(BASE + '/api/activities');
    const activities = await actRes.json();
    console.log('=== ACTIVITIES (' + activities.length + ') ===');
    activities.forEach(a => console.log('  ' + a.id + ': ' + a.title));

    // Fetch events
    const evRes = await fetch(BASE + '/api/events');
    const events = await evRes.json();
    console.log('\n=== EVENTS (' + events.length + ') ===');
    events.forEach(e => console.log('  ' + e.id + ': ' + e.title));

    // Fetch trips
    const trRes = await fetch(BASE + '/api/trips');
    const trips = await trRes.json();
    console.log('\n=== TRIPS (' + trips.length + ') ===');
    trips.forEach(t => console.log('  ' + t.id + ': ' + t.name));
  } catch (err) {
    console.error('Error:', err.message);
  }
}
main();

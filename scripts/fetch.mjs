import { BASE_URL } from './env.mjs';

async function main() {
  const [acts, evts, trips] = await Promise.all([
    fetch(BASE_URL + '/api/activities').then(r => r.json()),
    fetch(BASE_URL + '/api/events').then(r => r.json()),
    fetch(BASE_URL + '/api/trips').then(r => r.json()),
  ]);
  console.log('=== ACTIVITIES (' + acts.length + ') ===');
  acts.forEach(a => console.log(a.id + ': ' + a.title));
  console.log('\n=== EVENTS (' + evts.length + ') ===');
  evts.forEach(e => console.log(e.id + ': ' + e.title));
  console.log('\n=== TRIPS (' + trips.length + ') ===');
  trips.forEach(t => console.log(t.id + ': ' + t.name));
  console.log('\nTotal: ' + (acts.length + evts.length + trips.length));
}
main().catch(e => { console.error(e); process.exit(1); });

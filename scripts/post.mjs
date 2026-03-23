// Usage: node scripts/post.mjs
// Reads payload from scripts/payload.json and POSTs to the admin API.
// The admin secret is read from .env.local — NEVER hardcode it.
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { BASE_URL, ADMIN_SECRET } from './env.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const payloadPath = resolve(__dirname, 'payload.json');

let payload;
try {
  payload = JSON.parse(readFileSync(payloadPath, 'utf-8'));
} catch (e) {
  console.error('Failed to read payload.json:', e.message);
  console.error('Write your payload to scripts/payload.json first.');
  process.exit(1);
}

async function main() {
  console.log('Posting to', BASE_URL + '/api/admin/refresh');
  console.log('Payload:', (payload.activities||[]).length, 'activities,',
    (payload.events||[]).length, 'events,',
    (payload.trips||[]).length, 'trips');

  const res = await fetch(BASE_URL + '/api/admin/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-secret': ADMIN_SECRET
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  console.log('Status:', res.status);
  console.log('Result:', JSON.stringify(data, null, 2));
  if (!data.success) process.exit(1);
}
main().catch(e => { console.error(e); process.exit(1); });

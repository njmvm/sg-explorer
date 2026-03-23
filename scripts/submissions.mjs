import { BASE_URL, ADMIN_SECRET } from './env.mjs';

async function main() {
  const res = await fetch(BASE_URL + '/api/admin/submissions', {
    headers: { 'x-admin-secret': ADMIN_SECRET }
  });
  console.log('Status:', res.status);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
main().catch(e => { console.error(e); process.exit(1); });

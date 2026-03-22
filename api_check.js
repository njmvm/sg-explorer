async function main() {
  const urls = [
    'https://sg-explorer.vercel.app/api/activities',
    'https://sg-explorer.vercel.app/api/events',
    'https://sg-explorer.vercel.app/api/trips',
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      console.log(url);
      console.log('  Status: ' + res.status);
      console.log('  Body: ' + text.slice(0, 200));
      console.log();
    } catch (err) {
      console.log(url + ' -> ERROR: ' + err.message);
    }
  }
}
main();

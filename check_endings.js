const fs = require('fs');
const c = fs.readFileSync('C:\\Users\\mouge\\sg-explorer\\data\\content.js', 'utf8');
const idx = c.indexOf('maniax.com.sg');
console.log(JSON.stringify(c.slice(idx - 5, idx + 60)));
const hasCRLF = c.includes('\r\n');
const hasLF = c.includes('\n');
console.log('CRLF:', hasCRLF, 'LF:', hasLF);

const fs = require('fs');
const content = fs.readFileSync('C:/Users/mouge/sg-explorer/data/content.js', 'utf8');
fs.writeFileSync('C:/Users/mouge/sg-explorer/content_out.txt', content, 'utf8');

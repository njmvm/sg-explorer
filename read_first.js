const fs = require('fs');
const lines = fs.readFileSync('C:/Users/mouge/sg-explorer/data/content.js', 'utf8').split('\n').slice(0,80).join('\n');
fs.writeFileSync('C:/Users/mouge/sg-explorer/first80.txt', lines, 'ascii');

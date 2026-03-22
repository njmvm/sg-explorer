const fs = require('fs');
const src = fs.readFileSync('C:/Users/mouge/sg-explorer/data/content.js', 'utf8');

// Extract all id values
const ids = [];
const idMatches = src.matchAll(/\bid:\s*(\d+)/g);
for (const m of idMatches) ids.push(parseInt(m[1]));

// Count items in each array
const actCount = (src.match(/category:/g) || []).length;
const evCount = (src.match(/tab:/g) || []).length;
const tripCount = (src.match(/thingsToDo:/g) || []).length;

// Get last 300 chars before each array close (to see structure)
const actEnd = src.lastIndexOf('}\n];', src.indexOf('export const events'));
const last3Act = src.slice(Math.max(0, actEnd - 200), actEnd + 5);

const evEnd = src.lastIndexOf('}\n];', src.indexOf('export const trips'));
const last3Ev = src.slice(Math.max(0, evEnd - 200), evEnd + 5);

const lastClose = src.lastIndexOf('];');
const last3Trip = src.slice(Math.max(0, lastClose - 200), lastClose + 5);

const summary = `IDs found: ${JSON.stringify(ids.sort((a,b)=>a-b))}
Activity count: ${actCount}
Events count: ${evCount}
Trips count: ${tripCount}
MaxID: ${Math.max(...ids)}
--- Last activity snippet ---
${last3Act}
--- Last event snippet ---
${last3Ev}
--- Last trip snippet ---
${last3Trip}
--- File length ---
${src.length} chars, ${src.split('\n').length} lines
`;

fs.writeFileSync('C:/Users/mouge/sg-explorer/summary.txt', summary, 'utf8');

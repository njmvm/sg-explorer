const fs = require('fs');

// Read inject_content.js and eval ONLY the A/E/T += building lines
const src = fs.readFileSync('./inject_content.js', 'utf8');

// Get only the section that builds A, E, T (stop before first INJECTION LOGIC)
let buildCode = src.split('// ── INJECTION LOGIC')[0];

// Strip the header (const fs, const filePath, let content, let A, let E, let T declarations)
// by keeping only lines that start with A +=, E +=, T +=, or are part of a template literal
const lines = buildCode.split('\n');
const keepLines = [];
let inTemplate = false;
for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed.startsWith('A +=') || trimmed.startsWith('E +=') || trimmed.startsWith('T +=')) {
    inTemplate = true;
    keepLines.push(line);
  } else if (inTemplate) {
    keepLines.push(line);
    // Check if this line ends the template literal (ends with backtick + semicolon)
    if (trimmed === '`;') inTemplate = false;
  }
}
buildCode = keepLines.join('\n');

// Use var so eval can modify outer scope
var A = '', E = '', T = '';
eval(buildCode);

const aC = (A.match(/id: '/g)||[]).length;
const eC = (E.match(/id: '/g)||[]).length;
const tC = (T.match(/id: '/g)||[]).length;
console.log('Built: ' + aC + ' activities, ' + eC + ' events, ' + tC + ' trips');
if (aC + eC + tC === 0) { console.error('ERROR: No content built'); process.exit(1); }

// Read content.js (uses CRLF line endings)
const filePath = 'C:\\Users\\mouge\\sg-explorer\\data\\content.js';
let content = fs.readFileSync(filePath, 'utf8');

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
console.log('OK Written content.js — total lines: ' + content.split('\n').length);

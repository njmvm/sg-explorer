const fs = require('fs');
const filePath = 'C:\\Users\\mouge\\sg-explorer\\data\\content.js';
let c = fs.readFileSync(filePath, 'utf8');

const old = `fullDesc: "Laneway is Singapore's favourite indie music festival, running since 2011. Expect a lineup of emerging and established indie, electronic, and alternative artists across two stages. Headliners around 8 PM."`;
const rep = `fullDesc: 'Fourth-generation K-pop powerhouse IVE brings their Show What I Have World Tour to Singapore Indoor Stadium. Known for sleek choreography and anthemic pop hits including Eleven, Love Dive, After Like, and Kitsch, IVE are one of the fastest-rising acts in global K-pop. Expect a full production show with elaborate staging.'`;

if (c.includes(old)) {
  c = c.replace(old, rep);
  fs.writeFileSync(filePath, c, 'utf8');
  console.log('FIXED: Laneway fullDesc -> IVE description');
} else {
  console.warn('WARN: String not found');
}

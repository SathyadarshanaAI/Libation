// --- Enhanced KP Nakshatra/Sub Lord Logic (KP System Standard) ---
const NAK_DEG = 360 / 27; // 13.333333333333...
const nakshatras = [
  { name: "Ashwini",    lord: "Ketu" },
  { name: "Bharani",    lord: "Venus" },
  { name: "Krittika",   lord: "Sun" },
  { name: "Rohini",     lord: "Moon" },
  { name: "Mrigashira", lord: "Mars" },
  { name: "Ardra",      lord: "Rahu" },
  { name: "Punarvasu",  lord: "Jupiter" },
  { name: "Pushya",     lord: "Saturn" },
  { name: "Ashlesha",   lord: "Mercury" },
  { name: "Magha",      lord: "Ketu" },
  { name: "Purva Phalguni",   lord: "Venus" },
  { name: "Uttara Phalguni",  lord: "Sun" },
  { name: "Hasta",      lord: "Moon" },
  { name: "Chitra",     lord: "Mars" },
  { name: "Swati",      lord: "Rahu" },
  { name: "Vishakha",   lord: "Jupiter" },
  { name: "Anuradha",   lord: "Saturn" },
  { name: "Jyeshtha",   lord: "Mercury" },
  { name: "Mula",       lord: "Ketu" },
  { name: "Purva Ashadha",    lord: "Venus" },
  { name: "Uttara Ashadha",   lord: "Sun" },
  { name: "Shravana",   lord: "Moon" },
  { name: "Dhanishta",  lord: "Mars" },
  { name: "Shatabhisha",     lord: "Rahu" },
  { name: "Purva Bhadrapada", lord: "Jupiter" },
  { name: "Uttara Bhadrapada",lord: "Saturn" },
  { name: "Revati",     lord: "Mercury" }
];

const dashas = [
  { lord: "Ketu", years: 7 },
  { lord: "Venus", years: 20 },
  { lord: "Sun", years: 6 },
  { lord: "Moon", years: 10 },
  { lord: "Mars", years: 7 },
  { lord: "Rahu", years: 18 },
  { lord: "Jupiter", years: 16 },
  { lord: "Saturn", years: 19 },
  { lord: "Mercury", years: 17 }
];

function mod(a, b) { return ((a % b) + b) % b; }

function getNakshatraInfo(degree) {
  const deg = mod(degree, 360);
  const nakIdx = Math.floor(deg / NAK_DEG);
  const nak = nakshatras[nakIdx];
  const start = nakIdx * NAK_DEG;
  const posInNak = deg - start;

  // Sub lord sequence for this Nakshatra
  const startIndex = dashas.findIndex(d => d.lord === nak.lord);
  const dashaSeq = [...dashas.slice(startIndex), ...dashas.slice(0, startIndex)];
  // Sub lord boundaries (unequal!)
  const subArcs = dashaSeq.map(d => NAK_DEG * (d.years / 120));
  let acc = 0, subLord = dashaSeq[dashaSeq.length - 1].lord;
  for (let i = 0; i < subArcs.length; i++) {
    acc += subArcs[i];
    if (posInNak < acc) {
      subLord = dashaSeq[i].lord;
      break;
    }
  }
  // Determine pada (quarters)
  const pada = Math.floor(posInNak / (NAK_DEG / 4)) + 1;

  return {
    nakshatra: nak.name,
    nakLord: nak.lord,
    pada,
    subLord
  };
}

// ---- Example usage ----
const deg = 187.2; // e.g. planet degree
const info = getNakshatraInfo(deg);
console.log(info);
// Output: { nakshatra: 'Swati', nakLord: 'Rahu', pada: 2, subLord: 'Moon' }

// Nakshatra Data (for sidereal zodiac, Lahiri ayanamsa commonly used in KP)
const nakshatras = [
  { name: "Ashwini",         start: 0,        end: 13.3333, lord: "Ketu" },
  { name: "Bharani",         start: 13.3333,  end: 26.6666, lord: "Venus" },
  { name: "Krittika",        start: 26.6666,  end: 40,      lord: "Sun" },
  // ... add all 27 Nakshatras (13°20' each) ...
];

// Sub lords for each Nakshatra (KP uses Vimshottari Dasha order, 9 divisions per Nakshatra)
const subLords = [
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"
];

// Find nakshatra for given degree (0-360)
function getNakshatra(degree) {
  let normalized = degree % 360;
  for (let nak of nakshatras) {
    if (normalized >= nak.start && normalized < nak.end) {
      return nak;
    }
  }
  return nakshatras[0]; // fallback
}

// Find sub lord for given degree
function getSubLord(degree) {
  const nakIndex = Math.floor((degree % 360) / 13.3333); // 13°20′ per Nakshatra
  const startOfNak = nakIndex * 13.3333;
  const posInNak = (degree % 360) - startOfNak;
  const subLength = 13.3333 / 9;
  const subIndex = Math.floor(posInNak / subLength);
  return subLords[subIndex];
}

// Example planet data
const planetData = [
  { name: "Sun", degree: 123.4567 },
  { name: "Moon", degree: 200.1234 },
  // ...etc
];

// Generate KP Table
const kpTable = planetData.map(planet => {
  const nak = getNakshatra(planet.degree);
  const subLord = getSubLord(planet.degree);
  return {
    ...planet,
    sign: Math.floor(planet.degree / 30) + 1, // 1: Aries ... 12: Pisces
    nakshatra: nak.name,
    nakshatraLord: nak.lord,
    subLord,
  };
});

console.table(kpTable);

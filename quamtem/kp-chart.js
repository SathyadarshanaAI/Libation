// 27 Nakshatra Data (Lahiri ayanamsa, KP style)
const nakshatras = [
  { name: "Ashwini",    start: 0,        end: 13.3333,  lord: "Ketu" },
  { name: "Bharani",    start: 13.3333,  end: 26.6666,  lord: "Venus" },
  { name: "Krittika",   start: 26.6666,  end: 40,       lord: "Sun" },
  { name: "Rohini",     start: 40,       end: 53.3333,  lord: "Moon" },
  { name: "Mrigashira", start: 53.3333,  end: 66.6666,  lord: "Mars" },
  { name: "Ardra",      start: 66.6666,  end: 80,       lord: "Rahu" },
  { name: "Punarvasu",  start: 80,       end: 93.3333,  lord: "Jupiter" },
  { name: "Pushya",     start: 93.3333,  end: 106.6666, lord: "Saturn" },
  { name: "Ashlesha",   start: 106.6666, end: 120,      lord: "Mercury" },
  { name: "Magha",      start: 120,      end: 133.3333, lord: "Ketu" },
  { name: "Purva Phalguni", start: 133.3333, end: 146.6666, lord: "Venus" },
  { name: "Uttara Phalguni", start: 146.6666, end: 160, lord: "Sun" },
  { name: "Hasta",      start: 160,      end: 173.3333, lord: "Moon" },
  { name: "Chitra",     start: 173.3333, end: 186.6666, lord: "Mars" },
  { name: "Swati",      start: 186.6666, end: 200,      lord: "Rahu" },
  { name: "Vishakha",   start: 200,      end: 213.3333, lord: "Jupiter" },
  { name: "Anuradha",   start: 213.3333, end: 226.6666, lord: "Saturn" },
  { name: "Jyeshta",    start: 226.6666, end: 240,      lord: "Mercury" },
  { name: "Mula",       start: 240,      end: 253.3333, lord: "Ketu" },
  { name: "Purva Ashadha", start: 253.3333, end: 266.6666, lord: "Venus" },
  { name: "Uttara Ashadha", start: 266.6666, end: 280,   lord: "Sun" },
  { name: "Shravana",   start: 280,      end: 293.3333, lord: "Moon" },
  { name: "Dhanishta",  start: 293.3333, end: 306.6666, lord: "Mars" },
  { name: "Shatabhisha", start: 306.6666, end: 320,     lord: "Rahu" },
  { name: "Purva Bhadrapada", start: 320, end: 333.3333, lord: "Jupiter" },
  { name: "Uttara Bhadrapada", start: 333.3333, end: 346.6666, lord: "Saturn" },
  { name: "Revati",     start: 346.6666, end: 360,      lord: "Mercury" }
];

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
  const posIn360 = degree % 360;
  const nakIndex = Math.floor(posIn360 / 13.3333);
  const startOfNak = nakIndex * 13.3333;
  const posInNak = posIn360 - startOfNak;
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
    sign: Math.floor(planet.degree / 30), // 0-based: 0=Aries
    nakshatra: nak.name,
    nakshatraLord: nak.lord,
    subLord,
  };
});

console.table(kpTable);

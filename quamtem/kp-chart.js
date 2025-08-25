// --- Nakshatra & Sub Lord Logic (KP style) ---
const nakshatras = [
  { name: "Ashwini",    start: 0,        end: 13.3333,  lord: "Ketu" },
  { name: "Bharani",    start: 13.3333,  end: 26.6667,  lord: "Venus" },
  { name: "Krittika",   start: 26.6667,  end: 40,       lord: "Sun" },
  { name: "Rohini",, end: 53.3333,  lord: "Moon" },
  { name: "Mrigashira", start: 53.3333,  end: 66.6667,  lord: "Mars" },
  { name: "Ardra",      start: 66.6667 { name: "Ashlesha",   start: 106.6667, end: 120,      lord: "Mercury" },
  { name: "Magha",      start: 120,      end: 133.3333, lord: "Ketu" },
  { name: "Purva Phalguni",   start: 133.3333, end: 146.6667, lord 146.6667, end: 160,      lord: "Sun" },
  { name: "Hasta",      start: 160,      end: 173.3333, lord: "Moon" },
  { name: "Chitra",     start: 173.3333, end: 186.6667, lord: "Mars" },
  { name: "Swati",      start: 186.6667, end:  },
  { name: "Vishakha",   start: 200,      end: 213.3333, lord: "Jupiter" },
  { name: "Anuradha",   start: 213.3333, end: 226.6667, lord: "Saturn" },
  { name: "Jyeshtha",   start: 226.6667, end: 240,      lord: "Mercury" },
  { name: "Mula 240,      end: 253.3333, lord: "Ketu" },
  { name: "Purva Ashadha",    start: 253.3333, end: 266.6667, lord: "Venus" },
  { name: "Uttara Ashadha",   start, end: 306.6667, lord: "Mars" },
  { name: "Shatabhisha",     start: 306.6667, end: 320,      lord: "Rahu" },
  { name: "Purva Bhadrapada", start: 320, end: 333.3333, lord:Saturn" },
  { name: "Revati",     start: 346.6667, end: 360,      lord: "Mercury" }
];

const subLords = [ "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury" ];

function getNakshatra(degree) {
gree) {
  const posIn360 = degree % 360;
  const nakIndex = Math.floor(posIn360 / 13.3333);
  const startOfNak = nakIndex * 13.3333;
  const posInNak = posIn360 - startOfNak;
  const subLength = 13.3333 / 9;
  const subIndex = Math.floor(posInNak / subLength);
  return subLbugfix ඕන නම් කියන්න!

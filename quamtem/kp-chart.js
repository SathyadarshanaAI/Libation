// --- Nakshatra & Sub Lord Logic (KP style) ---
const nakshatras = [
  { name: "Ashwini",    start: 0,        end: 13.3333,  lord: "Ketu" },
  { name: "Bharani",    start: 13.3333,  end: 26.6666,  lord: "Venus" },
  { name: "Krittika",   start: 26.6666,  end: 40,       lord: "Sun" },
  { name: "Rohini",     start:  "Mrigashira", start: 53.3333,  end: 66.6666,  lord: "Mars" },
  { name: "Ardra",      start: 66.6666,  end: 80,       lord: "Rahu" },
  { name: "u",  start: 80,       end: 93.3333,  lord: "Jupiter" },
  { name: "Pushya",     start: 93.3333,  end: 106.6666, lord: "Saturn" },
  { name: "Ashlesha",   start: 106.6666, end: 120,      lord: "Mercury" },
  { name: "Magha",      start: 120,      end: 133.3333, lord: "Ketu" },
  { name: "Purva Phalguni", start: 160, lord: "Sun" },
  { name: "Hasta",      start: 160,      end: 173.3333, lord: "Moon" },
  { name: "Chitra",     start: 173.3333, end: 186.6666, lord: "Mars", end: 200,      lord: "Rahu" },
  { name: "Vishakha",   start: 200,      end: 213.3333, lord: "Jupiter" },
  { name: "Anuradha",   start: 213.3333, end:: 226.6666, end: 240,      lord: "Mercury" },
  { name: "Mula",       start: 240,      end: 253.3333, lord: "Ketu" },
  { name: "Purva Ashadha", start: 253.333 "Sun" },
  { name: "Shravana",   start: 280,      end: 293.3333, lord: "Moon" },
  { name: "Dhanishta",  start: 293.3333, end: 306.6666, lord: "Mars" },
  { name: "Shatabhisha", start: 306.6666, end 320, end: 333.3333, lord: "Jupiter" },
  { name: "Uttara Bhadrapada", start: 333.3333, end: 346.6666, lord: "Saturn" },
  { name: "Revati",     start: 346.6666, end:];
const subLords = [ "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury" ];

function getNakshatra(degree) {
  let normalized = degree % 360;
  for (let nak of nakshatras) {
    if (normalized >= nak.start && normalized < nak.end) return nak;
  }
  return nakshatras[0];
}

function getSubLord(degree) {
  const posIn360 = degree % 360;
  const nakIndex = Math.floor(posIn360 / 13.3333);
  const startOfNak = nakIndex * 13.3333;
  const posInNak = posIn360 - startOfNak;
  const subLength = 13.3333 / 9;
  const subIndex = Math.floor(posInNak / subLength);
  return subLords[subIndex];
}

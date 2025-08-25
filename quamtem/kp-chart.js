// --- Enhanced KP Nakshatra/Sub Lord Logic (KP System Standard) ---
const NAK_DEG = 360 / 27;
const nakshatras = [
  { name: "Ashwini", lord: "Ketu" },
  { name: "Bharani", lord: "Venus" },
  { name: "Krittika", lord: "Sun" },
  { name: "Rohini", lord: "Moon" },
  { name: "Mrigashira", lord: "Mars" },
  { name: "Ardra", lord: "Rahu" },
  { name: "Punarvasu", lord: "Jupiter" },
  { name: "Pushya", lord: "Saturn" },
  { name: "Ashlesha", lord: "Mercury" },
  { name: "Magha", lord: "Ketu" },
  { name: "Purva Phalguni", lord: "Venus" },
  { name: "Uttara Phalguni", lord: "Sun" },
  { name: "Hasta", lord: "Moon" },
  { name: "Chitra", lord: "Mars" },
  { name: "Swati", lord: "Rahu" },
  { name: "Vishakha", lord: "Jupiter" },
  { name: "Anuradha", lord: "Saturn" },
  { name: "Jyeshtha", lord: "Mercury" },
  { name: "Mula", lord: "Ketu" },
  { name: "Purva Ashadha", lord: "Venus" },
  { name: "Uttara Ashadha", lord: "Sun" },
  { name: "Shravana", lord: "Moon" },
  { name: "Dhanishta", lord: "Mars" },
  { name: "Shatabhisha", lord: "Rahu" },
  { name: "Purva Bhadrapada", lord: "Jupiter" },
  { name: "Uttara Bhadrapada", lord: "Saturn" },
  { name: "Revati", lord: "Mercury" }
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
  // Sub lord sequence
  const startIndex = dashas.findIndex(d => d.lord === nak.lord);
  const dashaSeq = [...dashas.slice(startIndex), ...dashas.slice(0, startIndex)];
  // Sub lord spans
  const subArcs = dashaSeq.map(d => NAK_DEG * (d.years / 120));
  let acc = 0, subLord = dashaSeq[dashaSeq.length - 1].lord;
  for (let i = 0; i < subArcs.length; i++) {
    acc += subArcs[i];
    if (posInNak < acc) {
      subLord = dashaSeq[i].lord;
      break;
    }
  }
  // Pada
  const pada = Math.floor(posInNak / (NAK_DEG / 4)) + 1;
  return {
    nakshatra: nak.name,
    nakLord: nak.lord,
    pada,
    subLord
  };
}

// Degree formatting (DMS)
function dms(deg){
  deg = mod(deg, 360);
  const d = Math.floor(deg);
  const mFloat = (deg-d)*60;
  const m = Math.floor(mFloat);
  const s = Math.round((mFloat-m)*60);
  return `${d}°${String(m).padStart(2,'0')}′${String(s).padStart(2,'0')}″`;
}

// --- Example: Table Rendering ---
function renderKPTable(planets) {
  let html = `<table border="1" cellpadding="4"><thead>
    <tr><th>Planet</th><th>Degree</th><th>Nakshatra</th><th>Pada</th><th>Star Lord</th><th>Sub-Lord</th></tr>
    </thead><tbody>`;
  for (const p of planets) {
    const nak = getNakshatraInfo(p.degree);
    html += `<tr>
      <td>${p.name}</td>
      <td>${dms(p.degree)}</td>
      <td>${nak.nakshatra}</td>
      <td>${nak.pada}</td>
      <td>${nak.nakLord}</td>
      <td>${nak.subLord}</td>
    </tr>`;
  }
  html += `</tbody></table>`;
  document.getElementById('planetTable').innerHTML = html;
}

// --- Usage Example ---
const demoPlanets = [
  { name: "Sun", degree: 123.456 },
  { name: "Moon", degree: 200.123 },
  { name: "Mercury", degree: 85.234 },
  { name: "Venus", degree: 154.567 },
  { name: "Mars", degree: 210.987 },
  { name: "Jupiter", degree: 275.654 },
  { name: "Saturn", degree: 305.432 },
  { name: "Rahu", degree: 45.876 },
  { name: "Ketu", degree: 225.876 }
];

// Page load: show demo table
window.onload = function() {
  renderKPTable(demoPlanets);
};

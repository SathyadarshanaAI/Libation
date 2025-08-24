// --- Nakshatra & Sub Lord Logic (KP style) ---
const nakshatras = [
  { name: "Ashwini",    start: 0,        end: 13.3333,  lord: "Ketu" },
  { name: "Bharani",    start: 13.3333,  end: 26.6666,  lord: "Venus" },
  { name: "Krittika",   start: 26.6666,  end: 40,       lord: "Sun" },
  { name: "Rohini",     start: 40,       end: 53.3333,  lord: "Moon" },
  { name: "Mrigashira", start: 53.3333,  end: 66.6666,  lord: "Mars" },
  { name: "Ardra",      start: 66.6666,  end: 80,       lord: "Rahu" },
  { name: "Punaru",  start: 80,       end: 93.3333,  lord: "Jupiter" },
  { name: "Pushya",     start: 93.3333,  end: 106.6666, lord: "Saturn" },
  { name: "Ashlesha  { name: "Magha",      start: 120,      end: 133.3333, lord: "Ketu" },
  { name: "Purva Phalguni", start: 133.3333, end: 146.6666, lord: "Venus" },
  { name: " 160,      end: 173.3333, lord: "Moon" },
  { name: "Chitra",     start: 173.3333, end: 186.6666, lord: "Mars" },
  { name: "Swati",      start: 186.6666, end:226.6666, lord: "Saturn" },
  { name: "Jyeshta",    start: 226.6666, end: 240,      lord: "Mercury" },
  { name: "Mula",       start: 240,      end: 253.3333, lord: "Ketu" "Uttara Ashadha", start: 266.6666, end: 280,   lord: "Sun" },
  { name: "Shravana",   start: 280,      end: 293.3333, lord: "Moon" },
  { name: "Dhanishta",: 320, end: 333.3333, lord: "Jupiter" },
  { name: "Uttara Bhadrapada", start: 333.3333, end: 346.6666, lord: "Saturn" },
  { name: "Revati",     start: 346.6666, end: 360 "Mars", "Rahu", "Jupiter", "Saturn", "Mercury" ];

function getNakshatra(degree) {
  let normalized = degree % 360;
  for (let nak of nakshatras) {
    if (normalized >= nak.start && normalized < nak.end) return nak;
}

function getSubLord(degree) {
  const posIn360 = degree % 360;
  const nakIndex = Math.floor(posIn360 / 13.3333);
  const startOfNak = nakIndex * 13.3333;
  const posInNak = posIn360 - startOfNak;
Index];
}

// --- DEMO: Return static planetary positions. Replace with your API code for production. ---
async function getPlanets({ dob, tob, pob, timezone }) {
  // TODO: Add real API call here for production.
  // Return: Array of objects [{ name: "Sun", degree: ... }, ...]
  return [
    { name: "Sun", degree: 123.4567 },
    { name: "Moon", degree: 200.1234 },
    { name: "Mercury", degree: 110.2546 },
    { name: "Venus", degree: 88.6543 },
    { name: "Mars", degree: 45.5678 },
    { name: "Jupiter", degree: 240.5678 },
    { name: "Saturn", degree: 300.1234 }
  ];
}

// --- Draw KP Wheel Chart on Canvas ---
function drawKPChart(planets) {
  const canvas = document.getElementById('astroChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw main circle
  ctx.strokeStyle = "#00ffe7";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(180, 180, 170, 0, 2 * Math.PI);
  ctx.stroke();

  // Draw 12 zodiac divisions
  for (let i = 0; i < 12; i++) {
    let angle = (i * 30 - 90) * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(180, 180);
    ctx.lineTo(180 + 170 * Math.cos(angle), 180 + 170 * Math.sin(angle));
    ctx.strokeStyle = "#6d7cff";
    ctx.lineWidth = 1.7;
    ctx.stroke();
  }

  // Draw planet points
  planets.forEach(pl => {
    let angle = (pl.degree - 90) * Math.PI / 180;
    let x = 180 + 140 * Math.cos(angle);
    let y = 180 + 140 * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#fffb00";
    ctx.fill();
    ctx.strokeStyle = "#181824";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#181824";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(pl.name[0], x, y + 4);
  });
}

// --- Draw KP Table ---
function drawKPTable(planets) {
  const tableDiv = document.getElementById('planetTable');
  if (!tableDiv) return;
  const signNames = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  let html = `<table style="width:100%;margin-top:1em;text-align:center"><tr>
    <th>Planet</th><th>Degree</th><th>Sign</th><th>Nakshatra</th><th>Nakshatra Lord</th><th>Sub Lord</th>
    </tr>`;
  planets.forEach(pl => {
    const nak = getNakshatra(pl.degree);
    const subLord = getSubLord(pl.degree);
    const sign = Math.floor(pl.degree / 30);
    html += `<tr>
      <td>${pl.name}</td>
      <td>${pl.degree.toFixed(4)}</td>
      <td>${signNames[sign]}</td>
      <td>${nak.name}</td>
      <td>${nak.lord}</td>
      <td>${subLord}</td>
    </tr>`;
  });
  html += "</table>";
  tableDiv.innerHTML = html;
}

// --- Form Handling + Error Handling ---
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('kpForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const loading = document.getElementById('loading');
    const resultMsg = document.getElementById('resultMsg');
    const tableDiv = document.getElementById('planetTable');
    if (loading) loading.style.display = '';
    if (resultMsg) resultMsg.textContent = '';
    if (tableDiv) tableDiv.innerHTML = '';

    // Get all inputs
    let dob = document.getElementById('dob')?.value;
    let tob = document.getElementById('tob')?.value;
    let pob = document.getElementById('pob')?.value;
    let timezone = document.getElementById('timezone')?.value;

    // Basic validation
    if (!dob || !tob || !pob || !timezone) {
      if (resultMsg) resultMsg.textContent = "Please fill all required fields!";
      if (loading) loading.style.display = 'none';
      return;
    }

    try {
      const planets = await getPlanets({ dob, tob, pob, timezone });
      drawKPChart(planets);
      drawKPTable(planets);
      if (resultMsg) resultMsg.textContent = "KP Chart generated successfully!";
    } catch (err) {
      if (resultMsg) resultMsg.textContent = "Unable to retrieve planetary positions. Please check your inputs or try again later";
    }
    if (loading) loading.style.display = 'none';
  });
});

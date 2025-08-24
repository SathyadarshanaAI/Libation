// --- Nakshatra & Sub Lord Logic (KP style) ---
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

// --- Demo API call to get planetary positions (Replace with your API key for production) ---
async function getPlanets({ dob, tob, pob, timezone }) {
  // Use a free astrology API for demonstration (planet positions only)
  // Example: Vedicrishi API (needs api_key/user_id for production)
  // For demo: use sample static data
  // If you have your own API, replace here!
  // Return: [{ name: "Sun", degree: ... }, ...]
  // ---- DEMO DATA ----
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

// --- Draw the KP Wheel Chart on Canvas ---
function drawKPChart(planets) {
  const canvas = document.getElementById('astroChart');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Draw main circle
  ctx.strokeStyle = "#00ffe7";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(180,180,170,0,2*Math.PI);
  ctx.stroke();

  // Draw 12 zodiac divisions
  for(let i=0;i<12;i++){
    let angle = (i*30-90)*Math.PI/180;
    ctx.beginPath();
    ctx.moveTo(180,180);
    ctx.lineTo(180+170*Math.cos(angle),180+170*Math.sin(angle));
    ctx.strokeStyle = "#6d7cff";
    ctx.lineWidth = 1.7;
    ctx.stroke();
  }

  // Draw planet points
  planets.forEach(pl => {
    let angle = (pl.degree-90)*Math.PI/180;
    let x = 180 + 140*Math.cos(angle);
    let y = 180 + 140*Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x,y,10,0,2*Math.PI);
    ctx.fillStyle = "#fffb00";
    ctx.fill();
    ctx.strokeStyle = "#181824";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#181824";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(pl.name[0], x, y+4);
  });
}

// --- Draw KP Table ---
function drawKPTable(planets) {
  const tableDiv = document.getElementById('planetTable');
  let html = `<table style="width:100%;margin-top:1em;text-align:center"><tr>
    <th>Planet</th><th>Degree</th><th>Sign</th><th>Nakshatra</th><th>Nakshatra Lord</th><th>Sub Lord</th>
    </tr>`;
  planets.forEach(pl => {
    const nak = getNakshatra(pl.degree);
    const subLord = getSubLord(pl.degree);
    const sign = Math.floor(pl.degree/30);
    const signNames = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
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

// --- Form Handling ---
document.getElementById('kpForm').addEventListener('submit', async function(e){
  e.preventDefault();
  document.getElementById('loading').style.display = '';
  document.getElementById('resultMsg').textContent = '';
  document.getElementById('planetTable').innerHTML = '';
  let dob = document.getElementById('dob').value;
  let tob = document.getElementById('tob').value;
  let pob = document.getElementById('pob').value;
  let timezone = document.getElementById('timezone').value;

  try{
    const planets = await getPlanets({ dob, tob, pob, timezone });
    drawKPChart(planets);
    drawKPTable(planets);
    document.getElementById('resultMsg').textContent = "KP Chart generated successfully!";
  }catch(err){
    document.getElementById('resultMsg').textContent = "Unable to retrieve planetary positions. Please check your inputs or try again later";
  }
  document.getElementById('loading').style.display = 'none';
});
